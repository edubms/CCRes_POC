require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
 
module.exports = {
  networks: {
    bsctest: {
      provider: new HDWalletProvider({
        mnemonic: {
          phrase: process.env.SECRET
        },
        providerOrUrl: "http://127.0.0.1:7545",
      }),
      network_id: "5777"
    }
  },
  compilers: {
    solc: {
      version: "^0.8.17",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};