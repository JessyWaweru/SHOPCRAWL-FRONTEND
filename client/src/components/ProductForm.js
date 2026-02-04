import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faSave, faArrowLeft, faStore, faTag, 
    faImage, faAlignLeft, faBoxOpen
} from "@fortawesome/free-solid-svg-icons";

// --- IMPORT STYLES ---
import { productFormStyles } from "../styles/ProductFormStyles";

export default function ProductForm({
  handleSubmit,
  initialData,
  isUpdatePage = false,
  errorMsg = "",
  isSubmitting = false,
}) {
  
  // --- STATE ---
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    image: "",
    description: "", // Hidden field

    // Vendors
    amazon_price: 0, amazon_shipping: 0, amazon_days: 0, amazon_location: "", amazon_reviews: 0,
    jumia_price: 0, jumia_shipping: 0, jumia_days: 0, jumia_location: "", jumia_reviews: 0,
    kilimall_price: 0, kilimall_shipping: 0, kilimall_days: 0, kilimall_location: "", kilimall_reviews: 0,
    shopify_price: 0, shopify_shipping: 0, shopify_days: 0, shopify_location: "", shopify_reviews: 0,
  });

  // --- PRE-FILL ---
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    if (type === "number") {
        finalValue = value === "" ? "" : parseFloat(value);
    }
    setFormData({ ...formData, [name]: finalValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
        ...formData,
        description: formData.description || formData.about || "No description provided." 
    };
    handleSubmit(finalData);
  };

  // --- RENDER VENDOR HELPER ---
  const renderVendorSection = (vendorName, colorClass) => {
    const prefix = vendorName.toLowerCase(); 
    return (
      <div className={productFormStyles.vendorCard}>
        <h3 className={`${productFormStyles.vendorTitle} ${colorClass}`}>
          <FontAwesomeIcon icon={faStore} /> {vendorName}
        </h3>
        
        <div className={productFormStyles.vendorGrid}>
          {/* Price */}
          <div>
            <label className={productFormStyles.vendorLabel}>Price</label>
            <input type="number" name={`${prefix}_price`} value={formData[`${prefix}_price`]} onChange={handleChange} className={productFormStyles.inputField} placeholder="0" />
          </div>
          {/* Shipping */}
          <div>
            <label className={productFormStyles.vendorLabel}>Shipping</label>
            <input type="number" name={`${prefix}_shipping`} value={formData[`${prefix}_shipping`]} onChange={handleChange} className={productFormStyles.inputField} placeholder="0" />
          </div>
          {/* Days */}
          <div>
            <label className={productFormStyles.vendorLabel}>Days</label>
            <input type="number" name={`${prefix}_days`} value={formData[`${prefix}_days`]} onChange={handleChange} className={productFormStyles.inputField} placeholder="7" />
          </div>
          {/* Location */}
          <div>
            <label className={productFormStyles.vendorLabel}>Location</label>
            <input type="text" name={`${prefix}_location`} value={formData[`${prefix}_location`]} onChange={handleChange} className={productFormStyles.inputField} placeholder="Nairobi" />
          </div>
          {/* Rating */}
          <div>
            <label className={productFormStyles.vendorLabel}>Rating (0-10)</label>
            <input type="number" name={`${prefix}_reviews`} value={formData[`${prefix}_reviews`]} onChange={handleChange} step="0.1" max="10" className={productFormStyles.inputField} placeholder="4.5" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={productFormStyles.pageContainer}>
      
      {/* 1. HEADER */}
      <div className={productFormStyles.header}>
        <div className={productFormStyles.headerContent}>
            <div>
                <Link to="/products" className={productFormStyles.backLink}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
                </Link>
                <h1 className={productFormStyles.title}>
                    {isUpdatePage ? "Edit Product" : "Add New Product"}
                </h1>
                <p className={productFormStyles.subtitle}>
                    {isUpdatePage ? "Update details, pricing, and vendor info." : "Fill in the details below to list a new item."}
                </p>
            </div>
        </div>
      </div>

      {/* 2. MAIN FORM CONTAINER */}
      <div className={productFormStyles.formContainer}>
        
        {/* Error Banner */}
        {errorMsg && (
          <div className={productFormStyles.errorBanner}>
            <p className="font-bold">Something went wrong:</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={onSubmit}>
          
          {/* SECTION A: BASIC INFO */}
          <div className={productFormStyles.sectionCard}>
            <h2 className={productFormStyles.sectionTitle}>
                <FontAwesomeIcon icon={faBoxOpen} className="text-rose-600"/> 
                Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                    <label className={productFormStyles.label}>Product Name</label>
                    <div className={productFormStyles.inputWrapper}>
                        <FontAwesomeIcon icon={faTag} className={productFormStyles.inputIcon}/>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className={`${productFormStyles.inputField} ${productFormStyles.inputWithIcon}`} 
                            placeholder="e.g. iPhone 15 Pro" 
                            required 
                        />
                    </div>
                </div>
                {/* Image */}
                <div>
                    <label className={productFormStyles.label}>Image URL</label>
                    <div className={productFormStyles.inputWrapper}>
                        <FontAwesomeIcon icon={faImage} className={productFormStyles.inputIcon}/>
                        <input 
                            type="text" 
                            name="image" 
                            value={formData.image} 
                            onChange={handleChange} 
                            className={`${productFormStyles.inputField} ${productFormStyles.inputWithIcon}`} 
                            placeholder="https://..." 
                            required 
                        />
                    </div>
                </div>
            </div>

            {/* About */}
            <div>
                <label className={productFormStyles.label}>Description / About</label>
                <div className={productFormStyles.inputWrapper}>
                    <FontAwesomeIcon icon={faAlignLeft} className={productFormStyles.inputIcon}/>
                    <textarea 
                        name="about" 
                        value={formData.about} 
                        onChange={handleChange} 
                        className={`${productFormStyles.inputField} ${productFormStyles.inputWithIcon} h-32 resize-none`} 
                        placeholder="Detailed product description..." 
                        required 
                    />
                </div>
            </div>
          </div>

          {/* SECTION B: VENDORS */}
          <div className={productFormStyles.sectionCard}>
            <h2 className={productFormStyles.sectionTitle}>
                <FontAwesomeIcon icon={faStore} className="text-purple-600"/> 
                Vendor Pricing & Logistics
            </h2>
            <div className="space-y-6">
                {renderVendorSection("Amazon", "text-orange-500")}
                {renderVendorSection("Jumia", "text-black")}
                {renderVendorSection("Kilimall", "text-purple-600")}
                {renderVendorSection("Shopify", "text-green-600")}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className={productFormStyles.buttonWrapper}>
            <button
                type="submit"
                disabled={isSubmitting}
                className={`${productFormStyles.submitBtn} ${isSubmitting ? productFormStyles.btnDisabled : productFormStyles.btnActive}`}
            >
                {isSubmitting ? "Saving..." : (
                    <>
                        <FontAwesomeIcon icon={faSave} />
                        {isUpdatePage ? "Save Changes" : "Create Product"}
                    </>
                )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}