//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

/**
 * @notice This is a default implementation contract that will be associated with a proxy
 *
 */
contract Box {
    uint256 internal value;

    event UpdateValue(uint256 updatedValue);

    function setValue(uint256 newValue) public {
        value = newValue;

        emit UpdateValue(value);
    }

    function getValue() public view returns (uint256) {
        return value;
    }

    function version() public pure returns (uint256) {
        return 1;
    }
}
