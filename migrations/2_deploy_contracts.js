const CryptoPlant = artifacts.require("./CryptoPlant.sol")

module.exports = function (deployer) {
  deployer.deploy(CryptoPlant)
}
