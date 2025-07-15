"use client";
import Slider from "../components/Slider";
import Navbar from "@/components/Navbar";
import Favorite from "@/components/Favorite";
import { useState } from "react";

export default function Home() {
 
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      <Navbar setClicked={setClicked}/>
      <Slider clicked={clicked}/>
      <Favorite/>
    </div>
  );
}
