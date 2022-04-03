require('dotenv').config();

import express from 'express';
import cors from 'cors';
import web3 from './web3-provided';

import {routes} from './routes'

// const mongodb = require('mongodb').MongoClient

const makeContract = require('truffle-contract');
import userDataContractJson from './build/contracts/UserData.json';

async function startServer() {
    // Create react server with express and cors 
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: '*'
    }));

    // Get the contract instance from the json file
    const UserDataContract = makeContract(userDataContractJson);
    UserDataContract.setProvider(web3.currentProvider);
    const userDataInstance = await UserDataContract.deployed();

    const accounts = await web3.eth.getAccounts();
    console.log(`Accounts: `, accounts);
    
    // Add the routes to the server
    routes(app, userDataInstance);

    const lastBlockNb = await web3.eth.getBlockNumber();
    console.log(`Last block number: ${lastBlockNb}`);

    // Start the server
    app.listen(process.env.PORT || 8082, () => {
        console.log(`listening on port ${process.env.PORT || 8082} `);
    })
}

startServer();