import hre from "hardhat";

async function main() {
    const NFTMarketplace = await hre.ethers.getContractFactory(
        "NFTMarketplace"
    );
    const nftMarketPlace = await NFTMarketplace.deploy();
    const deployTransaction = nftMarketPlace.deploymentTransaction();
    await deployTransaction?.wait();
    const address = await nftMarketPlace.getAddress();

    console.log(`NFTMarketplace deployed to: ${address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error: Error) => {
        console.error(error);
        process.exit(1);
    });
