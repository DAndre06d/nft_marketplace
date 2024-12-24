import { NFTItem } from "@/context/NFTContext";

export const getCreators = (nfts: NFTItem[]) => {
    const creatorMap = new Map<string, number>();

    nfts.forEach((nft: NFTItem) => {
        const { seller, price } = nft;
        const numericPrice = parseInt(price, 10) || 0;
        const currentTotal = creatorMap.get(seller) || 0;
        creatorMap.set(seller, currentTotal + numericPrice);
    });
    const sortedCreators = Array.from(creatorMap, ([seller, sum]) => ({
        seller,
        sum,
    })).sort((a, b) => b.sum - a.sum);

    return sortedCreators.slice(0, 10);
};
