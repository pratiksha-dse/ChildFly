// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Bounties{
    string public name = "Virtual Ether";
    event Transfer(
        address indexed _sender,
        address indexed _receiver,
        uint amt
    );
    event Approve(
        address indexed _owner,
        address indexed _spender,
        uint amt
    );

}