"use client";
import React, { useState } from "react";
import Image from "next/image";

export type ProductProps = {
  name: string;
  price: number;
  description: string;
  image: string;
  addFunction: () => void;
};

export default function Product(props: ProductProps) {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.price}</p>
      <Image
        src={`/images/${props.image}`}
        alt={props.name}
        width={500}
        height={500}
      />
      {showDescription ? <p>{props.description}</p> : <></>}
      <button
        onClick={() => {
          setShowDescription(!showDescription);
        }}
      >
        Toggle Description
      </button>
      <button onClick={props.addFunction}>Add Product</button>
    </div>
  );
}
