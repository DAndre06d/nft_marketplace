import React from "react";
import { Button } from "../Button";
import { useRouter } from "next/navigation";
interface NavbarButtonGroupProps {
    setActive?: React.Dispatch<React.SetStateAction<string>>;
    router?: ReturnType<typeof useRouter>;
}

const NavbarButtonGroup = ({ setActive, router }: NavbarButtonGroupProps) => {
    const hasConnected = true;

    return hasConnected ? (
        <Button
            btnName="Create"
            classStyles={`mx-2 rounded-xl`}
            handleClick={() => {
                if (setActive) {
                    setActive("");
                    if (router) {
                        router.push("/create-nft");
                    }
                }
            }}
        />
    ) : (
        <Button
            btnName="Connect"
            classStyles={"mx-2 rounded-xl"}
            handleClick={() => {}}
        />
    );
};

export default NavbarButtonGroup;
