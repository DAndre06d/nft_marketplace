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

export default function Home() {
    const [hideButtons, sethideButtons] = useState(false);
    const [nfts, setnfts] = useState<NFTItem[]>([]);
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
        const fetchData = async () => {
            const items = await fetchNFTs();
            // console.log(items);
            setnfts(items);
        };
        fetchData();
    }, []);
    const topCreators = getCreators(nfts);
    return (
        <div className="flex justify-center sm:px-4 p-12">
            <div className="w-full minmd:w-4/5">
                <Banner
                    text="Discover, collect and sell extraordinary NFTs"
                    childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
                    parentStyles="justify-start mb-7 h-72 sm:h-60 p-12 sm:p-4 xs:h-44 rounded-3xl"
                />
                <div>
                    <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl text-semibold ml-4 xs:ml-0 ">
                        Best Creators
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
                                    creatorName={shortenAddress(creator.seller)}
                                    creatorEths={creator.sum}
                                />
                            ))}
                            {!hideButtons && (
                                <>
                                    <div
                                        onClick={() => handleScroll("left")}
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
                                        onClick={() => handleScroll("right")}
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
                            Hot Bids
                        </h1>
                        <div>Searchbar</div>
                    </div>
                    <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                        {nfts.map((nft) => (
                            <NftCard key={nft.tokenId} nft={nft} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
