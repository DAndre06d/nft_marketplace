import React from "react";
import Image from "next/image";
import images from "@/assets/assets";

const Loader = () => {
    return (
        <div className="flexCenter w-full my-4">
            <Image
                src={images.loader}
                alt="Loader"
                width={100}
                className="object-contain"
            />
        </div>
    );
};

export default Loader;
