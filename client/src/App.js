import React, { Fragment, useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import CryptoPlantContract from "./contracts/CryptoPlant.json"
import getWeb3 from "./getWeb3"

import "./App.css"
import PurchasePlantScreen from "./PurchasePlantScreen"
import MyPlantsScreen from "./MyPlantsScreen"

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
        const baseURI = await cryptoPlantContract.methods.baseURI().call()
        console.log('Base URI', baseURI)

        const tokenCount = await cryptoPlantContract.methods.balanceOf(accounts[0]).call()
        console.log('Got balance', tokenCount)

        for (let tokenIndex = 0; tokenIndex < tokenCount; tokenIndex++) {
          const token = await cryptoPlantContract.methods
            .tokenOfOwnerByIndex(accounts[0], tokenIndex)
            .call()
          console.log(`Token ${tokenIndex}: ${token}`)

          const tokenData = await fetch(baseURI + token)
          console.log('Token data', tokenData)
        }

      } catch (error) {
        console.error(error)
      }

    }
    web3Setup()
  }, [])



  return (
    web3State ?
      <Router>
        <Switch>
          <Route path="/buy">
            <PurchasePlantScreen web3={web3State} cryptoPlantContract={cryptoPlantContract} account={account} />
          </Route>
          <Route path="/">
            <MyPlantsScreen web3={web3State} cryptoPlantContract={cryptoPlantContract} account={account} />
          </Route>
        </Switch>
      </Router>

      // <Fragment>
      //   <ButtonAppBar />
      //   <button onClick={purchaseSeed}>Purchase</button>
      // </Fragment>
      : <h1>Loading</h1>
  )
}

export default App
