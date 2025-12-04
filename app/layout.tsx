"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import Favorite from "@/components/Favorite";
import { FavoritesProvider, useFavorites } from "@/context/FavoriteContext";
import { MovieProvider } from "@/context/MovieContext";

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
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <FavoritesProvider>
          <MovieProvider>
            <div className="layout-wrapper">
             
              <div className="layout-content">{children}</div>
            </div>
          </MovieProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
