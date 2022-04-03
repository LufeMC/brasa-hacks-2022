const shortid = require('shortid');
import { Request, Response } from 'express';


export const routes = (app: any, authInstance: any, account: string) => {
    // Route used to add a user's personal information to the blockchain
    // NOTE: Used for testing. This should be on the frontend.
    app.post('/register', async (req: Request, res: Response) => {
        let privateKey = req.body.privateKey;
        let address = req.body.address; // address = 20 "lower" bytes from the public key (32 bytes)
        let userData = req.body.userData;

        console.log("\n== Request to /register ==");
        console.log("privateKey: ", privateKey);
        console.log("address: ", address);
        console.log("userData: ", userData)

        try {
            await authInstance.setUserData(address, JSON.stringify(userData), {from: account}); // tries to insert user data to the blockchain
            res.status(200).json({ "Status": "Success", "Message": `User data added to blockchain (addr = ${address})` });
        }
        catch (err) {
            console.log("Error: ", err);
            res.status(500).json({ "Status": "Failed", "Reason": "An error occured during the register process" });
        }
    });

    // Route used to retrieve user's personal information according to its public address in the blockchain
    // NOTE: Used for testing. This should be on the frontend.
    app.post('/retrieve', async (req: Request, res: Response) => {
        let userAddress = req.body.userAddress;
        
        console.log("\n== Request to /register ==");
        console.log("userAddress: ", userAddress);

        try {
            let userData = await authInstance.getUserData(userAddress, { from: account });
            res.json({ "Status": "Success", "User-data": JSON.stringify(userData) });
        }
        catch (err) {
            console.log("Error: ", err);
            res.status(500).json({ "Status": "Failed", "Reason": "An error occured while retrieving user data" });
        }
    });
}