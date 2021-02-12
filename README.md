# Setup
```sh
# truffle setup (https://www.trufflesuite.com/boxes/react)
mkdir crypto-plants
truffle unbox react

# Start local chain using truffle and deploy contract
truffle develop
compile
migrate


# Transfer eth to metamask wallet
curl -X POST http://127.0.0.1:8545/ \
    -d '{"jsonrpc":"2.0","method":"eth_sendTransaction","params": [{"from":"0x243566e830705ce95b09ae66705c8b291b333310", "to":"0x549deAF2d8819B49Bae0C4d43Da90D65dCBF29C9", "value": 10e18}], "id":1}'
# from: address copied from truffle develop console
# to: metamask address
```

# Commands
1. Get all tokens for address
```js
await nft.balanceOf("0x549deAF2d8819B49Bae0C4d43Da90D65dCBF29C9") // get token count
await nft.tokenOfOwnerByIndex("0x549deAF2d8819B49Bae0C4d43Da90D65dCBF29C9", 1) // loop from 0 to count-1
```

# Chainlink error
- Truffle deployment address: 0x243566e830705ce95b09ae66705c8b291b333310
- Contract address: 0x9AeA5ce3598265f50fcD3Acf817f6A29Af67bF12