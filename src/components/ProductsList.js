import React, { useEffect, useState } from "react";
import ProductItem from "./productItem"; 
import Searchbar from "./Searchbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faSearch } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from '../config';

// --- IMPORT STYLES ---
import { productsListStyles } from "../styles/ProductsListStyles";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // 1. Get all products
  useEffect(() => {
    fetch(`${API_URL}/api/products/`)
      .then((response) => {
          if(!response.ok) throw new Error("Failed to fetch products");
          return response.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, []);

  // 2. INSTANT FILTER LOGIC
  const displayProducts = products.filter((product) => {
      if (searchValue === "") return true;

      const lowerSearch = searchValue.toLowerCase();
      return (
          product.name.toLowerCase().includes(lowerSearch) || 
          (product.description && product.description.toLowerCase().includes(lowerSearch))
      );
  });

  return (
    <div className={productsListStyles.pageContainer}>
      
      {/* 1. HEADER */}
      <div className={productsListStyles.headerContainer}>
        <div className={productsListStyles.badge}>
            <FontAwesomeIcon icon={faFire} className="animate-pulse" />
            Trending Now
        </div>
        <h1 className={productsListStyles.title}>
            Hottest Products
        </h1>
        <p className={productsListStyles.subtitle}>
            Browse our entire collection. Use the search bar below to filter by name, brand, or category instantly.
        </p>
      </div>

      {/* 2. SEARCH BAR */}
      <div className={productsListStyles.searchSection}>
        {/* We assume Searchbar has its own internal styling, but we wrap it to position it correctly */}
        <Searchbar 
            setSearchValue={setSearchValue} 
            handleSearch={() => {}} 
        />
      </div>

      {/* 3. PRODUCT GRID */}
      <div className={productsListStyles.gridContainer}>
        
        {/* LOADING STATE */}
        {isLoading && (
             <div className="col-span-full text-center py-20 text-gray-500 font-bold text-lg animate-pulse">
                Loading products...
             </div>
        )}

        {/* DATA */}
        {!isLoading && displayProducts.map((product) => (
            // Added 'w-full h-full' to ensure cards stretch nicely
            <div key={product.id} className="w-full h-full flex justify-center">
                <ProductItem {...product} />
            </div>
        ))}
        
        {/* EMPTY STATE */}
        {!isLoading && searchValue && displayProducts.length === 0 && (
            <div className={productsListStyles.emptyStateContainer}>
                <div className={productsListStyles.emptyIcon}>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <h3 className={productsListStyles.emptyTitle}>
                    No matches found
                </h3>
                <p className={productsListStyles.emptyText}>
                    We couldn't find any products matching "<strong>{searchValue}</strong>". Try searching for "shoe", "phone", or check your spelling.
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;