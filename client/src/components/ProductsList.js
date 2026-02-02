import React, { useEffect, useState } from "react";
import ProductItem from "./productItem";
import Searchbar from "./Searchbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from "@fortawesome/free-solid-svg-icons";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  
  // 1. Get all products from Django API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => {
          if(!response.ok) throw new Error("Failed to fetch products");
          return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // 2. INSTANT FILTER LOGIC
  // We filter directly based on the 'searchValue' state.
  // This runs on every render, so as soon as 'searchValue' changes, the list updates.
  const displayProducts = products.filter((product) => {
      if (searchValue === "") return true; // Show all if empty

      const lowerSearch = searchValue.toLowerCase();
      
      // APPROXIMATE MATCHING:
      // Check if the search term exists in the Name OR the Description
      return (
          product.name.toLowerCase().includes(lowerSearch) || 
          (product.description && product.description.toLowerCase().includes(lowerSearch))
      );
  });

  return (
    <div 
        className="bg-cover bg-center min-h-screen"
        style={{
            backgroundImage:`url('https://images.unsplash.com/photo-1570876050997-2fdefb00c004?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')`
        }}
    >
      <div className="w-3/4 m-auto p-4 flex flex-col gap-4 min-h-screen">
        {/* Header */}
        <div className="flex gap-2 text-4xl items-center py-5 mx-auto bg-white/80 p-6 rounded-full shadow-lg mt-4">
          <div className="h-24 w-24 rounded-full bg-rose-600 text-white flex items-center justify-center animate-pulse">
            <FontAwesomeIcon icon={faFire} className="fa-solid"/>
          </div>
          <h1 className="text-gray-800 border-b-4 border-rose-600 font-bold uppercase tracking-wider ml-4">
            HOTTEST PRODUCTS
          </h1>
        </div>

        {/* Search Bar - No Button Needed for Filter */}
        <div className="flex items-center justify-center w-full mb-8">
            {/* We pass setSearchValue directly. The Searchbar component updates it, 
                and React re-renders this list instantly. */}
            <Searchbar 
                setSearchValue={setSearchValue} 
                handleSearch={() => {}} // Empty function since it's now instant
            />
        </div>

        {/* Product Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {displayProducts.map((product) => (
               <ProductItem key={product.id} {...product} />
          ))}
          
          {/* Empty State */}
          {searchValue && displayProducts.length === 0 && (
              <div className="text-white text-2xl font-bold bg-black/50 p-4 rounded-lg text-center">
                  <p>No products found matching "{searchValue}"</p>
                  <p className="text-sm font-normal mt-2">Try searching for keywords like "shoe", "phone", or "beauty".</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;