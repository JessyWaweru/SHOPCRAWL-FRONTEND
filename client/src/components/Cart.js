import React, { useContext } from "react";
import { CartContext } from "./CartProvider";
import ProductItem from "./productItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  // Grab the limit from context so we can display it dynamically
  const { cart, HISTORY_LIMIT } = useContext(CartContext);

  return (
    <div 
        className="min-h-screen bg-cover bg-center flex flex-col items-center p-4"
        style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1637625854255-d893202554f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80')`
        }}
    >
        <div className="bg-white/90 p-8 rounded-xl shadow-2xl w-full max-w-6xl mt-10">
            
            <div className="flex flex-col items-center mb-8 border-b-2 border-rose-100 pb-4">
                <div className="h-20 w-20 rounded-full bg-rose-600 text-white flex items-center justify-center text-3xl mb-4 shadow-md">
                    <FontAwesomeIcon icon={faHistory} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 uppercase tracking-wide">
                    Search History
                </h1>
                
                {/* --- NEW: Capping Notification --- */}
                <p className="text-gray-500 mt-2 font-medium bg-gray-100 px-4 py-1 rounded-full text-sm">
                    <span className="text-rose-600 font-bold">Note:</span> We save your last <span className="font-bold text-gray-800">{HISTORY_LIMIT}</span> viewed items for quick access.
                </p>
            </div>

            {cart.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-2xl text-gray-600 font-light mb-6">
                        You haven't viewed any products details yet.
                    </h2>
                    <Link to="/products">
                        <button className="bg-rose-600 text-white px-8 py-3 rounded-full font-bold hover:bg-rose-700 transition transform hover:scale-105 shadow-lg">
                            Start Browsing <FontAwesomeIcon icon={faArrowRight} className="ml-2"/>
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* We reverse the array so the NEWEST items show first */}
                    {[...cart].reverse().map((product) => (
                        <div key={product.id} className="transform hover:scale-105 transition duration-300">
                             <ProductItem {...product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default Cart;