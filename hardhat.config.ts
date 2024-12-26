import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const polygonAmoyUrl = `https://polygon-amoy.g.alchemy.com/v2/${process.env.APIKEY_POLYGON}`;
const config: HardhatUserConfig = {
    solidity: "0.8.28",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        localhost: {
            url: "http://localhost:8545",
            chainId: 1337,
        },
        polygonAmoy: {
            url: polygonAmoyUrl,
            accounts: [process.env.PRIVATE_WALLET_ADDR!],
            chainId: 80002,
        },
    },
};

export default config;
