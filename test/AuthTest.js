const UserAuth = artifacts.require("./Auth.sol")
contract("UserAuth", accounts =>{
    it("emit event when you send the data", async()=>{
        //ait for the contract
        const userAuth = await UserAuth.deployed()

        //set a variable to false and get event listener
        eventEmitted = false
        //var event = ()
        await userAuth.userSent((err,res)=>{
            eventEmitted=true
        })
        //call the contract function  which sends the ipfs address
        await userAuth.sendUser(accounts[1], "sampleAddress", {from: accounts[0]})
        assert.equal(eventEmitted, true, "sending an Data request does not emit an event")
    })
})