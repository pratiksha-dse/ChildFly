// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Bounties{
    string public name = "bounty";
    address public owner;
    address public recipient;
    uint public admin_amt;
    mapping (address => uint) prizes;
    constructor() payable public {
        owner = msg.sender;
        admin_amt = msg.value;
    }
    modifier isOwner{
        require(msg.sender == owner);
        _;
    }
    event Sent(address _from, address _to, uint amt);
    function givePrize(address payable _receiver, uint amt) public payable{
        recipient = _receiver;
        _receiver.transfer(amt);
        prizes[_receiver] += amt;
        emit Sent(msg.sender, recipient, amt);
    }
    function print_prize() public view returns(uint) {
        return prizes[recipient];
    }   
    function getOwnerBalance() public view returns(uint){
        return owner.balance;
    }
}