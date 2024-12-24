import React from "react";
import { Button } from "../Button";
interface CustomFooterProps {
    handleClose: () => void;
    handleClick: () => void;
}

const CustomFooter = ({ handleClose, handleClick }: CustomFooterProps) => {
    return (
        <div className="flex flex-row sm:flex-col">
            <Button
                btnName="Check out"
                classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={handleClick}
            />
            <Button
                btnName="Cancel"
                classStyles="rounded-xl"
                handleClick={handleClose}
            />
        </div>
    );
};

export default CustomFooter;
