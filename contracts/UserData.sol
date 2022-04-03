// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/*
Contract used for storing and retrieving user data
*/

contract UserData {
    // Mapping of user addresses to user data
    mapping (address => string) public userList;

    //Events
    event userSent(string _data, address _address);
    
    // Modifier used to check if there's already an user entry in an address
    modifier empty(string memory _string) {
        bytes memory stringTest = bytes(_string);
        require(stringTest.length == 0);
        _;
    }

    // setUserData(): function used to save user data (name, phone, email etc.) to the blockchain. The data is stored in the userList mapping
    function setUserData(address _userAddress, string memory _jsonData) empty(userList[_userAddress]) public{
        //TODO: check if correctly signed
        
        userList[_userAddress] = _jsonData;
        emit userSent(_jsonData, _userAddress);
    }

    // getUserData(): function used to retrieve user data (name, phone, email etc.) from the blockchain. The data is retrieved from the userList mapping
    function getUserData(address _address) public view returns(string memory) {
        //TODO: check if correctly signed
        //emit inboxResponse(ipfs_hash);

        return userList[_address];
    }
}