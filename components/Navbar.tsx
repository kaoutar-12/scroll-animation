"use client";

import "../styles/navbar.css";
import { CgSearch } from "react-icons/cg";
import { MdOutlineRefresh } from "react-icons/md";
import { useMovieContext } from "@/context/MovieContext";

interface NavbarProps {
  onRefresh?: () => void;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Navbar: React.FC<NavbarProps> = ({ setIsSearchOpen }) => {
  const { loadMovies } = useMovieContext();

  return (
    <nav className="navbar">
      <div className="logo">
        <span>CineVerse</span>
      </div>
      <div className="nav-links">
        <div className="search">
          <div className="search-inside" onClick={() => setIsSearchOpen(true)}>
            <CgSearch className="icon" />
          </div>
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
