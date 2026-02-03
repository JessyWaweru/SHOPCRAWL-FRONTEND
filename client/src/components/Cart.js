import React, { useState, useEffect } from "react";
import ProductItem from "./productItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const HISTORY_LIMIT = 11; // Matches backend limit

  useEffect(() => {
    // 1. Get the token
    const token = localStorage.getItem("token");

    if (!token) {
        setLoading(false);
        return; // If not logged in, history remains empty
    }

    // 2. Fetch History from Django API
    fetch('http://127.0.0.1:8000/api/history/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}` // Assuming you use Token Auth
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to fetch history");
        return res.json();
    })
    .then(data => {
        setHistory(data); // data is an array of objects: [{ id, product: {...}, date_added }]
        setLoading(false);
    })
    .catch(err => {
        console.error("Error fetching history:", err);
        setLoading(false);
    });
  }, []);

  return (
    <div 
        className="min-h-screen bg-cover bg-center flex flex-col items-center p-4"
        style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1637625854255-d893202554f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80')`
        }}
    >
        <div className="bg-white/90 p-8 rounded-xl shadow-2xl w-full max-w-6xl mt-10">
            
            {/* --- HEADER --- */}
            <div className="flex flex-col items-center mb-8 border-b-2 border-rose-100 pb-4">
                <div className="h-20 w-20 rounded-full bg-rose-600 text-white flex items-center justify-center text-3xl mb-4 shadow-md">
                    <FontAwesomeIcon icon={faHistory} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 uppercase tracking-wide">
                    Search History
                </h1>
                
                <p className="text-gray-500 mt-2 font-medium bg-gray-100 px-4 py-1 rounded-full text-sm">
                    <span className="text-rose-600 font-bold">Note:</span> We save your last <span className="font-bold text-gray-800">{HISTORY_LIMIT}</span> viewed items for quick access.
                </p>
            </div>

            {/* --- LOADING STATE --- */}
            {loading ? (
                 <div className="text-center py-20">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-rose-600 mb-4" />
                    <p className="text-gray-600">Loading your history...</p>
                 </div>
            ) : history.length === 0 ? (
                
                /* --- EMPTY STATE --- */
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

                /* --- DATA LIST --- */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Backend already sorts by newest first, so no .reverse() needed */}
                    {history.map((item) => (
                        <div key={item.id} className="transform hover:scale-105 transition duration-300">
                             {/* The API returns structure: { id: 1, product: { ...productData } } 
                                So we pass { ...item.product } to the component 
                             */}
                             <ProductItem {...item.product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default Cart;