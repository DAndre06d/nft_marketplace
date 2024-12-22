"use client";
import React, { useState, useEffect, useContext } from "react";
import { NFTContext } from "@/context/NFTContext";
import { NftCard } from "@/components/Cards";
import { NFTItem } from "@/context/NFTContext";
import { Loader } from "@/components/Loader";

const ListedNfts = () => {
    const { fetchMyNFTsorListedNFTs } = useContext(NFTContext);
    const [nfts, setNfts] = useState<NFTItem[]>([]);
    const [isLoading, setisLoading] = useState(true);
    //fetch Data
    useEffect(() => {
        const fetchData = async () => {
            const items = await fetchMyNFTsorListedNFTs("fetchItemsListed");
            setNfts(items);
            setisLoading(false);
        };
        fetchData();
    }, []);

    //Display render
    if (isLoading) {
        return (
            <div className="flex-start min-h-screen">
                <Loader />
            </div>
        );
    }
    if (!isLoading && nfts.length === 0) {
        return (
            <div className="flexCenter sm:p-4 p-16 min-h-screen">
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
                    No NFTs Listed for sale
                </h1>
            </div>
        );
    }
    return (
        <div className="flex justify-center sm:px-4 p-12 min-h-screen">
            <div className="w-full minmd:4/5 ">
                <div className="mt-4">
                    <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2 ml-4 sm:ml-2">
                        NFTS Listed For Sale
                    </h2>
                    <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                        {nfts.map((nft: NFTItem) => (
                            <NftCard key={nft.tokenId} nft={nft} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListedNfts;
