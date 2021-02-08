import React, { useEffect, useState } from "react"
import SimpleStorageContract from "./contracts/SimpleStorage.json"
import CryptoPlantContract from "./contracts/CryptoPlant.json"
import getWeb3 from "./getWeb3"

import "./App.css"

function App () {
  const [web3State, setWeb3State] = useState(null)

  useEffect(() => {
    async function web3Setup () {
      const web3 = await getWeb3()
      setWeb3State(web3)

      const accounts = await web3.eth.getAccounts()

      const networkId = await web3.eth.net.getId()
      const deployedNetwork = SimpleStorageContract.networks[networkId]
      const storageContract = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      )

      // await storageContract.methods.set(2).send({ from: accounts[0] }) // needs metamask approval

      const storageResponse = await storageContract.methods.get().call()
      console.log('Got storage response', storageResponse)
      const network = CryptoPlantContract.networks[networkId]
      const cryptoPlantContract = new web3.eth.Contract(
        CryptoPlantContract.abi,
        network && network.address,
      )
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

  return (
    web3State ? <h1>Hello world</h1> : <h1>Loading</h1>
  )
}

export default App
