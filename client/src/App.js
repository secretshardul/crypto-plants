import React, { Fragment, useEffect, useState } from "react"
import { utils } from "web3"
import SimpleStorageContract from "./contracts/SimpleStorage.json"
import CryptoPlantContract from "./contracts/CryptoPlant.json"
import getWeb3 from "./getWeb3"

import "./App.css"

function App () {
  const [web3State, setWeb3State] = useState(undefined)
  const [cryptoPlantContract, setCryptoPlantContract] = useState(undefined)

  const [account, setAccount] = useState(undefined)

  useEffect(() => {
    async function web3Setup () {
      const web3 = await getWeb3()
      setWeb3State(web3)

      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0])

      const networkId = await web3.eth.net.getId()
      const network = CryptoPlantContract.networks[networkId]
      const cryptoPlantContract = new web3.eth.Contract(
        CryptoPlantContract.abi,
        network && network.address,
      )
      setCryptoPlantContract(cryptoPlantContract)
      try {
        const tokenCount = await cryptoPlantContract.methods.balanceOf(accounts[0]).call()
        console.log('Got balance', tokenCount)

        for (let tokenIndex = 0; tokenIndex < tokenCount; tokenIndex++) {
          const token = await cryptoPlantContract.methods
            .tokenOfOwnerByIndex(accounts[0], tokenIndex)
            .call()
          console.log(`Token ${tokenIndex}: ${token}`)
        }

      } catch (error) {
        console.error(error)
      }

    }
    web3Setup()
  }, [])

  async function purchaseSeed () {
    console.log('Purchasing seed')

    try {
      const purchaseSeed = await cryptoPlantContract.methods
        .purchaseSeed()
        .send({
          from: account,
          gas: 1500000,
          gasPrice: '30000',
          value: utils.toWei('0.1', 'ether')
        })

      console.log('Seed purchase response', purchaseSeed)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    web3State ?
      <Fragment>
        <h1>Crypto plants</h1>
        <button onClick={purchaseSeed}>Purchase</button>
      </Fragment>
      : <h1>Loading</h1>
  )
}

export default App
