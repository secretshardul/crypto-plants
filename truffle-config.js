const path = require('path')
const HDWalletProvider = require("@truffle/hdwallet-provider")
require('dotenv').config()

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'client', 'src', 'contracts'),
  networks: {
    develop: {
      port: 8545
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          process.env.INFURA_RINKEBY_ENDPOINT
        )
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          process.env.INFURA_KOVAN_ENDPOINT
        )
      },
      network_id: 42,
      gas: 5000000,
      gasPrice: 25000000000,
    }
  },
  compilers: {
    solc: {
      version: '^0.6'
    }
  }
}
