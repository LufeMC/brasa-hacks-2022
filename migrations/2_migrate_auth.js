var UserAuth = artifacts.require("./Auth.sol");
module.exports = function(deployer) {
    deployer.deploy(UserAuth);
};