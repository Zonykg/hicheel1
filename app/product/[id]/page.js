"use client";
import { useEffect,useState } from "react";
import { useAppContext } from '../../context/AppContext';
export default function HomePage(){
  const [products,setProducts]=useState([]);
  const {favorites,toggleFavorite}=useAppContext();
  useEffect(()=>{fetch("https://fakestoreapi.com/products").then(r=>r.json()).then(d=>setProducts(d));},[]);
  return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"20px"}}>
      {products.map(p=>(
        <div key={p.id} style={{border:"1px solid",padding:"10px"}}>
          <img src={p.image} width="100"/>
          <h3>{p.title}</h3><p>{p.price}$</p>
          <a href={`/product/${p.id}`}>Дэлгэрэнгүй</a>
          <button onClick={()=>toggleFavorite(p)}>
            {favorites.find(i=>i.id===p.id)?"★":"☆"}
          </button>
        </div>
      ))}
    </div>);
}