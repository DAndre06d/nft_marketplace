"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import MenuItems from "@/components/Navbar/MenuItems";

import images from "@/assets/assets";
import NavbarButtonGroup from "./NavbarButtonGroup";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathName = usePathname();
    const { theme, setTheme } = useTheme();
    const [active, setactive] = useState("Explore NFTs");
    const router = useRouter();
    const [isOpen, setisOpen] = useState(false);
    const checkActive = (
        active: string,
        setActive: React.Dispatch<React.SetStateAction<string>>
    ) => {
        switch (pathName) {
            case "/":
                if (active !== "Explore NFTs") setActive("Explore NFTs");
                break;
            case "/listed-nfts":
                if (active !== "Listed NFts") setActive("Listed NFts");
                break;
            case "/my-nfts":
                if (active !== "My NFTs") setActive("My NFTs");
                break;
            case "/create-nft":
                setActive("");
                break;
            default:
                setActive("");
                break;
        }
        console.log("asdas");
    };
    useEffect(() => {
        checkActive(active, setactive);
    }, [pathName]);
    useEffect(() => {
        setTheme("dark");
    }, []);
    return (
        <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
            <div className="flex flex-1 flex-row justify-start">
                <Link href={"/"}>
                    <div
                        className="flexCenter cursor-pointer"
                        onClick={() => {
                            setactive("Explore NFTs");
                            setisOpen(false);
                        }}
                    >
                        <Image
                            src={images.logo02}
                            alt="Logo"
                            className="object-contain"
                            width={32}
                            height={32}
                        />
                        <p className="dark:text-white text-nft-black-1font-semibold text-lg ml-1 md:hidden">
                            CryptoKet
                        </p>
                    </div>
                </Link>
            </div>
            <div className="flex flex-initial flex-row justify-end">
                <div className="flex items-center mr-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                        id="checkbox"
                        onChange={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                        }
                    />
                    <label
                        htmlFor="checkbox"
                        className="flexBetween w-8 h-4 bg-black
                    rounded-2xl p-1 relative label"
                    >
                        <i className="fas fa-sun" />
                        <i className="fas fa-moon" />
                        <div className="w-3 h-3 absolute rounded-full ball bg-white" />
                    </label>
                </div>
                <div className="md:hidden flex">
                    <MenuItems active={active} setActive={setactive} />
                    <div className="ml-4">
                        <NavbarButtonGroup
                            setActive={setactive}
                            router={router}
                        />
                    </div>
                </div>
            </div>
            <div className="hidden md:flex ml-2">
                {isOpen ? (
                    <Image
                        src={images.cross}
                        alt="close logo"
                        objectFit="contain"
                        width={20}
                        height={20}
                        onClick={() => setisOpen(false)}
                        className={`object-contain cursor-pointer ${
                            theme === "light" ? "filter invert" : ""
                        }`}
                    />
                ) : (
                    <Image
                        src={images.menu}
                        alt="Menu"
                        width={25}
                        height={25}
                        onClick={() => setisOpen(true)}
                        className={`object-contain cursor-pointer ${
                            theme === "light" ? "invert" : ""
                        }`}
                    />
                )}
                {isOpen && (
                    <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-50 nav-height flex justify-between flex-col">
                        <div className="flex-1 p-4">
                            <MenuItems
                                active={active}
                                setActive={setactive}
                                closeNav={() => {
                                    setisOpen(false);
                                }}
                                isMobile
                            />
                        </div>
                        <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1 flex justify-center">
                            <NavbarButtonGroup
                                setActive={setactive}
                                router={router}
                                setIsOpen={setisOpen}
                            />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
