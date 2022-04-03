import shortid from 'shortid';
import { Request, Response, Express } from 'express';
import { UserDataInstance } from './types/truffle-contracts/UserData'
import web3 from './web3-provided';
import userDataContractJson from './build/contracts/UserData.json';
import abiDecoder from 'abi-decoder';

abiDecoder.addABI(userDataContractJson.abi);

function getErrorReason(error: any) {
    return error?.reason ?? "An error occured during the register process";
}

export const routes = (app: Express, userDataInstance: UserDataInstance) => {
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
            await userDataInstance.setUserData(address, JSON.stringify(userData), {from: address}); // tries to insert user data to the blockchain
            res.status(200).json({ "Status": "Success", "Message": `User data added to blockchain (addr = ${address})` });
        }
        catch (err: any) {
            console.error("Error: ", err);
            const reason = getErrorReason(err);
            res.status(500).json({ "Status": "Failed", "Reason":  reason });
        }
    });

    // Route used to update a user's personal information to the blockchain
    // NOTE: Used for testing. This should be on the frontend.
    app.put('/update', async (req: Request, res: Response) => {
        let privateKey = req.body.privateKey;
        let address = req.body.address; // address = 20 "lower" bytes from the public key (32 bytes)
        let userData = req.body.userData;

        console.log("\n== Request to /update ==");
        console.log("privateKey: ", privateKey);
        console.log("address: ", address);
        console.log("userData: ", userData)

        try {
            await userDataInstance.updateUserData(address, JSON.stringify(userData), {from: address}); // tries to update user data to the blockchain
            res.status(200).json({ "Status": "Success", "Message": `User data updated in blockchain (addr = ${address})` });
        }
        catch (err) {
            console.error("Error: ", err);
            const reason = getErrorReason(err);
            res.status(500).json({ "Status": "Failed", "Reason": reason });
        }
    });

    // Route used to retrieve user's personal information according to its public address in the blockchain
    // NOTE: Used for testing. This should be on the frontend.
    app.post('/retrieve', async (req: Request, res: Response) => {
        let userAddress = req.body.userAddress;
        
        console.log("\n== Request to /register ==");
        console.log("userAddress: ", userAddress);

        try {
            let userData = await userDataInstance.getUserData(userAddress, { from: userAddress });
            userData = JSON.parse(userData);
            res.json({ "Status": "Success", "User-data": JSON.stringify(userData) });
        }
        catch (err) {
            console.error("Error: ", err);
            const reason = getErrorReason(err);
            res.status(500).json({ "Status": "Failed", "Reason": reason });
        }
    });

    app.get('/history', async (req: Request, res: Response) => {
        const eth = web3.eth;

        // Get the latest block
        const latestBlockNb = await eth.getBlockNumber();

        // List all transactions
        const logs = await eth.getPastLogs({
            fromBlock: 0,
            toBlock: latestBlockNb,
            address: undefined
        });

        const transactionHashes = logs.map(log => log.transactionHash);
        const transactions = await Promise.all(transactionHashes.map(hash => eth.getTransaction(hash)));

        // Transform the transactions into a more readable format
        const transactionInfoVec = transactions.map(transaction => {
            const { from, to, input } = transaction;

            /**
             * The input of a transaction is a string of bytes.
             * The first 4 bytes are the length of the string.
             * The next bytes are the actual string.
             * We need to extract the actual string.
            */

            // const length = parseInt(input.substring(0, 4), 16);
            // const string = input.substring(4, 4 + length * 2);
            
            /**
             * The string is encoded in hexadecimal.
             * It represents a function call.
             * We need to decode it.
             * 
             * To decode the string, we need to know the ABI of the contract.
             * We can get it from the contract's JSON file.
             * 
             * The ABI is a list of functions.
             * Each function has a name, a list of parameters, and a return type.
             * 
             */

            const meth = abiDecoder.decodeMethod(input);
            

            const params = meth.params.map(param => `${param.type} ${param.name} = ${param.value}`);
            const repr = `${meth.name}(${params.join(', ')})`;


            return repr;
        });

        // Filter only transactions that are related to the userData contract
        // transactions = transactions.filter(tx => tx.topics[0] === userDataInstance.address);

        console.log("\n== Request to /history ==");
        console.log("transactions: ", transactionInfoVec);
        res.json({ "Status": "Success", "Transactions": transactionInfoVec });
    });
}