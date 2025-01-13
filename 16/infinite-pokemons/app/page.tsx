"use client";

import React, { useState, useEffect, useRef } from "react";

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
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

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
    if (loading) return; // Prevent multiple simultaneous loads

    try {
      setLoading(true);
      const response = await fetch(queryUrl);
      const data = await response.json();
      console.log(data.next);
      setQueryUrl(data.next);

      const newPokemons = await parsePokemons(data.results);
      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load when component mounts
    loadMore();
  }, [loadMore]); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && queryUrl) {
          loadMore();
        }
      },
      {
        rootMargin: "100px", // Start loading before reaching the end
        threshold: 0.1, // Trigger when even a small part is visible
      },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [queryUrl, loading, loadMore]); // Add loading to dependencies

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemons.map((pokemon: Pokemon, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-24 h-24 object-contain"
            />
            <p className="text-lg font-semibold capitalize">{pokemon.name}</p>
            <p className="text-gray-600">#{pokemon.index}</p>
          </div>
        ))}
      </div>
      <div ref={observerTarget} className="h-20 mt-4">
        {loading && (
          <p className="text-center text-gray-600">Loading more Pokémon...</p>
        )}
      </div>
    </main>
  );
}
