import React, { useEffect, useState } from "react"
import SimpleStorageContract from "./contracts/SimpleStorage.json"
import getWeb3 from "./getWeb3"

import "./App.css"

function App() {
  const [web3State, setWeb3State] = useState(null)

  useEffect(() => {
    async function web3Setup() {
      const web3 = await getWeb3()
      setWeb3State(web3)

      const accounts = await web3.eth.getAccounts()

      const networkId = await web3.eth.net.getId()
      const deployedNetwork = SimpleStorageContract.networks[networkId]
      const contract = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      )

      // await contract.methods.set(2).send({ from: accounts[0] }) // needs metamask approval

      const response = await contract.methods.get().call()
      console.log('Got response', response)
    }
    web3Setup()
  }, [])

  return (
    web3State ? <h1>Hello world</h1> : <h1>Loading</h1>
  )
}

export default App
