import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./productItem"; // Ensure filename matches your system
import { API_URL } from '../config';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

// --- IMPORT STYLES ---
import { productsHomeStyles } from "../styles/ProductsHomeStyles";

function ProductsHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products/`)
      .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Home Products:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className={productsHomeStyles.sectionContainer}>
      
      {/* 1. HEADER */}
      <div className={productsHomeStyles.headerWrapper}>
        <div className={productsHomeStyles.badge}>
            <FontAwesomeIcon icon={faStar} />
            Top Picks
        </div>
        <h1 className={productsHomeStyles.title}>
            Our Best Selections
        </h1>
        <p className={productsHomeStyles.subtitle}>
            Curated products with the best value across all major vendors.
        </p>
      </div>

      {/* 2. PRODUCT GRID */}
      <div className={productsHomeStyles.gridContainer}>
        {/* Display only the first 6 products */}
        {products.slice(0, 6).map((product) => (
          <div key={product.id} className="w-full h-full flex justify-center">
             <ProductItem {...product} />
          </div>
        ))}
      </div>

      {/* 3. VIEW ALL BUTTON */}
      <div className={productsHomeStyles.buttonWrapper}>
        <Link to="/products">
            <button className={productsHomeStyles.viewAllBtn}>
                <FontAwesomeIcon icon={faLayerGroup} />
                Browse All Products
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </Link>
      </div>

    </div>
  );
}

export default ProductsHome;