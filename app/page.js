"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = useState([]); 
  const { theme, setTheme, favorites, setFavorites } = useAppContext();

  function toggleFavorite(product) {
    let updatedFavorites = [...favorites];
    if (updatedFavorites.find((item) => item.id === product.id)) {
      updatedFavorites = updatedFavorites.filter((item) => item.id !== product.id);
    } else {
      updatedFavorites.push(product);
    }
    setFavorites(updatedFavorites);
  }
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <h1>Store</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <Link href="/favorites">
        <button style={{ marginLeft: "20px" }}>Favorites</button>
      </Link>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          marginTop: "30px",
          backgroundColor:"grey"
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid",
              padding: "30px",
              backgroundColor: theme === "light" ? "#fff" : "#333",
              color: theme === "light" ? "#000" : "#fff",
            }}
          >
            <img src={product.image} alt={product.title} width="100" />
            <h3>{product.title}</h3>
            <p>{product.price}$</p>
            <a href={`/product/${product.id}`}>Дэлгэрэнгүй</a>
            <button onClick={() => toggleFavorite(product)}>
              {favorites.find((item) => item.id === product.id) ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}