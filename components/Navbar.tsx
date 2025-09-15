"use client";

import Link from "next/link";
import "../styles/navbar.css";
import { CgSearch } from "react-icons/cg";
import { MdOutlineRefresh } from "react-icons/md";
import { useMovieContext } from "@/context/MovieContext";

interface NavbarProps {
  onRefresh?: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ onRefresh }) => {
  const { loadMovies } = useMovieContext();

  return (
    <nav className="navbar">
      <div className="logo">
        <span>CineVerse</span>
      </div>
      <div className="nav-links">
        <div className="search">
          <Link className="search-inside" href="/Search">
            <CgSearch className="icon" />
          </Link>
        </div>
        <div className="refresh" onClick={loadMovies}>
          <MdOutlineRefresh className="refresh-icon" />
          <span className="refresh-label">Refresh for more movies</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
