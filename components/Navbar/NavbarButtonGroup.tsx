import React, { useContext } from "react";
import { Button } from "../Button";
import { useRouter } from "next/navigation";
import { NFTContext } from "@/context/NFTContext";
interface NavbarButtonGroupProps {
    setActive?: React.Dispatch<React.SetStateAction<string>>;
    router?: ReturnType<typeof useRouter>;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarButtonGroup = ({
    setActive,
    router,
    setIsOpen,
}: NavbarButtonGroupProps) => {
    const { connectWallet, currentAccount } = useContext(NFTContext);
    const hasConnected = true;

    return currentAccount ? (
        <Button
            btnName="Create"
            classStyles={`mx-2 rounded-xl`}
            handleClick={() => {
                if (setActive) {
                    setActive("");
                    if (setIsOpen) {
                        setIsOpen(false);
                        if (router) {
                            router.push("/create-nft");
                        }
                    }
                }
            }}
        />
    ) : (
        <Button
            btnName="Connect"
            classStyles={"mx-2 rounded-xl"}
            handleClick={connectWallet}
        />
    );
};

export default NavbarButtonGroup;
