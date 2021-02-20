export async function getUserPlants(networkId, contract, account) {
    let plantMetadata = []
    if ([1, 137, 80001].includes(networkId)) {
        try {
            plantMetadata = await getMetadataFromCovalent(networkId, account)
        } catch(error) {
            plantMetadata = await getMetadataFromWeb3(contract, account)
        }
    } else {
        plantMetadata = await getMetadataFromWeb3(contract, account)
    }
    return plantMetadata
}

// Fetch NFT data using Covalent API
export async function getMetadataFromCovalent(networkId, account) {
    const COVALENT_KEY = 'ckey_888bd64636064665b65354aa956'
    const url = `https://api.covalenthq.com/v1/${networkId}/address/${account}/balances_v2/?nft=true&key=${COVALENT_KEY}`
    const response = await fetch(url)
    const responseJson = await response.json()
    console.log('Covalent balance response', responseJson)

    const plantNfts = responseJson.data.items.filter(item => {
        return item.contract_address === '0xd1e5b0ff1287aa9f9a268759062e4ab08b9dacbe'
    }).map(tokenItem => tokenItem.nft_data)[0]

    const plantMetadata = plantNfts.map(nftData => nftData.external_data)
    return plantMetadata
}

// Fetch NFT data using Web3
export async function getMetadataFromWeb3 (contract, account) {
    const baseURI = await contract.methods.baseURI().call()
    console.log('Base URI', baseURI)

    const tokenCount = await contract.methods.balanceOf(account).call()
    console.log('Got balance', tokenCount)

    let plantMetadata = []
    for (let tokenIndex = 0; tokenIndex < tokenCount; tokenIndex++) {
        const token = await contract.methods
            .tokenOfOwnerByIndex(account, tokenIndex)
            .call()
        console.log(`Token ${tokenIndex}: ${token}`)

        const tokenURI = await contract.methods
            .tokenURI(tokenIndex)
            .call()
        console.log('Got token URI', tokenURI)

        const tokenDataResponse = await fetch(tokenURI)
        const tokenData = await tokenDataResponse.json()
        console.log('Token data', tokenData)
        if (tokenData) {
            plantMetadata.push(tokenData)
        }
    }
    console.log('Got from web3', plantMetadata)

    return plantMetadata
}