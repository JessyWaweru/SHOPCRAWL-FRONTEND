import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    // --- THE FIX: ADD THIS CHECK ---
    if (!id) return; 

    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        // --- FLATTEN DATA FOR FORM ---
        // We explicitly map every field to ensure no "undefined" issues
       // Inside useEffect ...
const formattedData = {
    name: data.name || "",
    about: data.about || "",
    image: data.image || "",
    description: data.description || "", 

    // Amazon
    amazon_price: data.amazon_data?.price || 0,
    amazon_shipping: data.amazon_data?.shipping_cost || 0,
    amazon_days: data.amazon_data?.shipping_days || 0,
    amazon_location: data.amazon_data?.location || "",
    amazon_reviews: data.amazon_data?.rating || 0, // <--- UNPACK RATING

    // Jumia
    jumia_price: data.jumia_data?.price || 0,
    jumia_shipping: data.jumia_data?.shipping_cost || 0,
    jumia_days: data.jumia_data?.shipping_days || 0,
    jumia_location: data.jumia_data?.location || "",
    jumia_reviews: data.jumia_data?.rating || 0, // <--- UNPACK RATING

    // Kilimall
    kilimall_price: data.kilimall_data?.price || 0,
    kilimall_shipping: data.kilimall_data?.shipping_cost || 0,
    kilimall_days: data.kilimall_data?.shipping_days || 0,
    kilimall_location: data.kilimall_data?.location || "",
    kilimall_reviews: data.kilimall_data?.rating || 0, // <--- UNPACK RATING

    // Shopify
    shopify_price: data.shopify_data?.price || 0,
    shopify_shipping: data.shopify_data?.shipping_cost || 0,
    shopify_days: data.shopify_data?.shipping_days || 0,
    shopify_location: data.shopify_data?.location || "",
    shopify_reviews: data.shopify_data?.rating || 0, // <--- UNPACK RATING
};
        setProductData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error loading product");
        navigate("/products");
      });
  }, [id, navigate]);

  const handleUpdate = async (updatedDetails) => {
    try {
        const token = localStorage.getItem("token");

        // BACKEND REQUIREMENT: Description is mandatory in your model.
        // Since we removed the input, we autofill it with 'about' text to avoid errors.
        if (!updatedDetails.description) {
            updatedDetails.description = updatedDetails.about || "No description provided.";
        }

        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(updatedDetails),
        });

        if (response.ok) {
            toast.success("Product Updated Successfully!");
            setTimeout(() => navigate(`/products/${id}`), 1000);
        } else {
            const errorData = await response.json();
            console.error("Update Error:", errorData);
            toast.error("Failed to update. Check inputs.");
        }
    } catch (error) {
        console.error("Network Error:", error);
        toast.error("Server Error");
    }
  };

  if (loading) return <div className="p-10 text-center font-bold">Loading product details...</div>;

  return (
    <div>
        <ToastContainer />
        {/* We only render the form once productData is ready to ensure pre-population works */}
        {productData && (
            <ProductForm
                initialData={productData}
                isUpdatePage={true}
                handleSubmit={handleUpdate}
            />
        )}
    </div>
  );
}