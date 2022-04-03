const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'other potato current weather roast tell click sample flock essence bunker expand';

module.exports = {
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "/build"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8546,
      network_id: "*" //Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/d494ee31eb454ab0b56926e7ff4dee42")
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }
  }
};