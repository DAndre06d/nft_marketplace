"use client";
import React, { useState, useMemo, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/Button";
import images from "@/assets/assets";
import { Input } from "@/components/Inputs";
import { NFTContext } from "@/context/NFTContext";

const CreateNfts = () => {
    const [fileUrl, setfileUrl] = useState<string>("");
    const router = useRouter();
    const [formInputs, setformInputs] = useState({
        price: "",
        name: "",
        description: "",
    });
    const { theme } = useTheme();
    const { uploadToIPFS, createNFT } = useContext(NFTContext);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            try {
                const url = await uploadToIPFS(file);
                if (url) {
                    console.log("File uploaded successfully:", url);
                    setfileUrl(url);
                }
            } catch (error) {
                console.error("Error uploading file to IPFS:", error);
            }
        }
    }, []);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: "image/*",
        maxFiles: 5000000,
    });
    const fileStyle = useMemo(
        () =>
            `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed ${
                isDragActive && "border-file-active"
            } ${isDragAccept && "border-file-accept"} ${
                isDragReject && "border-file-reject"
            }`,
        [isDragActive, isDragAccept, isDragReject]
    );
    return (
        <div className="flex justify-center sm:px-4 p-12 ">
            <div className="w-3/5 md:w-full ">
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl text-semibold sm:mb-4 flex-1">
                    Create new NFT
                </h1>
                <div className="mt-16 ">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                        Upload file
                    </p>
                    <div className="mt-4">
                        <div {...getRootProps()} className={fileStyle}>
                            <input {...getInputProps()} />
                            <div className="flexCenter flex-col text-center">
                                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                                    JPG, PNG , GIF, SVG, WEBM. MAX 100mb
                                </p>
                                <div className="my-12 w-full flex justify-center">
                                    <Image
                                        src={images.upload}
                                        alt="file upload image"
                                        width={100}
                                        height={100}
                                        className={`object-contain ${
                                            theme === "light" ? "invert" : ""
                                        }`}
                                    />
                                </div>
                                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                                    Drag and drop file
                                </p>
                                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                                    or browse media on your device
                                </p>
                            </div>
                        </div>
                        {fileUrl && (
                            <aside>
                                <div>
                                    <img src={fileUrl} alt="asset/file" />
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
                <Input
                    inputType="input"
                    title="Name"
                    placeholder="NFT Name"
                    handleClick={(
                        e: React.ChangeEvent<
                            HTMLInputElement | HTMLTextAreaElement
                        >
                    ) =>
                        setformInputs((prevVals) => ({
                            ...prevVals,
                            name: e.target.value,
                        }))
                    }
                />
                <Input
                    inputType="textarea"
                    title="Description"
                    placeholder="NFT Description"
                    handleClick={(e) =>
                        setformInputs((prevVal) => ({
                            ...prevVal,
                            description: e.target.value,
                        }))
                    }
                />
                <Input
                    inputType="number"
                    title="Price"
                    placeholder="NFT Price"
                    handleClick={(e) =>
                        setformInputs((prevVal) => ({
                            ...prevVal,
                            price: e.target.value,
                        }))
                    }
                />
                <div className="mt-7 w-full flex justify-end">
                    <Button
                        btnName="Create NFT"
                        classStyles="rounded-xl"
                        handleClick={() =>
                            createNFT(formInputs, fileUrl, router)
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateNfts;
