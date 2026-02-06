import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children, required }) => {
  // FIX 1: Lazy initialization. 
  // Read localStorage immediately so we don't think the user is logged out on refresh.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const navigate = useNavigate();

  // FIX 2: Handle the "Required" check in useEffect, not in the render body.
  // This prevents React warnings and potential navigation loops.
  useEffect(() => {
    if (!user && required) {
      navigate("/signIn");
    }
  }, [user, required, navigate]);

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Note: We pass 'required' just in case, though usually not needed by consumers
  return (
    <AuthContext.Provider value={{ user, setUser, logOut, required }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);