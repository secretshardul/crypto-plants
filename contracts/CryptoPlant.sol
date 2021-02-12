// SPDX-License-Identifier: MIT
pragma solidity ^0.6;

import "../client/node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../client/node_modules/@openzeppelin/contracts/presets/ERC721PresetMinterPauserAutoId.sol";
import "../client/node_modules/@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "../client/node_modules/@chainlink/contracts/src/v0.6/Chainlink.sol";

contract CryptoPlant is ERC721PresetMinterPauserAutoId, ChainlinkClient {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;
    address payable public orgAddress;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor()
        public
        ERC721PresetMinterPauserAutoId(
            "CryptoPlant",
            "CPT",
            "https://crypto-plants-metadata-backend.herokuapp.com/plant/"
        )
    {
        orgAddress = 0x42F323c617c0a6d18547B8a2AaF8BcD1Abe617c9;

        //chainlink
        oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        jobId = "29fa9aa13bf1468788b7cc4a500a45b8";
        fee = 0.1 * 10**18; // 0.1 LINK
    }

    receive() external payable {}

    function purchaseSeed() public payable returns (bytes32 requestId) {
        require(msg.value == 0.00001 ether);
        orgAddress.transfer(0.0000095 ether); // 5% comission

        // Mint token
        _mint(msg.sender, _tokenIdTracker.current());
        _tokenIdTracker.increment();

        // API call to create metadata using Chainlink
        Chainlink.Request memory request =
            buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        request.add(
            "get",
            "https://crypto-plants-metadata-backend.herokuapp.com/newplant/"
        );
        int256 timesAmount = 10**18;
        request.addInt("times", timesAmount);

        return sendChainlinkRequestTo(oracle, request, fee);
    }

     function fulfill(bytes32 _requestId, uint256 _volume)
        public
        recordChainlinkFulfillment(_requestId)
    {
    }
}
