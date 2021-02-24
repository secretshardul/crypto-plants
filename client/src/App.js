import React, { Fragment, useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import CryptoPlantJson from "./contracts/CryptoPlant.json"
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
      const network = CryptoPlantJson.networks[networkId]
      console.log('Network ID', networkId)
      // console.log('Contract address', network.address)
      const cryptoPlantContract = new web3.eth.Contract(
        CryptoPlantJson.abi,
        network && network.address,
      )
      setCryptoPlantContract(cryptoPlantContract)
    }
    web3Setup()
  }, [])

  return (
    web3State && cryptoPlantContract && account ?
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
