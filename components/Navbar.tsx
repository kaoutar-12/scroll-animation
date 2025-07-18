"use client";
import React, { useEffect } from "react";
import "../styles/navbar.css";
import { CgSearch } from "react-icons/cg";
import { MovieResult } from "./Slider";

const Navbar = ({
  setClicked,
  setSearchData,
  data,
}: {
  setClicked: (val: boolean) => void;
  setSearchData: (data: MovieResult[][]) => void;
  data: MovieResult[][];
}) => {
  const handleClick = () => setClicked(true);
  const [searchQuery, setSearchQuery] = React.useState("");

 

  useEffect(() => {
    if (searchQuery === "") {
      setSearchData(data);
      return;
    }
    const filteredData = data.map((column) =>
      column.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    console.log("Filtered Data:", filteredData);
    setSearchData(filteredData);
    // const filteredData = data.map((column) => {
    //   column.map((item) => {
    //    console.log("Item:", item.name || item.title);
    //   })
    //   console.log("Filtered Column:", column);
    // });

    // console.log("Filtered Data:", filteredData);
  }, [searchQuery, data, setSearchData]);

  return (
    <nav className="navbar">
      <div className="logo">
        <span>CineVerse</span>
      </div>
      <div className="search">
        <div className="search-inside">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onClick={handleClick}
          />
          <CgSearch className="icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
