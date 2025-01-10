"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

const API_KEY = process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN;

type MOVIE_TYPE = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

export default function Home() {
  const [movies, setMovies] = useState({ results: [] });
  const [searchText, setSearchText] = useState("");

  const searchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const submitSearchText = () => {
    axios
      .get(`https://api.themoviedb.org/3/search/movie?query=${searchText}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
      });
  };

  return (
    <div>
      <form id="form">
        <input
          type="search"
          id="query"
          name="q"
          placeholder="Search..."
          onChange={searchTextChange}
        />
        <button type="button" onClick={submitSearchText}>
          Search
        </button>
      </form>
      <div className="grid grid-cols-8 gap-4">
        {movies.results?.map((movie: MOVIE_TYPE) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
            />
            <h2>{movie.title}</h2>
            {/* <p>{movie.overview}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
