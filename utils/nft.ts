import { BrowserProvider, parseUnits, Contract, ContractRunner } from "ethers";
import Web3Modal from "web3modal";
import { marketAddress, marketAddressAbi } from "@/context/constants";

export const createSale = async (
    url: string,
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    const provider = new BrowserProvider(connection);

    const signer = await provider.getSigner();
    const price = parseUnits(formInputPrice, "ether");
    const contract = await fetchContract(signer);
    const listingPrice = await contract.getListingPrice();
    const transaction = await contract.createToken(url, price, {
        value: listingPrice.toString(),
    });
    await transaction.wait();
};

const fetchContract = async (signerOrProvider: ContractRunner) => {
    return new Contract(marketAddress, marketAddressAbi, signerOrProvider);
};
