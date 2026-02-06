import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from '../config';
export default function AddProduct() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // --- LOGIC: ONLY HANDLE CREATION (POST) ---
  const handleCreateProduct = async (productDetails) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}` // Admin Token
        },
        body: JSON.stringify(productDetails),
      });

      if (response.ok) {
        toast.success("Product created successfully!");
        setTimeout(() => navigate("/products"), 1500);
      } else {
        const errorData = await response.json();
        console.error("Validation Errors:", errorData);
        
        // Format errors for display
        const formattedErrors = Object.entries(errorData)
            .map(([field, msgs]) => `${field}: ${msgs}`)
            .join(" | ");

        setErrorMsg(formattedErrors || "Failed to create product.");
        toast.error("Please check the form for errors.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setErrorMsg("Server connection failed.");
      toast.error("Server Error");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div>
        <ToastContainer position="top-center" theme="colored" />
        <ProductForm
            isUpdatePage={false}
            handleSubmit={handleCreateProduct}
            errorMsg={errorMsg}
            isSubmitting={isSubmitting}
        />
    </div>
  );
}