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
import SearchBar from "@/components/Search/SearchBar";

const MyNFTs = () => {
    const [activeSelect, setActiveSelect] = useState("Recently Added");
    const [nfts, setNfts] = useState<NFTItem[]>([]);
    const [nftsCopy, setNftsCopy] = useState<NFTItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { fetchMyNFTsorListedNFTs, currentAccount } = useContext(NFTContext);
    useEffect(() => {
        const fetchData = async () => {
            const items = await fetchMyNFTsorListedNFTs("");
            setNfts(items);
            setNftsCopy(items);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const onHandleSearch = (value: string) => {
        const filteredNfts = nfts.filter(({ name }) =>
            name.toLowerCase().includes(value.toLowerCase())
        );
        if (filteredNfts.length) {
            setNfts(filteredNfts);
        } else {
            setNfts(nftsCopy);
        }
    };
    const onClearSearch = () => {
        if (nfts.length && nftsCopy.length) {
            setNfts(nftsCopy);
        }
    };
    useEffect(() => {
        const sortedNFTs = [...nfts];
        switch (activeSelect) {
            case "Price (Low to High)":
                setNfts(
                    sortedNFTs.sort(
                        (a, b) => parseInt(a.price) - parseInt(b.price)
                    )
                );
                break;
            case "Price (High to Low)":
                setNfts(
                    sortedNFTs.sort(
                        (a, b) => parseInt(b.price) - parseInt(a.price)
                    )
                );
                break;
            case "Recently Added":
                setNfts(
                    sortedNFTs.sort((a, b) => {
                        return (
                            parseInt(b.tokenId, 10) - parseInt(a.tokenId, 10)
                        );
                    })
                );
                break;

            default:
                setNfts(nfts);
                break;
        }
    }, [activeSelect]);
    if (isLoading) {
        return (
            <div className="flex-start min-h-screen">
                <Loader />
            </div>
        );
    }
    return (
        <div className="w-full flex justify-start items-center flex-col min-h-screen">
            <div className="w-full flexCenter flex-col relative">
                {/* Banner */}
                <Banner
                    text="Your Nifty NFTS"
                    childStyles="text-center mb-4"
                    parentStyles="h-80 justify-center"
                />

                {/* Image Section */}
                <div className="flexCenter flex-col relative -mt-20 z-5">
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
            {!isLoading && nfts.length === 0 && nftsCopy.length === 0 ? (
                <div className="flexCenter sm:p-4 p-16">
                    <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">
                        No NFTs Owned
                    </h1>
                </div>
            ) : (
                <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
                    <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
                        <SearchBar
                            activeSelect={activeSelect}
                            setActiveSelect={setActiveSelect}
                            handleSearch={onHandleSearch}
                            clearSearch={onClearSearch}
                        />
                    </div>
                    <div className="mt-3 w-full flex flex-wrap">
                        {nfts.map((nft: NFTItem) => (
                            <NftCard
                                key={nft.tokenId}
                                nft={nft}
                                onProfilePage
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyNFTs;
