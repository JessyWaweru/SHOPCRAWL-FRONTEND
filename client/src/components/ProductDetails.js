import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/Auth.provider"; 
import { CartContext } from "./CartProvider";
import Table from "./Table"; 
import DeleteModal from "./DeleteModal"; 

// Icons & Toasts
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrophy, faArrowLeft, faUserShield, faEdit, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

// --- IMPORT STYLES ---
import { detailsStyles } from "../styles/ProductDetailsStyles";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  
  const { user } = useAuthContext(); 
  const { cart } = useContext(CartContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // --- 1. FETCH PRODUCT ---
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((response) => {
          if (!response.ok) throw new Error("Product not found");
          return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  // --- 2. SAVE HISTORY ---
  useEffect(() => {
    if (product && user) {
        const token = localStorage.getItem("token"); 
        fetch('http://127.0.0.1:8000/api/history/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` 
            },
            body: JSON.stringify({ product_id: id })
        }).catch(err => console.error("History save failed", err));
    }
  }, [id, product, user]);

  // --- 3. CHECK ADMIN ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.admin === true) {
      setIsAdmin(true);
    }
  }, []);

  // --- 4. DELETE LOGIC ---
  const handleDeleteClick = () => setIsDeleteModalOpen(true);

  const confirmDelete = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
        });

        if (response.ok) {
            toast.success("Product deleted successfully!");
            setIsDeleteModalOpen(false);
            setTimeout(() => navigate("/products"), 1500); 
        } else {
            toast.error("Failed to delete product.");
            setIsDeleteModalOpen(false);
        }
    } catch (error) {
        toast.error("Server error occurred.");
        setIsDeleteModalOpen(false);
    }
  };

  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-rose-600 mb-4" />
        <p className="text-gray-500 font-bold">Loading Details...</p>
    </div>
  );

  return (
    <div className={detailsStyles.pageContainer}>
        <ToastContainer position="top-center" theme="colored" />
        
        {/* --- HEADER --- */}
        <div className={detailsStyles.headerContainer}>
            <div className={detailsStyles.headerBgDecoration}></div>
            
            <Link to="/products" className={detailsStyles.backLink}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Products
            </Link>

            <div className={detailsStyles.headerContent}>
                <h1 className={detailsStyles.title}>{product.name}</h1>
                <p className={detailsStyles.subtitle}>
                    {product.about || (product.description ? product.description.substring(0, 100) + "..." : "Compare prices across top vendors.")}
                </p>
            </div>
        </div>

        {/* --- MAIN CONTENT CARD --- */}
        <div className={detailsStyles.mainWrapper}>
            <div className={detailsStyles.cardBody}>
                <div className={detailsStyles.contentGrid}>
                    
                    {/* LEFT: IMAGE */}
                    <div className={detailsStyles.imageSection}>
                        <img
                            src={product.image || "https://via.placeholder.com/400"}
                            alt={product.name}
                            className={detailsStyles.productImage}
                        />
                    </div>

                    {/* RIGHT: INFO & TABLE */}
                    <div className={detailsStyles.infoSection}>
                        
                        {/* ADMIN PANEL */}
                        {isAdmin && (
                            <div className={detailsStyles.adminPanel}>
                                <div className={detailsStyles.adminLabel}>
                                    <FontAwesomeIcon icon={faUserShield} className="text-rose-600 text-lg"/>
                                    Admin Controls
                                </div>
                                <div className={detailsStyles.btnGroup}>
                                    <Link to={`/updateProduct/${id}`}>
                                        <button className={detailsStyles.btnUpdate}>
                                            <FontAwesomeIcon icon={faEdit} className="mr-2"/> Update
                                        </button>
                                    </Link>
                                    <button onClick={handleDeleteClick} className={detailsStyles.btnDelete}>
                                        <FontAwesomeIcon icon={faTrash} className="mr-2"/> Delete
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* DESCRIPTION */}
                        <div>
                            <div className={detailsStyles.sectionHeader}>
                                <div className={`${detailsStyles.iconCircle} bg-rose-100 text-rose-600`}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                </div>
                                <h3 className={detailsStyles.sectionTitle}>Product Overview</h3>
                            </div>
                            <p className={detailsStyles.textBlock}>
                                {product.description || "No detailed description available for this product."}
                            </p>
                        </div>

                        <hr className="border-gray-100" />

                        {/* SMARTRANK TABLE */}
                        <div>
                            <div className={detailsStyles.sectionHeader}>
                                <div className={`${detailsStyles.iconCircle} bg-yellow-100 text-yellow-600`}>
                                    <FontAwesomeIcon icon={faTrophy} />
                                </div>
                                <h3 className={detailsStyles.sectionTitle}>SmartRank™ Comparison</h3>
                            </div>
                            
                            {/* Insert Table Component */}
                            <div className="w-full overflow-hidden rounded-xl border border-gray-200">
                                <Table product={product} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        {/* --- DELETE MODAL --- */}
        <DeleteModal 
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title="Delete Product?"
            message={`Are you sure you want to permanently delete "${product.name}"?`}
        />
    </div>
  );
}

export default ProductDetails;