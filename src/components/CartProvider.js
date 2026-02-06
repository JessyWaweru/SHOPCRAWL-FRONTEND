import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // UPDATED: Now set to 11 items
  const HISTORY_LIMIT = 11; 

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const isAlreadyThere = cart.some((item) => item.id === product.id);
    
    if (isAlreadyThere) {
        return; 
    }

    let newCart = [...cart, product];

    // Capping logic automatically adjusts to the new limit
    if (newCart.length > HISTORY_LIMIT) {
        newCart = newCart.slice(newCart.length - HISTORY_LIMIT);
    }

    setCart(newCart);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, HISTORY_LIMIT }}>
      {children}
    </CartContext.Provider>
  );
};