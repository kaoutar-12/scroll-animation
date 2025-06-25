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
