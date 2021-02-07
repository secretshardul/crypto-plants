// SPDX-License-Identifier: MIT
pragma solidity ^0.7;

import "../client/node_modules/@openzeppelin/contracts/presets/ERC721PresetMinterPauserAutoId.sol";

contract CryptoPlant is ERC721PresetMinterPauserAutoId {
    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) ERC721PresetMinterPauserAutoId(name, symbol, baseURI) {}
}
