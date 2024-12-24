"use client";
import React, { useState, useEffect, useContext } from "react";
import { NFTContext } from "@/context/NFTContext";
import { NftCard } from "@/components/Cards";
import { NFTItem } from "@/context/NFTContext";
import { Loader } from "@/components/Loader";
import Image from "next/image";
import images from "@/assets/assets";
import { Banner } from "@/components/Banner";
import { shortenAddress } from "@/utils/string";

const MyNFTs = () => {
    const [nfts, setNfts] = useState<NFTItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { fetchMyNFTsorListedNFTs, currentAccount } = useContext(NFTContext);
    useEffect(() => {
        const fetchData = async () => {
            const items = await fetchMyNFTsorListedNFTs("");
            setNfts(items);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    if (isLoading) {
        return (
            <div className="flex-start min-h-screen">
                <Loader />
            </div>
        );
    }
    return (
        <div className="w-full flex justify-start items-center flex-col min-h-screen">
            <div className="w-full flexCenter flex-col">
                <Banner
                    text="Your Nifty NFTS"
                    childStyles="text-center mb-4"
                    parentStyles="h-80 justify-center"
                />
                <div className="flexCenter flex-col -mt-20 z-20">
                    <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
                        <Image
                            src={images.creator1}
                            alt="User profile"
                            className="rounded-full object-cover"
                        />
                    </div>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
                        {shortenAddress(currentAccount)}
                    </p>
                </div>
            </div>
            {!isLoading && nfts.length === 0 ? (
                <div className="flexCenter sm:p-4 p-16">
                    <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">
                        No NFTs Owned
                    </h1>
                </div>
            ) : (
                <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
                    <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
                        Search Bar
                    </div>
                    <div className="mt-3 w-full flex flex-wrap">
                        {nfts.map((nft: NFTItem) => (
                            <NftCard key={nft.tokenId} nft={nft} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyNFTs;
