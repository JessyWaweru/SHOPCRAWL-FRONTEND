import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/Auth.provider"; 
import Table from "./Table"; // The SmartRank Algorithm Table
import { CartContext } from "./CartProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrophy, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  
  // Get User Context
  const { user } = useAuthContext(); 
  const { cart } = useContext(CartContext);
  const [isAdmin, setIsAdmin] = useState(false);

  // ==========================================
  // 1. FETCH PRODUCT DATA
  // ==========================================
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((response) => {
          if (!response.ok) throw new Error("Product not found");
          return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  // ==========================================
  // 2. SAVE TO HISTORY (Auto-Trigger)
  // ==========================================
  useEffect(() => {
    // Only run if product is loaded AND user is logged in
    if (product && user) {
        // Assuming you store the token in localStorage upon login
        const token = localStorage.getItem("token"); 

        fetch('http://127.0.0.1:8000/api/history/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` // Required for @permission_classes([IsAuthenticated])
            },
            body: JSON.stringify({ product_id: id })
        })
        .then(res => {
            if (res.ok) console.log("Added to history");
        })
        .catch(err => console.error("History save failed", err));
    }
  }, [id, product, user]);

  // ==========================================
  // 3. CHECK ADMIN STATUS
  // ==========================================
  useEffect(() => {
    // Double check against localStorage or Context to show Admin buttons
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.admin === true) {
      setIsAdmin(true);
    }
  }, []);

  // ==========================================
  // 4. HANDLE DELETE
  // ==========================================
  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
            navigate("/products"); // Redirect cleanly to products list
        } else {
            alert("Failed to delete product");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Loading State
  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-bold text-gray-500">Loading Product Details...</div>
    </div>
  );

  return (
    <div 
      className="bg-cover bg-center min-h-screen pb-10"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1637625854255-d893202554f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1854&q=80')`
      }}
    >
        {/* Navigation Bar / Back Button */}
        <div className="bg-gray-900/80 p-4 text-white">
            <Link to="/products" className="hover:text-rose-400 transition flex items-center gap-2 w-fit font-medium">
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Products
            </Link>
        </div>

        <div className="mb-10">
            {/* Header Section */}
            <div className="bg-gray-800/95 shadow-lg backdrop-blur-sm">
                <h1 className="uppercase py-8 text-rose-100 text-4xl font-bold text-center tracking-wide">
                    {product.name}
                </h1>
                <p className="text-gray-300 text-center pb-6 italic font-light max-w-2xl mx-auto">
                    {/* Shows the 'about' field if it exists, otherwise falls back to start of description */}
                    {product.about || (product.description ? product.description.substring(0, 100) + "..." : "Compare prices across top vendors.")}
                </p>
            </div>

            {/* Main Content Body */}
            <div className="w-11/12 md:w-3/4 flex flex-col md:flex-row justify-between mx-auto mt-8 bg-white/95 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
                <div className="flex flex-col w-full">
                    
                    {/* Image Section */}
                    <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-100">
                        <img
                            src={product.image || "https://via.placeholder.com/400"}
                            alt={product.name}
                            className="h-80 w-full object-contain mx-auto transition-transform hover:scale-105 duration-500"
                        />
                    </div>

                    {/* Admin Controls (Only visible to Admins) */}
                    {isAdmin && (
                        <div className="flex justify-end w-full border-t border-gray-200 py-4 mt-4 gap-3">
                            <Link to={`/updateProduct/${id}`}>
                                <button className="bg-blue-600 rounded-lg px-6 py-2 text-white font-semibold hover:bg-blue-700 transition shadow-md">
                                    Update
                                </button>
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 rounded-lg px-6 py-2 text-white font-semibold hover:bg-red-700 transition shadow-md"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                    {/* About Section */}
                    <div className="mt-8">
                        <div className="flex gap-3 items-center mb-4">
                            <div className="h-10 w-10 rounded-full bg-rose-600 text-white flex items-center justify-center text-lg shadow-md">
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </div>
                            <h3 className="text-gray-800 font-bold uppercase text-xl border-b-2 border-rose-600 pb-1">
                                About the product
                            </h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {product.description || "No detailed description available for this product."}
                        </p>
                    </div>

                    {/* Ranking Algorithm Section */}
                    <div className="mt-12">
                        <div className="flex gap-3 items-center mb-6">
                            <div className="h-10 w-10 rounded-full bg-yellow-500 text-white flex items-center justify-center text-lg shadow-md">
                                <FontAwesomeIcon icon={faTrophy} />
                            </div>
                            <h3 className="text-gray-800 font-bold uppercase text-xl border-b-2 border-yellow-500 pb-1">
                                SmartRank™ Analysis (Best Value)
                            </h3>
                        </div>
                        
                        {/* We pass the full 'product' object to Table.js, 
                            which calculates the scores based on Price + Shipping + Reviews */}
                        <div className="w-full">
                            <Table product={product} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
}

export default ProductDetails;