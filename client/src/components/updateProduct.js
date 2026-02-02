import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";

export default function UpdateProduct() {
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // 1. Fetch the existing product to populate the form
  useEffect(() => {
    const getProduct = async () => {
      try {
        // UPDATED: Point to Django API
        const response = await fetch(
          `http://127.0.0.1:8000/api/products/${id}/`
        );
        if (!response.ok) {
           throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setErrorMsg("Could not load product details.");
      }
    };
    getProduct();
  }, [id]);

  // 2. Handle the actual update (PUT request)
  const handleUpdateProduct = async (productDetails) => {
    try {
      // UPDATED: Point to Django API
      const response = await fetch(
        `http://127.0.0.1:8000/api/products/${id}/`,
        {
          method: "PUT", // Django DRF accepts PUT for full updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productDetails),
        }
      );
      
      if (response.ok) {
        // handle success case
        navigate(`/products`);
        console.log("Product updated successfully!");
      } else {
        // handle error case
        setErrorMsg("Failed to update product.");
        console.error("Update failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while updating the product:", error);
    }
  };

  return (
    <>
      {product && (
        <ProductForm
          isUpdatePage={true}
          productData={product}
          errorMsg={errorMsg}
          handleSubmit={handleUpdateProduct}
        />
      )}
    </>
  );
}