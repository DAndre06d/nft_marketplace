"use client";
import React, { useState, useEffect, useContext } from "react";
import { NFTContext } from "@/context/NFTContext";
import { Button } from "@/components/Button";
import { Input } from "@/components/Inputs";
import { NFTItem } from "@/context/NFTContext";
import { Loader } from "@/components/Loader";
import { shortenAddress } from "@/utils/string";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const ResellNFT = () => {
    const router = useRouter();
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setisLoading] = useState(true);
    const { createSale } = useContext(NFTContext);
    const searchParams = useSearchParams();

    const tokenId = searchParams.get("tokenId");
    const tokenURI = searchParams.get("tokenURI");

    useEffect(() => {
        const fetchNFT = async () => {
            if (!tokenURI) return;
            const { data } = await axios.get(tokenURI);
            setPrice(data.price);
            setImage(data.image);
            setisLoading(false);
        };
        if (tokenURI) {
            fetchNFT();
        }
    }, [tokenURI]);
    const resell = async () => {
        if (tokenURI && tokenId) {
            await createSale(tokenURI, price, true, tokenId);
        }
        router.push("/");
    };
    if (isLoading) {
        return (
            <div className="flex-start min-h-screen">
                <Loader />
            </div>
        );
    }
    return (
        <div className="flex justify-center sm:px-4 p-12">
            <div className="w-3/5 md:w-full">
                <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
                    Resell NFT
                </h1>
                <Input
                    inputType="number"
                    title="Price"
                    placeholder="NFT Price"
                    handleClick={(e) => setPrice(e.target.value)}
                />
                {image && (
                    <img src={image} className="rounded mt-4 " width={350} />
                )}
                <div className="mt-7 w-full flex justify-end">
                    <Button
                        btnName="List NFT"
                        classStyles="rounded-xl"
                        handleClick={resell}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResellNFT;
