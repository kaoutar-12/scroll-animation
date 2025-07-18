"use client";
import Slider, {
  columns,
  MovieApiResponse,
  MovieResult,
  moviesPerColumn,
  totalMovies,
} from "../components/Slider";
import Navbar from "@/components/Navbar";
import Favorite from "@/components/Favorite";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState<MovieResult[][]>([]);
  const [searchData, setSearchData] = useState<MovieResult[][]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const getData = async () => {
    try {
      const totalPagesToFetch = Math.ceil(totalMovies / 20);
      const requests = Array.from({ length: totalPagesToFetch }, (_, i) =>
        axios.get<MovieApiResponse>(
          `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${
            i + 1
          }`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            },
          }
        )
      );

      const responses = await Promise.all(requests);
      const allMovies = responses.flatMap((res) => res.data.results);

      const columnsData = Array.from({ length: columns }, (_, i) =>
        allMovies.slice(i * moviesPerColumn, (i + 1) * moviesPerColumn)
      );

      setData(columnsData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [clicked, setClicked] = useState(false);
  return (
    <div className="home">
      <Navbar
        setClicked={setClicked}
        setSearchData={setSearchData}
        data={data}
        setIsTyping={setIsTyping}
      />
      <Slider clicked={clicked} data={searchData} isTyping={isTyping} />
      <Favorite />
    </div>
  );
}
