import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface DropdownWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    /** What background color to use */
    header: string;
    children: React.ReactNode;
}

export const DropdownWrapper = ({
    header,
    children,
    className = '',
    ...props
}: DropdownWrapperProps) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={"flex flex-col " + className} {...props}>
            <div className="flex w-full p-1 border-2 border-gray-300 rounded-lg items-center justify-between bg-[var(--color-neutral-light)]">
                <div className="flex w-full items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <span className="capitalize text-2xl">{header}</span>
                    <Icon name="dropdown" className={`transition-transform ${isOpen ? 'rotate-180' : ''} w-5`} />
                </div>
            </div>
            <motion.div 
                initial={false}
                animate={{ 
                    opacity: isOpen ? 1 : 0,
                    scaleY: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex flex-col mt-2 border-l-2 border-gray-300 gap-5 ml-5 px-2 origin-top"
                style={{ display: isOpen ? 'flex' : 'none' }}
            >
                {children}
            </motion.div>
        </div>
    );
}