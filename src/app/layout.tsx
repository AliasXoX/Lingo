import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../components/style/globals.css";
import { Navbar } from "../components/molecules/Navbar/Navbar";
import { getUser } from "../lib/dal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lingo",
  description: "Language learning app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-[var(--color-neutral-lighter)]`}
      >
        <div className="w-full px-3 py-4">
          <Navbar 
          content={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ]}
          username={user?.username ?? undefined} />
        </div>
        {children}
      </body>
    </html>
  );
}
