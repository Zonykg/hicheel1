"use client";
import { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext();
export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
   }, []);
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  function toggleFavorite(p) {
    let favs = [...favorites];
    favs.find(i => i.id === p.id) ? favs = favs.filter(i => i.id !== p.id) : favs.push(p);
    setFavorites(favs);
  }
  return <AppContext.Provider value={{theme,setTheme,favorites,toggleFavorite}}>{children}</AppContext.Provider>;
}
export const useAppContext=()=>useContext(AppContext);