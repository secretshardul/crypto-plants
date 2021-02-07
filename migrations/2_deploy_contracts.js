const SimpleStorage = artifacts.require("./SimpleStorage.sol")
const CryptoPlant = artifacts.require("./CryptoPlant.sol")

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage)
  deployer.deploy(CryptoPlant, "CryptoPlant", "CPT", "https://my-json-server.typicode.com/abcoathup/samplenft/tokens/")
}
