import {
    BrowserProvider,
    parseUnits,
    Contract,
    ContractRunner,
    JsonRpcProvider,
    formatUnits,
} from "ethers";
import Web3Modal from "web3modal";
import { marketAddress, marketAddressAbi } from "@/context/constants";
import axios from "axios";
import { NFTItem } from "@/context/NFTContext";

export const createSale = async (
    url: string,
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
) => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new BrowserProvider(connection);
        const signer = await provider.getSigner();
        const price = parseUnits(formInputPrice, "ether");
        const contract = await fetchContract(signer);
        const listingPrice = await contract.getListingPrice();

        const transaction = !isReselling
            ? await contract.createToken(url, price, {
                  value: listingPrice.toString(),
              })
            : await contract.resellToken(id, price, {
                  value: listingPrice.toString(),
              });

        await transaction.wait();
        console.log("Transaction successful!");
    } catch (error: any) {
        if (error.code === 4001) {
            console.error("Transaction canceled by the user.");
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
};

const fetchContract = async (signerOrProvider: ContractRunner) => {
    return new Contract(marketAddress, marketAddressAbi, signerOrProvider);
};

export const fetchNFTs = async () => {
    try {
        const provider = new JsonRpcProvider();
        const contract = await fetchContract(provider);
        const data = await contract.fetchMarketItems();

        const items = await Promise.all(
            data.map(
                async ({
                    tokenId,
                    seller,
                    owner,
                    price: unformatterPrice,
                }: {
                    tokenId: string;
                    seller: string;
                    owner: string;
                    price: string;
                }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: { image, name, description },
                    } = await axios.get(tokenURI);
                    const price = formatUnits(
                        unformatterPrice.toString(),
                        "ether"
                    );
                    return {
                        price,
                        tokenId: parseInt(tokenId),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                    };
                }
            )
        );
        return items;
    } catch (error: any) {
        console.error("An error occurred while fetching NFTs:", error);
        return [];
    }
};

export const fetchMyNFTsorListedNFTs = async (type: string) => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = await fetchContract(signer);

        const data =
            type === "fetchItemsListed"
                ? await contract.fetchItemsListed()
                : await contract.fetchMyNFTs();

        const items = await Promise.all(
            data.map(
                async ({
                    tokenId,
                    seller,
                    owner,
                    price: unformatterPrice,
                }: {
                    tokenId: string;
                    seller: string;
                    owner: string;
                    price: string;
                }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: { image, name, description },
                    } = await axios.get(tokenURI);
                    const price = formatUnits(
                        unformatterPrice.toString(),
                        "ether"
                    );
                    return {
                        price,
                        tokenId: parseInt(tokenId),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                    };
                }
            )
        );
        return items;
    } catch (error: any) {
        console.error("An error occurred while fetching user NFTs:", error);
        return [];
    }
};

export const buyNFT = async (nft: NFTItem) => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = await fetchContract(signer);
        const price = parseUnits(nft.price.toString(), "ether");

        const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price,
        });
        await transaction.wait();
        console.log("NFT purchased successfully!");
    } catch (error: any) {
        if (error.code === 4001) {
            console.error("Transaction canceled by the user.");
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
};
