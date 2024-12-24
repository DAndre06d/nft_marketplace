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
import { useSearchParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import PaymentBodyCmp from "@/components/PaymentBodyComponent/PaymentBodyCmp";
import CustomFooter from "@/components/Footer/CustomFooter";

const NFTDetails = ({}) => {
    const router = useRouter();
    const { currentAccount, nftCurrency, buyNFT } = useContext(NFTContext);
    const [isLoading, setIsLoading] = useState(true);
    const [nft, setNft] = useState<NFTItem>({} as NFTItem);
    const searchParams = useSearchParams();
    const [paymentModal, setPaymentModal] = useState(false);
    const [successMOdal, setSuccessMOdal] = useState(false);
    const checkout = async () => {
        await buyNFT(nft);
        setPaymentModal(false);
        setSuccessMOdal(true);
    };

    useEffect(() => {
        const fetchDataFromURL = () => {
            const nftData: NFTItem = {
                name: searchParams.get("name") || "",
                image: searchParams.get("image") || "",
                description: searchParams.get("description") || "",
                price: searchParams.get("price") || "",
                tokenId: searchParams.get("tokenId") || "",
                seller: searchParams.get("seller") || "",
                owner: searchParams.get("owner") || "",
                tokenURI: searchParams.get("tokenURI") || "",
            };

            setNft(nftData);
            setIsLoading(false);
        };
        fetchDataFromURL();
    }, [searchParams]);
    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="relative flex justify-center md:flex-col min-h-screen">
            <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r  md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
                <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
                    <Image
                        src={nft.image}
                        alt={""}
                        className="object-cover rounded-xl shadow-lg"
                        fill
                    />
                </div>
            </div>
            <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
                <div className="flex flex-row sm:flex-col">
                    <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:3xl">
                        {nft.name}
                    </h2>
                </div>
                <div className="mt-10 ">
                    <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
                        Creator
                    </p>
                    <div className="flex flex-row items-center mt-3">
                        <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
                            <Image
                                src={images.creator1}
                                className="object-cover rounded-full"
                                alt="creator image"
                            />
                        </div>
                        <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">
                            {shortenAddress(nft.seller)}
                        </p>
                    </div>
                </div>
                <div className="mt-10 flex flex-col">
                    <div className="w-full border-b dark:border-nft-gray-1 border-nft-black-1  flex flex-row">
                        <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-base font-medium mb-2">
                            Details
                        </p>
                    </div>
                    <div className="mt-3">
                        <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal">
                            {nft.description}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col mt-10">
                    {currentAccount === nft.seller.toLocaleLowerCase() ? (
                        <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border border-gray p-2">
                            You cannot buy your ownt nft
                        </p>
                    ) : (
                        <Button
                            btnName={`Buy for ${nft.price} ${nftCurrency}`}
                            classStyles="mr-5 sm:mr-0 rounded-xl"
                            handleClick={() => setPaymentModal(true)}
                        />
                    )}
                </div>
            </div>
            {paymentModal && (
                <Modal
                    header="Check Out"
                    body={
                        <PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />
                    }
                    footer={
                        <CustomFooter
                            handleClick={() => checkout()}
                            handleClose={() => setPaymentModal(false)}
                        />
                    }
                    handleClick={() => {}}
                    handleClose={() => setPaymentModal(false)}
                />
            )}
            {successMOdal && (
                <Modal
                    header="Payment Successful"
                    body={
                        <div
                            className="flexCenter flex-col text-center"
                            onClick={() => setSuccessMOdal(false)}
                        >
                            <div className="relative w-52 h-52">
                                <Image
                                    src={nft.image}
                                    alt=""
                                    className="object-cover"
                                    fill
                                />
                            </div>
                            <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl mt-10">
                                You successfully purchased
                                <span className="font-semibold ml-1">
                                    {nft.name} From{" "}
                                    <span className="font-semibold">
                                        {shortenAddress(nft.seller)}
                                    </span>
                                </span>
                            </p>
                        </div>
                    }
                    footer={
                        <div className="flexCenter flex-col">
                            <Button
                                btnName="Check it out"
                                classStyles="sm:mb-5 sm:mr-0 rounded-xl"
                                handleClick={() => router.push("/my-nfts")}
                            />
                        </div>
                    }
                    handleClick={() => {}}
                    handleClose={() => setPaymentModal(false)}
                />
            )}
        </div>
    );
};

export default NFTDetails;
