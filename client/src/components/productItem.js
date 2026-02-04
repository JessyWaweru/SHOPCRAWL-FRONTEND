import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";

// --- IMPORT STYLES ---
import { productItemStyles } from "../styles/ProductItemStyles";

function ProductItem(props) {
  const { id, image, name, amazon_data, jumia_data, kilimall_data, shopify_data } = props;

  // --- PRICE LOGIC (Kept exactly as is) ---
  const vendors = [amazon_data, jumia_data, kilimall_data, shopify_data];
  
  const validPrices = vendors
    .filter(v => v && v.price)
    .map(v => parseFloat(v.price))
    .filter(p => !isNaN(p) && p > 0);

  let priceDisplay = "Sold Out";

  if (validPrices.length > 0) {
    const minPrice = Math.min(...validPrices);
    const maxPrice = Math.max(...validPrices);
    const formatter = new Intl.NumberFormat('en-KE', {
        style: 'currency', 
        currency: 'KES', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0
    });

    priceDisplay = minPrice !== maxPrice 
        ? `${formatter.format(minPrice)} - ${formatter.format(maxPrice)}`
        : formatter.format(minPrice);
  }

  return (
    <div className={productItemStyles.container}>
      
      {/* 1. IMAGE CONTAINER */}
      <div className={productItemStyles.imageWrapper}>
        <img 
            src={image || "https://via.placeholder.com/300"} 
            alt={name} 
            className={productItemStyles.productImage}
        />

        {/* Store Count Badge */}
        {validPrices.length > 0 && (
            <span className={productItemStyles.storeBadge}>
                {validPrices.length} {validPrices.length === 1 ? 'Store' : 'Stores'}
            </span>
        )}

        {/* HOVER OVERLAY */}
        <div className={productItemStyles.overlay}>
            <Link to={`/products/${id}`}>
                <button 
                    title="View Details"
                    className={productItemStyles.viewBtn}
                >
                    <FontAwesomeIcon icon={faEye} className={productItemStyles.viewIcon}/>
                </button>
            </Link>
        </div>
      </div>

      {/* 2. PRODUCT INFO */}
      <div className={productItemStyles.detailsContainer}>
        {/* Title */}
        <h3 className={productItemStyles.title} title={name}>
            {name}
        </h3>
        
        {/* Price Section */}
        <div className={productItemStyles.priceWrapper}>
            <p className={`${productItemStyles.priceText} ${validPrices.length > 0 ? productItemStyles.priceActive : productItemStyles.priceSoldOut}`}>
                {priceDisplay}
            </p>
            
            {/* Comparison Label */}
            {validPrices.length > 1 && (
                <span className={productItemStyles.compareText}>
                    Compare {validPrices.length} Vendors
                </span>
            )}
        </div>
      </div>

    </div>
  );
}

export default ProductItem;