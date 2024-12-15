"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Banner } from "@/components/Banner";
import { CreatorCard } from "@/components/Cards";
import images from "@/assets/assets";
import { makeId } from "@/utils/makeId";
import { useTheme } from "next-themes";

export default function Home() {
    const [hideButtons, sethideButtons] = useState(false);
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
                            {[6, 7, 8, 9, 10].map((i) => (
                                <CreatorCard
                                    key={`creator-${i}`}
                                    rank={i}
                                    creatorImg={
                                        images[
                                            `creator${i}` as keyof typeof images
                                        ] || ""
                                    }
                                    creatorName={`0x${112312}...${123123}`}
                                    creatorEths={10 - i * 0.5}
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
                                            layout="fill"
                                            objectFit="contain"
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
                                            layout="fill"
                                            objectFit="contain"
                                            alt="left_arrow"
                                            className={
                                                theme === "light"
                                                    ? `filter invert`
                                                    : ""
                                            }
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
