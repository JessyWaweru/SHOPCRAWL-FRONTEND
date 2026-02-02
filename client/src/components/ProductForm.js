import React, { useState, useEffect } from "react";

export default function ProductForm({
  isUpdatePage = false,
  productData = undefined,
  errorMsg,
  handleSubmit,
}) {
  // --- 1. Basic Product State ---
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(productData?.description || "");
  const [about, setAbout] = useState(productData?.about || "");
  const [image, setImage] = useState(productData?.image || "");

  // --- 2. Vendor State (Nested Objects) ---
  // We define a default empty structure for a vendor
  const defaultVendor = {
    price: "",
    shipping_cost: "",
    days_to_ship: "",
    review: "",
    product_location: "",
  };

  // We initialize state with existing data OR the default empty structure
  const [amazon, setAmazon] = useState(productData?.amazon || defaultVendor);
  const [jumia, setJumia] = useState(productData?.jumia || defaultVendor);
  const [kilimall, setKilimall] = useState(productData?.kilimall || defaultVendor);
  const [shopify, setShopify] = useState(productData?.shopify || defaultVendor);

  // --- 3. Helper to update nested vendor state ---
  const handleVendorChange = (vendorName, field, value) => {
    // Determine which setter to use based on vendorName
    let setVendor;
    let currentVendorData;

    switch (vendorName) {
      case "amazon":
        setVendor = setAmazon;
        currentVendorData = amazon;
        break;
      case "jumia":
        setVendor = setJumia;
        currentVendorData = jumia;
        break;
      case "kilimall":
        setVendor = setKilimall;
        currentVendorData = kilimall;
        break;
      case "shopify":
        setVendor = setShopify;
        currentVendorData = shopify;
        break;
      default:
        return;
    }

    // Update the specific field while keeping other fields intact
    setVendor({
      ...currentVendorData,
      [field]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    // --- 4. Construct the Nested JSON Object for Django ---
    const newProduct = {
      name,
      description,
      about,
      image,
      // Django expects these keys to be objects containing price, shipping, etc.
      amazon: amazon,
      jumia: jumia, 
      kilimall: kilimall,
      shopify: shopify,
    };
    
    handleSubmit(newProduct);
  };

  // --- 5. Helper Component to Render Inputs DRY (Don't Repeat Yourself) ---
  const renderVendorInputs = (vendorName, vendorData) => (
    <div className="border p-4 rounded-lg bg-gray-50 mb-4">
      <h3 className="text-xl font-bold uppercase text-gray-700 mb-2 border-b border-gray-300 pb-1">
        {vendorName} Details
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={vendorData.price}
            onChange={(e) => handleVendorChange(vendorName, "price", e.target.value)}
            className="border rounded w-full p-2"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Shipping Cost</label>
          <input
            type="number"
            value={vendorData.shipping_cost}
            onChange={(e) => handleVendorChange(vendorName, "shipping_cost", e.target.value)}
            className="border rounded w-full p-2"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Days to Ship</label>
          <input
            type="number"
            value={vendorData.days_to_ship}
            onChange={(e) => handleVendorChange(vendorName, "days_to_ship", e.target.value)}
            className="border rounded w-full p-2"
            placeholder="e.g. 5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Review (1-10)</label>
          <input
            type="number"
            value={vendorData.review}
            onChange={(e) => handleVendorChange(vendorName, "review", e.target.value)}
            className="border rounded w-full p-2"
            placeholder="e.g. 8"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Product Location</label>
          <input
            type="text"
            value={vendorData.product_location}
            onChange={(e) => handleVendorChange(vendorName, "product_location", e.target.value)}
            className="border rounded w-full p-2"
            placeholder="e.g. Westlands"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen mb-5 mt-10">
      <form
        onSubmit={onSubmit}
        className="w-3/4 border rounded-lg shadow-lg p-6 flex flex-col gap-6 bg-white"
      >
        <h1 className="text-center text-3xl text-rose-600 uppercase font-bold">
          {isUpdatePage ? "Update Product" : "Create New Product"}
        </h1>
        
        {errorMsg && (
          <p className="text-center text-xl text-red-500 bg-red-100 p-2 rounded">
            {errorMsg}
          </p>
        )}

        {/* --- General Details Section --- */}
        <div className="space-y-4">
            <h2 className="text-2xl text-gray-800 font-semibold">General Info</h2>
            <div>
            <label className="font-bold">Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg w-full p-3 text-gray-700"
                required
            />
            </div>
            <div>
            <label className="font-bold">Image URL</label>
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border rounded-lg w-full p-3 text-gray-700"
            />
            </div>
            <div>
            <label className="font-bold">Description</label>
            <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-lg w-full p-3 text-gray-700"
            />
            </div>
            <div>
            <label className="font-bold">About (Short Summary)</label>
            <input
                type="text"
                className="border rounded-lg w-full p-3 text-gray-700"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
            />
            </div>
        </div>

        {/* --- Vendor Details Sections --- */}
        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Vendor Pricing</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {renderVendorInputs("amazon", amazon)}
            {renderVendorInputs("jumia", jumia)}
            {renderVendorInputs("kilimall", kilimall)}
            {renderVendorInputs("shopify", shopify)}
        </div>

        <button
          type="submit"
          className="bg-rose-600 rounded-lg w-1/2 p-3 mt-4 text-white hover:opacity-80 m-auto font-bold text-lg shadow-md"
        >
          {isUpdatePage ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}