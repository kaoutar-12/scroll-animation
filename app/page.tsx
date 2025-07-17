"use client";
import Slider from "../components/Slider";
import Navbar from "@/components/Navbar";
import Favorite from "@/components/Favorite";
import { useState } from "react";

export default function Home() {
 
  const [clicked, setClicked] = useState(false);
  return (
    <div className="home">
      <Navbar setClicked={setClicked}/>
      <Slider clicked={clicked}/>
      <Favorite/>
    </div>
  );
}
