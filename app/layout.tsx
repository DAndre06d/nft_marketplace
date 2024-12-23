import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { NFTProvider } from "@/context/NFTContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NFTProvider>
                    <ThemeProvider attribute="class">
                        {children}
                        <Script
                            src="https://kit.fontawesome.com/640e730a61.js"
                            crossOrigin="anonymous"
                        ></Script>
                    </ThemeProvider>
                </NFTProvider>
            </body>
        </html>
    );
}
