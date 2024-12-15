interface FooterLinksProps {
    heading: string;
    items: string[];
}

import React from "react";

const FooterLinks = ({ heading, items }: FooterLinksProps) => {
    return (
        <div className="flex-1 justify-start items-start">
            <h3 className="font-popping dark:text-white text-nft-black-1 font-semibold text-xl mb-10">
                {heading}
            </h3>
            {items.map((item, i) => (
                <p
                    key={i}
                    className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3"
                >
                    {item}
                </p>
            ))}
        </div>
    );
};

export default FooterLinks;
