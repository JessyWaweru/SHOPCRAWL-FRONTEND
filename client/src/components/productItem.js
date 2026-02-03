import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";

function ProductItem(props) {
  // Destructure the common fields
  const { id, image, name } = props;

  // --- 1. PRICE RANGE LOGIC ---
  
  // Collect all potential prices from the props
  // (Ensure your Backend Serializer actually sends these fields!)
  const potentialPrices = [
    props.price,
    props.amazon_price,
    props.jumia_price,
    props.kilimall_price,
    props.shopify_price
  ];

  // Filter out: non-numbers, nulls, undefined, and zeros
  const validPrices = potentialPrices
    .map(p => parseFloat(p))
    .filter(p => !isNaN(p) && p > 0);

  let priceDisplay = "Sold Out"; // Default if no prices exist

  if (validPrices.length > 0) {
    const minPrice = Math.min(...validPrices);
    const maxPrice = Math.max(...validPrices);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'KSH',
        maximumFractionDigits: 0, // Remove cents for cleaner look (optional)
    });

    if (minPrice !== maxPrice) {
        // We have a range (e.g. $100 - $150)
        priceDisplay = `${formatter.format(minPrice)} - ${formatter.format(maxPrice)}`;
    } else {
        // Single price
        priceDisplay = formatter.format(minPrice);
    }
  }

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden w-72">
      
      {/* 1. IMAGE CONTAINER */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
            <Link to={`/products/${id}`}>
                <button 
                    title="View Details"
                    className="bg-white text-gray-900 p-4 rounded-full hover:bg-rose-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                >
                    <FontAwesomeIcon icon={faEye} className="text-xl"/>
                </button>
            </Link>
        </div>
      </div>

      {/* 2. PRODUCT INFO */}
      <div className="p-4 text-center">
        <h3 className="text-gray-800 font-bold text-lg truncate mb-1 group-hover:text-rose-600 transition-colors">
            {name}
        </h3>
        
        {/* PRICE DISPLAY */}
        <p className="text-rose-600 font-bold text-lg">
            {priceDisplay}
        </p>
        
        {/* Optional: Label to indicate it's a comparison */}
        {validPrices.length > 1 && (
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mt-1">
                From {validPrices.length} Stores
            </p>
        )}
      </div>

    </div>
  );
}

export default ProductItem;