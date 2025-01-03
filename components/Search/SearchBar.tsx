import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import images from "@/assets/assets";
import { Input } from "../Inputs";
interface SearcbarProps {
    activeSelect: string;
    setActiveSelect: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (value: string) => void;
    clearSearch: () => void;
}

const SearchBar = ({
    handleSearch,
    clearSearch,
    setActiveSelect,
    activeSelect,
}: SearcbarProps) => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [toggle, setToggle] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(debouncedSearch);
        }, 1000);
        return () => clearTimeout(timer);
    }, [debouncedSearch]);

    useEffect(() => {
        if (search) {
            handleSearch(search);
        } else {
            clearSearch();
        }
    }, [search]);

    return (
        <>
            <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray py-3 px-4 rounded-md">
                <Image
                    src={images.search}
                    alt="search logo"
                    className={`object-contain ${
                        theme === "light" ? "filter invert" : ""
                    }`}
                    width={20}
                    height={20}
                />
                <input
                    type="text"
                    placeholder="Search NFT Here"
                    className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-1 font-normal text-xs outline-none"
                    onChange={(e) => setDebouncedSearch(e.target.value)}
                    value={debouncedSearch}
                />
            </div>
            <div
                onClick={() =>
                    setToggle((prevVal) => {
                        return !prevVal;
                    })
                }
                className="sm:py-3 relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray px-4 rounded-md"
            >
                <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs">
                    {activeSelect}
                </p>
                <Image
                    src={images.arrow}
                    className={`object-contain ${
                        theme === "light" ? "filter invert" : ""
                    }`}
                    width={15}
                    height={15}
                    alt="arrow down logo"
                />
                {toggle && (
                    <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray py-3 px-4 rounded-md">
                        {[
                            "Recently Added",
                            "Price (Low to High)",
                            "Price (High to Low)",
                        ].map((item) => (
                            <p
                                key={item}
                                className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs my-3 cursor-pointer"
                                onClick={() => setActiveSelect(item)}
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchBar;
