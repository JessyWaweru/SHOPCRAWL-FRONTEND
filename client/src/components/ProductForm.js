import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft, faStore, faStar } from "@fortawesome/free-solid-svg-icons";

export default function ProductForm({
  handleSubmit,
  initialData,
  isUpdatePage = false,
  errorMsg = "",
  isSubmitting = false,
}) {
  // 1. INITIAL STATE
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    image: "",
    description: "", // Hidden field required by backend

    // Amazon
    amazon_price: 0,
    amazon_shipping: 0,
    amazon_days: 0,
    amazon_location: "",
    amazon_reviews: 0,

    // Jumia
    jumia_price: 0,
    jumia_shipping: 0,
    jumia_days: 0,
    jumia_location: "",
    jumia_reviews: 0,

    // Kilimall
    kilimall_price: 0,
    kilimall_shipping: 0,
    kilimall_days: 0,
    kilimall_location: "",
    kilimall_reviews: 0,

    // Shopify
    shopify_price: 0,
    shopify_shipping: 0,
    shopify_days: 0,
    shopify_location: "",
    shopify_reviews: 0,
  });

  // 2. PRE-FILL LOGIC
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  // 3. HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;

    // Handle numbers: keep empty string for editing, otherwise parse
    if (type === "number") {
        finalValue = value === "" ? "" : parseFloat(value);
    }

    setFormData({ ...formData, [name]: finalValue });
  };

  // 4. SUBMIT
 const onSubmit = (e) => {
    e.preventDefault();

    // The backend requires 'description', but we hid the input.
    // So we assume Description is the same as About.
    const finalData = {
        ...formData,
        description: formData.description || formData.about || "No description provided." 
    };

    handleSubmit(finalData);
  };

  // --- RENDER VENDOR SECTION ---
  const renderVendorSection = (vendorName, colorClass) => {
    const prefix = vendorName.toLowerCase(); 
    
    return (
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
        <h3 className={`text-xl font-bold mb-4 uppercase flex items-center gap-2 ${colorClass}`}>
          <FontAwesomeIcon icon={faStore} /> {vendorName}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Price */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2 uppercase">Price (KES)</label>
            <input
              type="number"
              name={`${prefix}_price`}
              value={formData[`${prefix}_price`]}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="0"
            />
          </div>

          {/* Shipping Cost */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2 uppercase">Shipping Cost</label>
            <input
              type="number"
              name={`${prefix}_shipping`}
              value={formData[`${prefix}_shipping`]}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="0"
            />
          </div>

          {/* Delivery Days */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2 uppercase">Delivery Days</label>
            <input
              type="number"
              name={`${prefix}_days`}
              value={formData[`${prefix}_days`]}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="0"
            />
          </div>

          {/* Location (Manual Input) */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2 uppercase">Location</label>
            <input
              type="text"
              name={`${prefix}_location`}
              value={formData[`${prefix}_location`]}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="e.g. Nairobi CBD"
            />
          </div>

          {/* Average Reviews (0 - 10) */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2 uppercase flex items-center gap-1">
                Average Rating <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs"/>
            </label>
            <input
              type="number"
              name={`${prefix}_reviews`}
              value={formData[`${prefix}_reviews`]}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="10" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="0.0 - 10.0"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-900 p-6 flex justify-between items-center text-white">
          <Link to="/products" className="text-gray-300 hover:text-white transition flex items-center gap-2">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Link>
          <h1 className="text-2xl font-bold">
            {isUpdatePage ? "Update Product" : "Add New Product"}
          </h1>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-6 rounded shadow-sm">
            <p className="font-bold">Error</p>
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="p-8">
          
          {/* --- BASIC INFO SECTION --- */}
          <div className="mb-8 bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Basic Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                        required
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">About / Description</label>
                <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none h-24 resize-none"
                    placeholder="Brief summary of the product..."
                    required
                />
            </div>
          </div>

          {/* --- VENDOR SECTIONS --- */}
          <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Vendor Pricing & Details</h2>
          
          {renderVendorSection("Amazon", "text-orange-500")}
          {renderVendorSection("Jumia", "text-black")}
          {renderVendorSection("Kilimall", "text-purple-600")}
          {renderVendorSection("Shopify", "text-green-600")}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-rose-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-rose-700 transition transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 text-lg ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
             {isSubmitting ? "Processing..." : (
                 <>
                    <FontAwesomeIcon icon={faSave} />
                    {isUpdatePage ? "Save Changes" : "Create Product"}
                 </>
             )}
          </button>

        </form>
      </div>
    </div>
  );
}