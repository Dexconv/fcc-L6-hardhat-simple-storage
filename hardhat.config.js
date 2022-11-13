require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("./tasks/block-number")
//redundant when using hardhat-toolbox:
//require("@nomiclabs/hardhat-etherscan")
//require("hardhat-gas-reporter")
//require("solidity-coverage")

/** @type import('hardhat/config').HardhatUserConfig */
const GEORLI_RPC_URL =
    process.env.GEORLI_RPC_URL || "https://eth-goerli/example"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GEORLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.17",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColor: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
}
task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})
