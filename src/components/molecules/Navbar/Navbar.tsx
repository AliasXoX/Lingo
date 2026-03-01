'use client';

import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import platypusLogo from '../../assets/platypus.png';
import { Icon } from '../../atoms/Icon/Icon';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';

export interface NavbarProps {
  content: Array<{
    label: string;
    href: string;
  }>;
  username?: string;
  onLogout?: () => void;
}

const PhoneNavbar = ({
  content,
  username,
  onLogout,
  ...props
}: NavbarProps) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="w-full flex justify-between bg-[var(--color-neutral-lightest)] shadow rounded-full py-1 overflow-clip text-gray-800">
            <div className="flex items-center ml-5">
                <span onClick={() => setIsMenuOpen(true)}>
                    <Icon name="menu" className="w-6" />
                </span>
                <span className="flex items-center text-2xl text-center font-bold">
                    <Image
                        src={platypusLogo}
                        alt="Lingo Logo"
                        className="w-16"
                    />
                    <span className="text-sm font-[family-name:var(--font-logo)]">Lingo</span>
                </span>
            </div>
            
            <div className="flex items-center mr-5">
                {username ? (
                    <div className="flex items-center gap-2">
                        <span className="text-md font-[family-name:var(--font-header)] font-bold">
                            {username}
                        </span>
                        <button
                            onClick={onLogout}
                            className="bg-[var(--color-neutral-light)] p-1 rounded-lg cursor-pointer text-sm text-white text-center font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)]"
                        >
                            <Icon name="logout" className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <Link href="/login" className="bg-[var(--color-action-dark)] p-1 rounded-lg cursor-pointer text-md text-white text-center font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)]">
                        Login
                    </Link>
                )}
            </div>

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: isMenuOpen ? 'auto' : 0 }}
                className="fixed flex top-0 left-0 h-full overflow-hidden z-10"
            >
                <div className="flex flex-col min-w-60 p-5 gap-5 bg-[var(--color-neutral-lightest)] shadow-md border-r border-gray-300">
                    {content.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex w-full py-3 text-2xl text-center font-[family-name:var(--font-header)] font-bold hover:bg-gray-200 border-b border-gray-300"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
                <button className="flex items-center justify-center h-16 p-5 bg-[var(--color-neutral-light)] shadow-md" onClick={() => setIsMenuOpen(false)}>
                    <Icon name="cross" className="w-6"/>
                </button>
            </motion.div>
        </nav>
    );
};

/** Primary UI component for user interaction */
export const Navbar = ({
  content,
  username,
  onLogout,
  ...props
}: NavbarProps) => {

    const isPhone = useMediaQuery({ query: "(max-width: 700px)" });

    if (isPhone) {
        return <PhoneNavbar content={content} username={username} onLogout={onLogout} />;
    }
    return (
        <nav className="relative w-full flex justify-between bg-[var(--color-neutral-lightest)] shadow rounded-full overflow-clip text-gray-800">
            <div className="flex items-center">
                <span className="text-2xl text-center font-bold px-1">
                    <Image
                        src={platypusLogo}
                        alt="Lingo Logo"
                        className="absolute top-1/2 left-1 transform -translate-y-1/2 w-25"
                    />
                    <span className="pl-22 text-2xl font-[family-name:var(--font-logo)]">Lingo</span>
                </span>
                <div className="flex items-center">
                    {content.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="px-5 py-3 text-2xl text-center font-[family-name:var(--font-header)] font-bold hover:bg-gray-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="flex items-center mr-5">
                {username ? (
                    <div>
                        <span className="text-xl font-[family-name:var(--font-header)] font-bold mr-5">
                            {username}
                        </span>
                        <button
                            onClick={onLogout}
                            className="bg-[var(--color-action-dark)] px-5 py-1 rounded-lg cursor-pointer text-xl text-white text-center font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)]"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link href="/login" className="bg-[var(--color-action-dark)] px-5 py-1 rounded-lg cursor-pointer text-xl text-white text-center font-[family-name:var(--font-header)] font-bold hover:bg-[var(--color-action-darker)]">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};
