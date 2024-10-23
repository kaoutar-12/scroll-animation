import React from "react";
import "../styles/navbar.css";
import { CgSearch } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>CineVerse</span>
      </div>
      <div className="search">
        <div className="search-inside">
          <input type="text" placeholder="Search" />
          <CgSearch className="icon" />
        </div>
      </div>
 
    </nav>
  );
};

export default Navbar;
