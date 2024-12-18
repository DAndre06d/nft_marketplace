"use client";
import React, { useEffect, useState } from "react";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { marketAddress, marketAddressAbi } from "./constants";
import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";
import { heliaWithRemotePins } from "@helia/remote-pinning";
import { NextRouter } from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Directly import create from Web3Storage client
import { create } from "@web3-storage/w3up-client";
import { createSale } from "@/utils/nft";
interface NFTContextType {
    nftCurrency: string;
    connectWallet: () => void;
    currentAccount: string;
    uploadToIPFS: (file: File) => Promise<string | null>;
    createNFT: (
        formInput: FormInputProps,
        fileUrl: string,
        router: AppRouterInstance
    ) => Promise<void>;
}

export const NFTContext = React.createContext<NFTContextType>({
    nftCurrency: "",
    connectWallet: () => {},
    currentAccount: "",
    uploadToIPFS: (file: File) => Promise.resolve<string | null>(""),
    createNFT: async () => {},
});

interface NFTProviderProps {
    children: React.ReactNode;
}

interface FormInputProps {
    name: string;
    description: string;
    price: string;
}
//Data needed for ipfs upload in pinata
const key = process.env.NEXT_PUBLIC_PINATA_JWT;
const gatewayUrl = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL;
const pinataApiUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const headers = {
    Authorization: `Bearer ${key}`,
};
export const NFTProvider = ({ children }: NFTProviderProps) => {
    const [currentAccount, setcurrentAccount] = useState("");

    const checkIfWallerConnected = async () => {
        if (!window.ethereum)
            return alert("Please install metamask to use this app");

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        if (accounts.length) {
            setcurrentAccount(accounts[0]);
        } else {
            console.log("No accounts found");
        }
        console.log({ accounts });
    };

    const connectWallet = async () => {
        if (!window.ethereum)
            return alert("Please install metamask to use this app");
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setcurrentAccount(accounts[0]);
        window.location.reload();
    };

    useEffect(() => {
        checkIfWallerConnected();
        createSale("test", "0.025");
    }, []);

    const nftCurrency = "ETH";

    const uploadToIPFS = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post(pinataApiUrl, formData, {
                headers,
            });
            const cid = response.data.IpfsHash;
            return `https:${gatewayUrl}/ipfs/${cid}`;
        } catch (error) {
            console.error("Error uploading file to IPFS:", error);
            return null;
        }
    };
    const createNFT = async (
        formInput: FormInputProps,
        fileUrl: string | null,
        router: AppRouterInstance
    ): Promise<void> => {
        const { name, description, price } = formInput;

        if (!name || !description || !price || !fileUrl) {
            console.log("Missing required fields");
            return;
        }

        const data = {
            name,
            description,
            image: fileUrl,
        };

        try {
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                data,
                {
                    headers,
                }
            );
            const cid = res.data.IpfsHash;
            const url = `https:${gatewayUrl}/ipfs/${cid}`;
            await createSale(url, price);
            router.push("/");
        } catch (error) {
            console.error("Error creating NFT:", error);
        }
    };

    return (
        <NFTContext.Provider
            value={{
                nftCurrency,
                connectWallet,
                currentAccount,
                uploadToIPFS,
                createNFT,
            }}
        >
            {children}
        </NFTContext.Provider>
    );
};
