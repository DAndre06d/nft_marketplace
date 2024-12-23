import React, { useContext } from "react";
import { NFTContext } from "@/context/NFTContext";
interface InputProps {
    inputType: string;
    title?: string;
    placeholder: string;
    handleClick?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}
const Input = ({ inputType, title, placeholder, handleClick }: InputProps) => {
    const { nftCurrency } = useContext(NFTContext);
    return (
        <div className="mt-10 w-full">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                {title}
            </p>
            {inputType === "number" ? (
                <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
                    <input
                        type="number"
                        className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
                        placeholder={placeholder}
                        onChange={handleClick}
                    />
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                        {nftCurrency}
                    </p>
                </div>
            ) : inputType === "textarea" ? (
                <textarea
                    placeholder={placeholder}
                    onChange={handleClick}
                    rows={10}
                    className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
                />
            ) : (
                <input
                    placeholder={placeholder}
                    className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
                    onChange={handleClick}
                />
            )}
        </div>
    );
};

export default Input;
