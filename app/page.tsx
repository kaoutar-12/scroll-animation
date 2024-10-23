import Image from "next/image";
import styles from "./page.module.css";
import Slider from "../components/Slider";
import Navbar from "@/components/Navbar";
import Favorite from "@/components/Favorite";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Slider />
      <Favorite/>
    </div>
  );
}
