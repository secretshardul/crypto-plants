# Setup
```sh
# truffle setup (https://www.trufflesuite.com/boxes/react)
mkdir crypto-plants
truffle unbox react

# Start local chain using truffle and deploy contract
truffle develop
compile
migrate

# Migrate for specific network
migrate --network rinkeby

# JSON issue fix
migrate --network rinkeby --reset

# Transfer eth to metamask wallet
curl -X POST http://127.0.0.1:8545/ \
    -d '{"jsonrpc":"2.0","method":"eth_sendTransaction","params": [{"from":"0x243566e830705ce95b09ae66705c8b291b333310", "to":"0x549deAF2d8819B49Bae0C4d43Da90D65dCBF29C9", "value": 10e18}], "id":1}'
# from: address copied from truffle develop console
# to: metamask address
```

## Signature
- Portis error: `0x9093999349fb471f39ef2b6c174615320baaabb0077e2e0429856af6b927298368f58ebf87320cd43872dda59039a53b7887b0a8f0e61ae61a61c2ff2ede4c171b`
- Metamask working: `0x4f2e4236f9e3dff5b0570798122a099fbadda6f393a3afb393035e320a06d30b1a10269b80a3182669df53409907a74e56f9dedadffc39b06d0bfb65309f316f1b`
# Commands
1. Get all tokens for address
```js
nft = await CryptoPlant.deployed()
await nft.balanceOf("0x549deAF2d8819B49Bae0C4d43Da90D65dCBF29C9") // get token count
await nft.tokenOfOwnerByIndex("0x549deAF2d8819B49Bae0C4d43Da90D65dCBF29C9", 1) // loop from 0 to count-1
```

# Chainlink error
- Truffle deployment address: 0x243566e830705ce95b09ae66705c8b291b333310
- Contract address: 0x9AeA5ce3598265f50fcD3Acf817f6A29Af67bF12

# Website
```
https://bafzbeiezgmuraf7qg3s4kjrxe3ngrgshucfbuo4eor5ra7pfqbnoc5o4za.textile.space/

https://hub.textile.io/thread/bafkvyewj3wntdwjhlt6thd7tdkt6jhxfiuegduljqxtnalckchd7d2q/buckets/bafzbeig3nbhvalstx2ajleap2e36hnobtt4n2uhc46xu26dpbqzim36die
```