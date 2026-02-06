import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from '../config';

// --- IMPORT STYLES ---
import { updateProductStyles } from "../styles/UpdateProductStyles";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH & FLATTEN DATA ---
  useEffect(() => {
    if (!id) return; 

    fetch(`${API_URL}/api/products/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        // Flatten nested API data to match Form State
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
            amazon_reviews: data.amazon_data?.rating || 0,

            // Jumia
            jumia_price: data.jumia_data?.price || 0,
            jumia_shipping: data.jumia_data?.shipping_cost || 0,
            jumia_days: data.jumia_data?.shipping_days || 0,
            jumia_location: data.jumia_data?.location || "",
            jumia_reviews: data.jumia_data?.rating || 0,

            // Kilimall
            kilimall_price: data.kilimall_data?.price || 0,
            kilimall_shipping: data.kilimall_data?.shipping_cost || 0,
            kilimall_days: data.kilimall_data?.shipping_days || 0,
            kilimall_location: data.kilimall_data?.location || "",
            kilimall_reviews: data.kilimall_data?.rating || 0,

            // Shopify
            shopify_price: data.shopify_data?.price || 0,
            shopify_shipping: data.shopify_data?.shipping_cost || 0,
            shopify_days: data.shopify_data?.shipping_days || 0,
            shopify_location: data.shopify_data?.location || "",
            shopify_reviews: data.shopify_data?.rating || 0,
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

  // --- 2. HANDLE UPDATE ---
  const handleUpdate = async (updatedDetails) => {
    try {
        const token = localStorage.getItem("token");

        // Ensure description exists (Backend Requirement)
        if (!updatedDetails.description) {
            updatedDetails.description = updatedDetails.about || "No description provided.";
        }

        const response = await fetch(`${API_URL}/api/products/${id}/`, {
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

  // --- 3. LOADING STATE ---
  if (loading) return (
    <div className={updateProductStyles.loadingContainer}>
        <FontAwesomeIcon icon={faSpinner} className={updateProductStyles.loadingIcon} />
        <p className={updateProductStyles.loadingText}>Fetching Product Details...</p>
    </div>
  );

  // --- 4. RENDER FORM ---
  return (
    <div>
        <ToastContainer theme="colored" position="top-center" />
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