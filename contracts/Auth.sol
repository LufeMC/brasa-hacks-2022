// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auth{
    //Structure
    mapping (string=>string) public userAuth;

    //Events
    event userSent(string _data, string _address);
    
    //Modifiers
    modifier notFull (string memory _string) {
    bytes memory stringTest = bytes(_string);
    require(stringTest.length==0);
    _;
    }

    // An empty constructor that creates an instance of the conteact
    constructor() public{}
    //takes in receiver's address and IPFS hash. Places the IPFSadress in the receiver's inbox
    function sendUser(string memory _address, string memory _data) notFull(userAuth[_address]) public{
        userAuth[_address] = _data;
        emit userSent(_data, _address);
    }
    //retrieves hash
    function getData(string memory _address) public view returns(string memory) {
        string memory ipfs_hash=userAuth[_address];
         //emit inboxResponse(ipfs_hash);
        return ipfs_hash;
    }
}