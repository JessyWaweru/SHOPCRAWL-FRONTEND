import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Removed useNavigate as it conflicted with Link
import { CartContext } from "./CartProvider";

export default function ProductItem({ name, about, id, image }) {
  const { addToCart } = useContext(CartContext);

  const handleDetailsClick = () => {
    // 1. Add to "Search History" (Context)
    addToCart({ name, about, id, image });
    
    // 2. We do NOT navigate to '/cart' here. 
    // We let the <Link> below handle the navigation to the Details page.
  };

  return (
    <div 
      key={id}
      className="w-72 mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:scale-110 ease-in-out duration-300 m-3"
    >
      <div>
        <img
          className="w-full h-48 object-cover" // Fixed height for consistency
          src={image || "/assets/pexels-luis-quintero-2774556.jpg"}
          alt={name}
        />
      </div>
      
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800 text-center w-full truncate">
          {name}
        </h2>
      </div>

      <div className="px-4 py-2 flex flex-col gap-4">
        <div className="flex gap-2">
          {/* Truncate about text if it's too long */}
          <p className="font-bold text-sm text-gray-600 line-clamp-2">
            {about}
          </p>
        </div>
        
        {/* The Link handles the navigation to the Django ID (e.g., /ProductDetails/1) */}
        <Link to={`/ProductDetails/${id}`}>
            <button 
                onClick={handleDetailsClick}
                className="bg-rose-600 hover:opacity-80 text-white px-4 py-2 rounded-lg w-full"
            >
                DETAILS 
            </button>
       </Link>
      </div>
    </div>
  );
}