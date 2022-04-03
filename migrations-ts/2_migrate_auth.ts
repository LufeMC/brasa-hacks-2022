var UserData = artifacts.require("UserData");

module.exports = function(deployer: any) {
    deployer.deploy(UserData); // deploy the contract to the Blockchain
};

export {};