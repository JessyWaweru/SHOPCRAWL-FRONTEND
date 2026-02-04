import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";

function ProductItem(props) {
  const { id, image, name, amazon_data, jumia_data, kilimall_data, shopify_data } = props;

  // --- PRICE LOGIC ---
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
    // Changed w-full to max-w-sm to prevent it from getting huge on wide screens
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-xs mx-auto flex flex-col border border-gray-100">
      
      {/* 1. IMAGE CONTAINER (Reduced Height to h-48) */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
        <img 
            src={image || "https://via.placeholder.com/300"} 
            alt={name} 
            className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Store Count Badge (Smaller) */}
        {validPrices.length > 0 && (
            <span className="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10 uppercase tracking-wide">
                {validPrices.length} Stores
            </span>
        )}

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
            <Link to={`/products/${id}`}>
                {/* Smaller Button */}
                <button 
                    title="View Details"
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-rose-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                >
                    <FontAwesomeIcon icon={faEye} className="text-sm"/>
                </button>
            </Link>
        </div>
      </div>

      {/* 2. PRODUCT INFO (Tighter Padding) */}
      <div className="p-3 text-center flex flex-col flex-grow justify-between">
        {/* Smaller Title Font */}
        <h3 className="text-gray-700 font-semibold text-sm truncate mb-1 group-hover:text-rose-600 transition-colors" title={name}>
            {name}
        </h3>
        
        {/* PRICE DISPLAY */}
        <div className="mt-1">
            <p className={`font-bold text-base ${validPrices.length > 0 ? "text-rose-600" : "text-gray-400"}`}>
                {priceDisplay}
            </p>
            
            {/* Comparison Label */}
            {validPrices.length > 1 && (
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">
                    Compare {validPrices.length} Vendors
                </p>
            )}
        </div>
      </div>

    </div>
  );
}

export default ProductItem;