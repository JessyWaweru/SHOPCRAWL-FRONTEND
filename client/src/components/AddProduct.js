import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

export default function AddProduct() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleCreateProduct = async (productDetails) => {
    try {
      // POST request to Django to create a new product
      const response = await fetch("http://127.0.0.1:8000/api/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDetails),
      });

      if (response.ok) {
        // Redirect to the main products page on success
        navigate("/products");
      } else {
        setErrorMsg("Failed to create product. Please check your inputs.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setErrorMsg("Server error. Please try again later.");
    }
  };

  return (
    <ProductForm
      isUpdatePage={false}
      handleSubmit={handleCreateProduct}
      errorMsg={errorMsg}
    />
  );
}