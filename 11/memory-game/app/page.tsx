"use client";

import React, { useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
  "https://images.unsplash.com/photo-1546842931-886c185b4c8c",
  "https://images.unsplash.com/photo-1520763185298-1b434c919102",
  "https://images.unsplash.com/photo-1442458017215-285b83f65851",
  "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
  "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
];

const GRAY = "https://wallpapercave.com/wp/wp3429906.png";

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export default function Home() {
  const [clicked, setClicked] = useState<number | null>(null);
  const [showImages, setShowImages] = useState<number[]>([]);
  const images = shuffleArray(IMAGES.flatMap((i) => [i, i]));

  const clickImage = (index: number) => {
    console.log("click", index);
    if (clicked === index) return;
    if (clicked === null) {
      setClicked(index);
    } else {
      setClicked(index);
      if (images[clicked] === images[index]) {
        setShowImages([...showImages, clicked, index]);
        setClicked(null);
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image: string, index: number) => {
          const isClicked = clicked === index;
          const isGray = !(showImages.includes(index) || isClicked);
          return (
            <div
              key={index}
              className="relative"
              onClick={() => {
                clickImage(index);
              }}
            >
              <img
                src={isGray ? GRAY : image}
                className="w-full h-40 object-cover"
                alt=""
                width={300}
                height={200}
              />
              {isGray && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-2xl font-bold">?</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
