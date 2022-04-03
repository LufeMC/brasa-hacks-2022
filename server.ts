require('dotenv').config();

import express from 'express';
import cors from 'cors';
import web3 from './web3-provided';

import {routes} from './routes'

// const mongodb = require('mongodb').MongoClient

const makeContract = require('truffle-contract');
import userDataContractJson from './build/contracts/UserData.json';

async function startServer() {
    console.log('starting server 1')
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: '*'
    }));

    const UserDataContract = makeContract(userDataContractJson);
    UserDataContract.setProvider(web3.currentProvider);

    const accounts = await web3.eth.getAccounts();
    
    console.log(accounts);

    const userDataInstance = await UserDataContract.deployed();

    const testAddress = accounts[0];

    routes(app, userDataInstance, testAddress);

    app.listen(process.env.PORT || 8082, () => {
        console.log(`listening on port ${process.env.PORT || 8082} `);
    })
}

startServer();