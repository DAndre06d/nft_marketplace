import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fuchsia-cheerful-leech-585.mypinata.cloud",
            },
        ],
    },
};

export default nextConfig;
