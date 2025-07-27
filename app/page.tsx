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

  return (
    <div className="home">
      <Slider data={data} />
      {/* <Favorite /> */}
    </div>
  );
}
