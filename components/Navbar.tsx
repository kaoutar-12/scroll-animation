"use client";

import "../styles/navbar.css";
import { CgSearch } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>CineVerse</span>
      </div>
      <div className="search">
        <div className="search-inside">
          <CgSearch className="icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
