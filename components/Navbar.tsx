"use client";

import Link from "next/dist/client/link";
import "../styles/navbar.css";
import { CgSearch } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>CineVerse</span>
      </div>
      <div className="search">
        <Link className="search-inside" href="/Search">
          <CgSearch className="icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
