import React from "react";
import { Navbar, Footer } from "@/components";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <div className="dark:bg-nft-dark bg-white min-h-screen">
                <Navbar />
                <div className="pt-65">{children}</div>
                <Footer />
            </div>
        </main>
    );
};

export default RootLayout;
