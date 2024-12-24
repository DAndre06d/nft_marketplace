"use client";
import React, { useState, useEffect, useContext } from "react";
import { NFTContext } from "@/context/NFTContext";
import { NftCard } from "@/components/Cards";
import { NFTItem } from "@/context/NFTContext";
import { Loader } from "@/components/Loader";
import Image from "next/image";
import images from "@/assets/assets";
import { Button } from "@/components/Button";
import { shortenAddress } from "@/utils/string";
import { useSearchParams } from "next/navigation";
const NFTDetails = ({}) => {
    const { currentAccount } = useContext(NFTContext);
    const [isLoading, setIsLoading] = useState(true);
    const [nft, setNft] = useState<NFTItem>({} as NFTItem);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchDataFromURL = () => {
            const paramsObject: Record<string, string> = {};
            searchParams.forEach((param, key) => {
                paramsObject[key] = param;
            });
            console.log(paramsObject);
        };
        fetchDataFromURL();
    }, [searchParams]);
    return (
        <div className="relative flex justify-center md:flex-col min-h-screen">
            NFTDetails
            <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r  md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
                <div>
                    <Image src={""} alt={nft.image} />
                </div>
            </div>
        </div>
    );
};

export default NFTDetails;
