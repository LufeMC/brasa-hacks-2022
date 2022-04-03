require('dotenv').config();
const express = require('express')
const app = express()
const routes = require('./routes')
const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient
const contract = require('truffle-contract');
const artifacts = require('./build/Auth.json');
const cors = require('cors');
app.use(express.json())
app.use(cors({
    origin: '*'
}));

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3('HTTP://localhost:8546')
    // var web3 = new Web3('https://ropsten.infura.io/v3/d494ee31eb454ab0b56926e7ff4dee42')
}

const LMS = contract(artifacts)
LMS.setProvider(web3.currentProvider)

web3.eth.getAccounts().then(async (accounts) => {
    console.log(accounts)
    const lms = await LMS.deployed();
    routes(app, lms, '0xa06AfBa6A830E5ba4f377bA7364b6ffec86e6AB7')

    app.listen(process.env.PORT || 8082, () => {
        console.log('listening on port 8082');
    })
});