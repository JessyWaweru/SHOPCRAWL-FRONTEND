import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../providers/Auth.provider"; // Ensure this provider exists
import Table from "./Table";
import { CartContext } from "./CartProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrophy } from "@fortawesome/free-solid-svg-icons";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initialize as null to handle loading state
  const auth = useAuthContext();
  const { cart } = useContext(CartContext);
  const [isAdmin, setIsAdmin] = useState(false);

  // Get product details
  useEffect(() => {
    // UPDATED: Point to Django API
    // Note the trailing slash '/' which Django often expects
    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((response) => {
          if (!response.ok) {
              throw new Error("Product not found");
          }
          return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Check if user exists and is admin
    if (user && user.admin === true) {
      setIsAdmin(true);
    }
  }, []);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    // UPDATED: Point to Django API
    fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
            window.location.href = "/products";
        } else {
            alert("Failed to delete product");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Add a simple loading state
  if (!product) {
      return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <div 
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1637625854255-d893202554f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80')`
      }}
    >
        <div className="mb-10">
            {/* heading */}
            <div className="bg-gray-700">
                <h1 className="uppercase py-8 text-rose-100 text-4xl font-semibold text-center">
                    {product.name}
                </h1>
                <p className="text-white text-center pb-5 italic font-thin">
                    {product.about}
                </p>
            </div>

            {/* body */}
            <div className="w-3/4 flex flex-col md:flex-row justify-between m-auto mt-8 bg-white/90 p-8 rounded-xl shadow-xl">
                <div className="flex flex-col w-full">
                    {/* image */}
                    <div>
                        <img
                            src={product.image || "/assets/pexels-luis-quintero-2774556.jpg"}
                            alt={product.name}
                            className="h-96 w-full object-contain m-auto rounded-lg bg-white"
                        />
                    </div>

                    <div className="flex justify-end w-full border-t py-2 mt-4">
                        {isAdmin && (
                            <>
                                <Link to={`/updateProduct/${id}`}>
                                    <button className="bg-blue-600 rounded-lg w-32 text-white hover:opacity-80 p-2 mr-2">
                                        Update
                                    </button>
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 rounded-lg w-32 text-white hover:opacity-80 p-2"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>

                    {/* about */}
                    <div>
                        <div className="flex gap-2 text-3xl items-center py-5">
                            <div className="h-12 w-12 rounded-full bg-rose-600 text-white flex items-center justify-center text-xl">
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </div>
                            <h3 className="text-gray-700 border-b-2 border-rose-600 font-bold uppercase text-xl">
                                About the product
                            </h3>
                        </div>
                        <p className="text-gray-800 leading-relaxed">{product.description}</p>
                    </div>

                    <div>
                        <div className="flex gap-2 text-3xl items-center py-5 mt-4">
                            <div className="h-12 w-12 rounded-full bg-rose-600 text-white flex items-center justify-center text-xl">
                                <FontAwesomeIcon icon={faTrophy} />
                            </div>
                            <h3 className="text-gray-700 border-b-2 border-rose-600 font-bold uppercase text-xl">
                                ECOMMERCE RANKINGS
                            </h3>
                        </div>
                        <div className="w-full">
                             {/* IMPORTANT: We pass the full 'product' object to the Table.
                                The Table component MUST handle nested objects (product.amazon.price).
                             */}
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