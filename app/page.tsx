import Image from "next/image";
import styles from "./page.module.css";
import Slider from "../components/Slider";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Slider />
    </div>
  );
}
