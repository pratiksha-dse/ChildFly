module.exports = {
  networks: {
    development: {
     host: "127.0.0.1:7545",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
  },  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.5.0", 
      optimizer:{
        enabled: true,
        runs: 200
      },     // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
