import React, { useState } from "react"; // Added useState
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/Auth.provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHouse, 
    faShoppingCart, 
    faHistory, 
    faShoppingBag, 
    faSignInAlt, 
    faUserPlus, 
    faSignOutAlt,
    faPlusCircle,
    faCheck,  // New Icon
    faTimes   // New Icon
} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const auth = useAuthContext();
  const user = auth?.user;
  const isAuth = !!user;
  const navigate = useNavigate();

  // New State for Logout Confirmation
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // 1. Initial Click triggers the confirmation view
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // 2. Actual Logout Action
  const confirmLogout = () => {
    auth.logOut();
    setShowLogoutConfirm(false);
    navigate("/");
    toast.info("Logged out successfully");
  };

  // 3. Cancel Action
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleHistoryClick = (e) => {
    if (!isAuth) {
      e.preventDefault(); 
      toast.info("Please login to save your Search History!");
      navigate("/signIn");
    }
  };

  // Helper component for the "Slide Reveal" links
  const NavItem = ({ to, icon, label, onClick, isButton = false, isOutline = false, bgColor = "bg-rose-600" }) => {
    let baseClass = "group flex items-center cursor-pointer rounded-full transition-all duration-300 ease-in-out p-3";
    let iconClass = "text-xl transition-colors duration-300";
    let textClass = "max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 font-bold";

    if (isButton) {
        baseClass += ` ${bgColor} text-white hover:opacity-90 shadow-md hover:shadow-lg`;
        iconClass += " text-white";
    } else if (isOutline) {
        baseClass += " border-2 border-rose-600 text-rose-600 hover:bg-rose-50";
        iconClass += " text-rose-600";
    } else {
        baseClass += " hover:bg-gray-100 text-gray-600 hover:text-rose-600";
        iconClass += " group-hover:text-rose-600";
    }

    return (
        <li>
            <Link to={to} onClick={onClick} className={baseClass}>
                <FontAwesomeIcon icon={icon} className={iconClass} />
                <span className={textClass}>{label}</span>
            </Link>
        </li>
    );
  };

  return (
    <nav className="relative flex items-center justify-between bg-white h-24 w-full px-10 shadow-md sticky top-0 z-50">
      <ToastContainer position="top-center" />

      {/* CENTERED LOGO */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="p-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <Link to="/">
                <h3 className="text-2xl font-bold text-white text-center mb-0 flex items-center gap-2 px-2">
                    <FontAwesomeIcon icon={faShoppingBag} className="fa-solid"/>
                    <span className="hidden md:inline">Shopcrawl</span>
                </h3>
            </Link>
        </div>
      </div>
      
      <div className="flex-1"></div>

      {/* RIGHT NAVIGATION */}
      <div>
        <ul className="flex gap-4 items-center">
          
          <NavItem to="/" icon={faHouse} label="Home" />
          
          <NavItem to="/products" icon={faShoppingCart} label="Products" />
          
          <NavItem 
            to="/cart" 
            icon={faHistory} 
            label="Search History" 
            onClick={handleHistoryClick} 
          />

          {isAuth ? (
            <>
              {user.admin === true && (
                 <NavItem 
                    to="/addProduct" 
                    icon={faPlusCircle} 
                    label="Add Product" 
                    isOutline={true}
                 />
              )}
              
              {/* LOGOUT LOGIC */}
              {!showLogoutConfirm ? (
                // State A: Normal Logout Button
                <li onClick={handleLogoutClick} className="group flex items-center cursor-pointer rounded-full transition-all duration-300 ease-in-out p-3 bg-rose-600 text-white hover:bg-rose-700 shadow-md">
                   <FontAwesomeIcon icon={faSignOutAlt} className="text-xl" />
                   <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 font-bold">
                      Logout
                   </span>
                </li>
              ) : (
                // State B: Confirmation Buttons (Slide in from right)
                <div className="flex gap-2 animate-fade-in-left">
                    <button 
                        onClick={cancelLogout}
                        className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
                        title="Cancel"
                    >
                        <FontAwesomeIcon icon={faTimes} className="text-xl" />
                    </button>
                    <button 
                        onClick={confirmLogout}
                        className="flex items-center gap-2 p-3 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-inner transition font-bold px-4"
                        title="Confirm Logout"
                    >
                        <FontAwesomeIcon icon={faCheck} className="text-xl" />
                        <span>Sure?</span>
                    </button>
                </div>
              )}
            </>
          ) : (
            <>
              <NavItem to="/signIn" icon={faSignInAlt} label="Login" />
              <NavItem to="/signUp" icon={faUserPlus} label="Signup" isButton={true} />
              <NavItem 
                to="/signUpAdmin" 
                icon={faUserPlus} 
                label="Admin" 
                isButton={true} 
                bgColor="bg-gray-900" 
              />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;