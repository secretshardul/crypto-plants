// SPDX-License-Identifier: MIT
pragma solidity ^0.7;

import "./SimpleStorage.sol";
import "../client/node_modules/@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract CryptoPlant is ERC20PresetMinterPauser {
    constructor() public ERC20PresetMinterPauser("CryptoPlant", "CPT") {}
}
