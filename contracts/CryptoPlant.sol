// SPDX-License-Identifier: MIT
pragma solidity ^0.7;

import "../client/node_modules/@openzeppelin/contracts/presets/ERC721PresetMinterPauserAutoId.sol";

contract CryptoPlant is ERC721PresetMinterPauserAutoId {
    uint256 public seedCost = 500;

    constructor()
        ERC721PresetMinterPauserAutoId(
            "CryptoPlant",
            "CPT",
            "https://my-json-server.typicode.com/abcoathup/samplenft/tokens/"
        )
    {}

    // function purchaseSeed(uint256 x) public {
    //     // require(msg.value == seedCost);
    // }

    receive() external payable {}

    function purchaseSeed() public payable {
        require(msg.value == 0.1 ether);
    }
}
