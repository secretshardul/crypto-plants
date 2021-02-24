import Web3 from "web3"
import Portis from '@portis/web3'
import { Biconomy } from "@biconomy/mexa"

// const BICONOMY_KEY = 'B40ctU1aB.49214ae3-c3eb-49d6-b65b-26abfb704736' // Matic
const BICONOMY_KEY = 'OdeDpkSjS.20b4987e-42ee-450e-bd85-075f81b51f4f' // Rinkeby

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {

      // Portis on Mumbai
      // const portis = new Portis('a9ccf4c8-d26d-4d3f-b67e-cc95a5dae7b7', 'maticMumbai')
      // const biconomy = new Biconomy(portis.provider, {
      //   apiKey: BICONOMY_KEY,
      //   debug: true,
      //   // strictMode: true,
      // })
      // const web3 = new Web3(biconomy);
      // resolve(web3)


      if (window.ethereum) {
        const biconomy = new Biconomy(window.ethereum, {
          apiKey: BICONOMY_KEY,
          debug: true,
          // strictMode: true,
        })
        const web3 = new Web3(biconomy)
        // const web3 = new Web3(window.ethereum)

        try {
          await window.ethereum.enable()
          resolve(web3)
        } catch (error) {
          reject(error)
        }

        biconomy.onEvent(biconomy.READY, async () => {
          console.log('Biconomy ready')

        }).onEvent(biconomy.ERROR, (error, message) => {
          console.log('Biconomy error', error)
          reject(error)
        });
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3;
