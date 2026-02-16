import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import platypusLogo from '../../assets/platypus.png';

export interface NavbarProps {
  content: Array<{
    label: string;
    href: string;
  }>;
}

/** Primary UI component for user interaction */
export const Navbar = ({
  content,
  ...props
}: NavbarProps) => {
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
            <Link href="/login" className="bg-[#284ead] px-5 py-1 rounded-lg cursor-pointer text-xl text-white text-center font-[family-name:var(--font-header)] font-bold hover:bg-blue-700">
                Login
            </Link>
        </div>
    </nav>
  );
};
