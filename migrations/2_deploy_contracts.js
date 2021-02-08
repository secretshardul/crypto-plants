const SimpleStorage = artifacts.require("./SimpleStorage.sol")
const CryptoPlant = artifacts.require("./CryptoPlant.sol")

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage)
  deployer.deploy(CryptoPlant)
}
