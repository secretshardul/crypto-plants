// SPDX-License-Identifier: MIT
pragma solidity ^0.7;

import "../client/node_modules/@openzeppelin/contracts/presets/ERC721PresetMinterPauserAutoId.sol";

contract CryptoPlant is ERC721PresetMinterPauserAutoId {
    address payable public petaAddress;

    constructor()
        ERC721PresetMinterPauserAutoId(
            "CryptoPlant",
            "CPT",
            "https://my-json-server.typicode.com/abcoathup/samplenft/tokens/"
        )
    {
        petaAddress = 0x42F323c617c0a6d18547B8a2AaF8BcD1Abe617c9;
    }

    receive() external payable {}

    function purchaseSeed() public payable {
        require(msg.value == 0.1 ether);

        petaAddress.transfer(0.09 ether);
    }
}
