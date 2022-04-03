import Web3 from 'web3';

export const DEFAULT_PROVIDER_URL = 'http://127.0.0.1:7545';
const provider = new Web3.providers.HttpProvider(DEFAULT_PROVIDER_URL);
const web3 = new Web3(provider);

export default web3;