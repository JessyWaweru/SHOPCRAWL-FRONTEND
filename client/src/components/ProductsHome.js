import React, { useEffect, useState } from "react";
import ProductItem from "./productItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ProductsHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // UPDATED: Point to Django API
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Home Products:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div 
        className="w-full bg-gray-100 p-4 flex flex-col gap-4 items-center bg-cover bg-center min-h-screen"
        style={{
            backgroundImage:`url('https://images.unsplash.com/photo-1637625854255-d893202554f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80')`
        }}
    >
      <div className="flex gap-2 text-4xl items-center py-5 bg-white/80 p-6 rounded-full shadow-xl mt-10">
        <div className="h-24 w-24 rounded-full bg-rose-600 text-white flex items-center justify-center animate-bounce">
            <FontAwesomeIcon icon={faStar} className="fa-solid"/>
        </div>
        <h1 className="text-gray-800 border-b-4 border-rose-600 font-bold uppercase tracking-widest ml-4">
          OUR BEST SELECTIONS
        </h1>
      </div>

      <div className="flex w-3/5 justify-evenly flex-wrap items-center m-auto gap-4">
        {/* Display only the first 6 products */}
        {products.slice(0, 6).map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>

      <Link to="/products">
        <button className="bg-rose-600 rounded-lg w-64 p-3 text-white hover:opacity-80 font-bold text-lg shadow-lg mt-8 mb-10 transition transform hover:scale-105">
          <i className="fa-solid fa-calendar-days mr-2"></i>
          See All Products
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </button>
      </Link>
    </div>
  );
}

export default ProductsHome;