"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(product) {
    let updatedFavorites = [...favorites];
    if (updatedFavorites.find((item) => item.id === product.id)) {
      updatedFavorites = updatedFavorites.filter((item) => item.id !== product.id);
    } else {
      updatedFavorites.push(product);
    }
    setFavorites(updatedFavorites);
  }

  return (
    <AppContext.Provider value={{ theme, setTheme, favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
}

import { useAppContext } from "../../context/AppContext";
export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useAppContext(); 

  return (
    <div>
      <h1>My Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {favorites.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid",
                padding: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <img src={product.image} alt={product.title} width="100" />
              <h3>{product.title}</h3>
              <p>{product.price}$</p>
              <button onClick={() => toggleFavorite(product)}>
                Remove from Favorites ★
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}