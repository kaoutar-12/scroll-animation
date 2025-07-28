"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {isHomePage && <Navbar />}

        <div className="layout-wrapper">
          {/* Blurred Edges */}
          <div className="edge-blur left" />
          <div className="edge-blur right" />
          {/* <div className="edge-blur top" /> */}
          <div className="edge-blur bottom" />
          <div className="layout-content">{children}</div>
        </div>
      </body>
    </html>
  );
}
