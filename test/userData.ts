const { keccak256 } = require("web3-utils");

const UserDataContract = artifacts.require("UserData");
const truffleAssert = require('truffle-assertions');

contract("User", accounts => {
    it("Should have been deployed", async () => {
        const userDataInstance = await UserDataContract.deployed();
        assert(userDataInstance.address.length > 0, "Address vector is empty");
    });

    it("Should be able to update user info", async () => {
        const userDataInstance = await UserDataContract.deployed();
        const account = accounts[0];
        await userDataInstance.updateUserData(account, JSON.stringify({name: "John", email: "test@test.com"}));
        const userDataStr = await userDataInstance.getUserData(accounts[0], {from: accounts[0]});
        const userData = JSON.parse(userDataStr);
        
        assert.isTrue(userData.name === "John",             "Name is not set correctly");
        assert.isTrue(userData.email === "test@test.com",   "Email is not set correctly");
    });

    it("Should be able to update update exposures", async () => {
        const userDataInstance = await UserDataContract.deployed();
        const companyAddress = accounts[0];
        const userAddress = accounts[1];

        await userDataInstance.updateUserData(userAddress, JSON.stringify({name: "John", email: "test@test.com"}), {from: userAddress});
        await userDataInstance.setCompanyAllow(userAddress, companyAddress, true, {from: userAddress});
    });

    it("Company should be able to get exposed user info", async () => {
        const userDataInstance = await UserDataContract.deployed();
        const companyAddress = accounts[0];
        const userAddress = accounts[1];

        await userDataInstance.setCompanyAllow(userAddress, companyAddress, true, {from: userAddress});

        await userDataInstance.getUserData(userAddress, {from: companyAddress});
    });

    it("Company should be not able to get unexposed user info", async () => {
        const userDataInstance = await UserDataContract.deployed();
        const companyAddress = accounts[0];
        const userAddress = accounts[1];

        await userDataInstance.updateUserData(userAddress, JSON.stringify({name: "John", email: "teste@teste.com"}), { from: userAddress });
        await userDataInstance.setCompanyAllow(userAddress, companyAddress, false, {from: userAddress});

        truffleAssert.reverts(userDataInstance.getUserData(userAddress, {from: companyAddress}))
    });

    // it("Should create a new account", async () => {
    //     const userDataInstance = await UserDataContract.deployed();
        
    //     // Generate a new private key
    //     const privateKey = web3.utils.randomHex(32);

    //     // Derive the public key from the private key
    //     const account = web3.eth.accounts.privateKeyToAccount(privateKey);
       
    //     const userCreds = {
    //         address: account.address,
    //         privateKey: privateKey,
    //     }

        
        
    //     await userDataInstance.updateUserData(userCreds.address, JSON.stringify({name:"Phil", email:"Email"}), {from: userCreds.address});
    //     const userInfo = JSON.parse(await userDataInstance.getUserData(userCreds.address));
    //     console.log(userInfo);
    //     assert.isTrue(userInfo.name === "Phil", "Name is not set correctly");

    // });

    
});