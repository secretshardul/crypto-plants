// SPDX-License-Identifier: MIT
pragma solidity ^0.7;

import "../client/node_modules/@openzeppelin/contracts/presets/ERC721PresetMinterPauserAutoId.sol";

contract CryptoPlant is ERC721PresetMinterPauserAutoId {
    constructor()
        ERC721PresetMinterPauserAutoId(
            "CryptoPlant",
            "CPT",
            "https://my-json-server.typicode.com/abcoathup/samplenft/tokens/"
        )
    {}
}
