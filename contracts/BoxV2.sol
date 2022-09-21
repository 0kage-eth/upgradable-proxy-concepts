//SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

/**
 * @notice BoxV2 is a new implementation contract where we change the logic for value
 * @notice We will try to change implementation of a Proxy contract to this BoxV2
 */

contract BoxV2 {
    uint256 internal value;

    event UpdateValue(uint256 updatedValue);

    function setValue(uint256 newValue) public {
        value = newValue + 2;
        emit UpdateValue(value);
    }

    function getValue() public view returns (uint256) {
        return value;
    }

    function increment() public {
        value += 2;

        emit UpdateValue(value);
    }

    function version() public pure returns (uint256) {
        return 2;
    }
}
