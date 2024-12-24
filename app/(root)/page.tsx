"use client";
import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { Banner } from "@/components/Banner";
import { CreatorCard, NftCard } from "@/components/Cards";
import images from "@/assets/assets";
import { useTheme } from "next-themes";
import { NFTContext } from "@/context/NFTContext";
import { NFTItem } from "@/context/NFTContext";
import { getCreators } from "@/utils/getTopCreators";
import { shortenAddress } from "@/utils/string";
import SearchBar from "@/components/Search/SearchBar";
import { Loader } from "@/components/Loader";

export default function Home() {
    const [hideButtons, sethideButtons] = useState(false);
    const [nfts, setnfts] = useState<NFTItem[]>([]);
    const [nftsCopy, setNftsCopy] = useState<NFTItem[]>([]);
    const [activeSelect, setActiveSelect] = useState("Recently Added");
    const [isLoading, setIsLoading] = useState(true);
    const { fetchNFTs } = useContext(NFTContext);
    const parentRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const handleScroll = (direction: string) => {
        const { current } = scrollRef;
        if (!current) return;
        const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
        if (direction === "left") {
            current.scrollLeft -= scrollAmount;
        } else {
            current.scrollLeft += scrollAmount;
        }
    };
    const isScrollable = () => {
        const { current } = scrollRef;
        const { current: parent } = parentRef;
        if (!current || !parent) return;
        if (current.scrollWidth >= parent.offsetWidth) {
            sethideButtons(false);
        } else {
            sethideButtons(true);
        }
    };
    const onHandleSearch = (value: string) => {
        const filteredNfts = nfts.filter(({ name }) =>
            name.toLowerCase().includes(value.toLowerCase())
        );
        if (filteredNfts.length) {
            setnfts(filteredNfts);
        } else {
            setnfts(nftsCopy);
        }
    };
    const onClearSearch = () => {
        if (nfts.length && nftsCopy.length) {
            setnfts(nftsCopy);
        }
    };
    useEffect(() => {
        // Delay calling isScrollable until refs are set
        const handleResize = () => {
            isScrollable();
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        const sortedNFTs = [...nfts];
        switch (activeSelect) {
            case "Price (Low to High)":
                setnfts(
                    sortedNFTs.sort(
                        (a, b) => parseInt(a.price) - parseInt(b.price)
                    )
                );
                break;
            case "Price (High to Low)":
                setnfts(
                    sortedNFTs.sort(
                        (a, b) => parseInt(b.price) - parseInt(a.price)
                    )
                );
                break;
            case "Recently Added":
                setnfts(
                    sortedNFTs.sort((a, b) => {
                        return (
                            parseInt(b.tokenId, 10) - parseInt(a.tokenId, 10)
                        );
                    })
                );
                break;

            default:
                setnfts(nfts);
                break;
        }
    }, [activeSelect]);

    useEffect(() => {
        const fetchData = async () => {
            const items = await fetchNFTs();
            setnfts(items);
            setNftsCopy(items);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    const topCreators = getCreators(nftsCopy);
    return (
        <div className="flex justify-center sm:px-4 p-12">
            <div className="w-full minmd:w-4/5">
                <Banner
                    text={
                        <>
                            Discover, collect and sell <br /> extraordinary NFTs
                        </>
                    }
                    childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
                    parentStyles="justify-start mb-7 h-72 sm:h-60 p-12 sm:p-4 xs:h-44 rounded-3xl"
                />
                {!isLoading && !nfts.length ? (
                    <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                        That's weird.... No NFTs for sale!
                    </h1>
                ) : isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div>
                            <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl text-semibold ml-4 xs:ml-0 ">
                                Top Sellers
                            </h1>
                            <div
                                className="relative flex-1 max-w-full flex mt-3"
                                ref={parentRef}
                            >
                                <div
                                    className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                                    ref={scrollRef}
                                >
                                    {topCreators.map((creator, i) => (
                                        <CreatorCard
                                            key={creator.seller}
                                            rank={i + 1}
                                            creatorImg={
                                                images[
                                                    `creator${
                                                        i + 1
                                                    }` as keyof typeof images
                                                ] || ""
                                            }
                                            creatorName={shortenAddress(
                                                creator.seller
                                            )}
                                            creatorEths={creator.sum}
                                        />
                                    ))}
                                    {!hideButtons && (
                                        <>
                                            <div
                                                onClick={() =>
                                                    handleScroll("left")
                                                }
                                                className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                                            >
                                                <Image
                                                    src={images.left}
                                                    fill
                                                    alt="left_arrow"
                                                    className={
                                                        theme === "light"
                                                            ? `filter invert`
                                                            : ""
                                                    }
                                                />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleScroll("right")
                                                }
                                                className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                                            >
                                                <Image
                                                    src={images.right}
                                                    alt="left_arrow"
                                                    fill // Replaces `layout="fill"`
                                                    className={`object-contain ${
                                                        theme === "light"
                                                            ? "invert"
                                                            : ""
                                                    }`}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 ">
                            <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                                <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl text-semibold sm:mb-4 flex-1">
                                    Hot NFTs
                                </h1>
                                <div className="flex-1 sm:w-full flex flex-row sm:flex-col">
                                    <SearchBar
                                        activeSelect={activeSelect}
                                        setActiveSelect={setActiveSelect}
                                        handleSearch={onHandleSearch}
                                        clearSearch={onClearSearch}
                                    />
                                </div>
                            </div>
                            <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                                {nfts.map((nft) => (
                                    <NftCard key={nft.tokenId} nft={nft} />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
