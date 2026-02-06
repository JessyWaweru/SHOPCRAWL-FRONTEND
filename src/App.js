import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Home from "./components/Home";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import SignUpAdmin from "./components/signUpAdmin";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import ProductsHome from "./components/ProductsHome";
import ProductsList from "./components/ProductsList";
import Cart from "./components/Cart";
import UpdateProduct from "./components/updateProduct";
import AddProduct from "./components/AddProduct"; // IMPORTED NEW FILE
import ResetPassword from "./components/reset";

// Providers
import AuthProvider from "./providers/Auth.provider";
import { CartProvider } from "./components/CartProvider";

// Route Helpers
const SecureRoute = (Component) => {
  return (
    <AuthProvider required={true}>
      <Navbar />
      <Component />
    </AuthProvider>
  );
};

const BaseRoute = (Component) => {
  return (
    <AuthProvider required={false}>
      <Navbar />
      <Component />
    </AuthProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={BaseRoute(Home)} />
          <Route path="/signIn" element={BaseRoute(SignIn)} />
          <Route path="/signUp" element={BaseRoute(SignUp)} />
          <Route path="/reset-password" element={BaseRoute(ResetPassword)} />
          <Route path="/signUpAdmin" element={BaseRoute(SignUpAdmin)} />
          <Route path="/products" element={BaseRoute(ProductsList)} />
          <Route path="/ProductsHome" element={BaseRoute(ProductsHome)} />
          <Route path="/ProductsList" element={BaseRoute(ProductsList)} />
          <Route path="/ProductDetails/:id" element={BaseRoute(ProductDetails)} />
          <Route path="/reset" element={BaseRoute(ResetPassword)} />

          {/* Protected Routes (Login Required) */}
          <Route path="/cart" element={SecureRoute(Cart)} />
          <Route path="/updateProduct/:id" element={SecureRoute(UpdateProduct)} />
          
          <Route path="/products/:id" element={BaseRoute(ProductDetails)} />

          {/* NEW ROUTE: Add Product */}
          <Route path="/addProduct" element={SecureRoute(AddProduct)} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;