// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/*
Contract used for storing and retrieving user data
*/

contract UserData {
    // Mapping of user addresses to user data
    mapping (address => string) userDataMap;
    mapping (address => mapping(address => bool)) userCompanyAllow;

    // Modifier used to check if there's already an user entry in an address
    modifier emptyUser(string memory _jsonData) {
        bytes memory stringTest = bytes(_jsonData);
        require(stringTest.length == 0, "User already exists");
        _;
    }

    // setUserData(): function used to save user data (name, phone, email etc.) to the blockchain. The data is stored in the userDataMap mapping
    function setUserData(address _userAddress, string calldata _jsonData) emptyUser (userDataMap[_userAddress]) external {
        require(_userAddress == msg.sender, "Only the user can update their info");
        userDataMap[_userAddress] = _jsonData; // Update user data (overwrite existing data)
    }

    // setCompanyAllow(): function used to allow a user to access a company's data
    function setCompanyAllow(address _userAddress, address _companyAddress, bool _allow) external {
        require(_userAddress == msg.sender, "Only the user can update their allow list");
        userCompanyAllow[_userAddress][_companyAddress] = _allow;
    }

    // updateUserData(): function used to update user data (name, phone, email etc.) to the blockchain. The data is stored in the userDataMap mapping
    function updateUserData(address _userAddress, string calldata _jsonData) external {
        require(_userAddress == msg.sender, "Only the user can update their info");
        userDataMap[_userAddress] = _jsonData; // Update user data (overwrite existing data)
    }

    // isCompanyAllowed(): function used to check if a company is allowed to access user data
    function isCompanyAllowedOnUser(address _userAddress, address _companyAddress) private view returns (bool){
        return userCompanyAllow[_userAddress][_companyAddress];
    }

    // getUserData(): function used to retrieve user data (name, phone, email etc.) from the blockchain. The data is retrieved from the userDataMap mapping
    function getUserData(address _userAddress) external view returns(string memory _jsonData) {
        require (
            _userAddress == msg.sender || isCompanyAllowedOnUser(_userAddress, msg.sender), 
            "Only the user or the allowed company can access user's data");

        _jsonData = userDataMap[_userAddress];

        return _jsonData;
    }
}