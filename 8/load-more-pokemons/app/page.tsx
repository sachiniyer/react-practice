"use client";

import React, { useState, useEffect } from "react";

type Pokemon = {
  name: string;
  index: number;
  image: string;
};

type PokemonRaw = {
  name: string;
  url: string;
};

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [queryUrl, setQueryUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",
  );
  const [count, setCount] = useState(1302);

  const parsePokemons = async (pokemons: PokemonRaw[]): Promise<Pokemon[]> => {
    const parsedPokemons = await Promise.all(
      pokemons.map(async (pokemon) => {
        try {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return {
            name: data.name,
            index: data.id,
            image: data.sprites.front_default,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      }),
    );
    return parsedPokemons.filter(
      (pokemon): pokemon is Pokemon => pokemon !== null,
    );
  };

  const loadMore = async () => {
    try {
      const response = await fetch(queryUrl);
      const data = await response.json();
      setCount(data.count);
      setQueryUrl(data.next);

      const newPokemons = await parsePokemons(data.results);
      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        {pokemons.map((pokemon) => (
          <div key={pokemon.index}>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
            <p>{pokemon.index}</p>
          </div>
        ))}
      </div>
      <button onClick={loadMore}>
        Load more pokemons, showing {pokemons.length} of {count}
      </button>
    </div>
  );
}
