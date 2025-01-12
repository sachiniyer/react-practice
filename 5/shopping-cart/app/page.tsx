"use client";

import React, { useState, useEffect } from "react";
import { fetchProducts } from "./products-api";
import Product from "./components/Product";

type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<ProductType[]>([]);

  useEffect(() => {
    fetchProducts().then((products) => {
      console.log("Fetched the products", products);
      setProducts(products as ProductType[]);
    });
  });

  const addProduct = (product: ProductType) => {
    setCart([...cart, product]);
  };

  const removeProduct = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };
  return (
    <div>
      <p>Shopping cart</p>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product: ProductType, index) => (
          <div key={index}>
            <Product
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
              addFunction={() => addProduct(product)}
            />
          </div>
        ))}
      </div>
      <div>
        <p>Cart</p>
        <div className="grid grid-cols-4 gap-4">
          {cart.map((product: ProductType, index) => (
            <div key={index}>
              <h2>{product.name}</h2>
              <p>{product.price}</p>
              <button onClick={() => removeProduct(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
