import { HardhatUserConfig } from "hardhat/config";
import fs from "fs";
import "@nomicfoundation/hardhat-toolbox";

const privateKey = fs.readFileSync(".secret").toString().trim();

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
    },
};

export default config;
