import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../providers/Auth.provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHouse, faShoppingCart, faHistory, faShoppingBag, 
    faSignInAlt, faUserPlus, faSignOutAlt, faPlusCircle, 
    faTimes, faBars, faXmark 
} from '@fortawesome/free-solid-svg-icons';

// --- IMPORT STYLES ---
import { navbarStyles } from "../styles/NavbarStyles";

function Navbar() {
  const auth = useAuthContext();
  const user = auth?.user;
  const isAuth = !!user;
  const navigate = useNavigate();
  const location = useLocation(); 

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoutClick = () => setShowLogoutConfirm(true);
  const cancelLogout = () => setShowLogoutConfirm(false);

  const confirmLogout = () => {
    auth.logOut();
    setShowLogoutConfirm(false);
    setIsMobileMenuOpen(false);
    navigate("/");
    toast.info("Logged out successfully");
  };

  const handleHistoryClick = (e) => {
    if (!isAuth) {
      if (e && e.preventDefault) e.preventDefault(); 
      toast.info("Please login to save your Search History!");
      navigate("/signIn");
    }
    setIsMobileMenuOpen(false);
  };

  // --- HELPER COMPONENT: NAV ITEM ---
  const NavItem = ({ to, icon, label, onClick, isButton = false, isOutline = false, bgColor = "bg-rose-600" }) => {
    const isActive = location.pathname === to;
    
    // Combine base style with conditional style
    let containerClass = navbarStyles.navItemBase;
    
    if (isButton) {
        containerClass += ` ${navbarStyles.navItemButton} ${bgColor}`;
    } else if (isOutline) {
        containerClass += ` ${navbarStyles.navItemOutline}`;
    } else if (isActive) {
        containerClass += ` ${navbarStyles.navItemActive}`;
    } else {
        containerClass += ` ${navbarStyles.navItemDefault}`;
    }

    return (
        <li>
            <Link 
                to={to} 
                onClick={(e) => { 
                    if(onClick) onClick(e); 
                    setIsMobileMenuOpen(false); 
                }} 
                className={containerClass}
            >
                <FontAwesomeIcon icon={icon} className={navbarStyles.navIcon} />
                <span>{label}</span>
            </Link>
        </li>
    );
  };

  return (
    <nav className={navbarStyles.container}>
      <ToastContainer position="top-center" theme="colored"/>
      
      <div className={navbarStyles.innerWrapper}>
        
        {/* LOGO */}
        <Link to="/" className={navbarStyles.logoLink}>
             <div className={navbarStyles.logoBox}>
                <FontAwesomeIcon icon={faShoppingBag} className="text-xl"/>
             </div>
             <span className={navbarStyles.logoText}>
                Shopcrawl
             </span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className={navbarStyles.desktopMenu}>
           <NavItem to="/" icon={faHouse} label="Home" />
           <NavItem to="/products" icon={faShoppingCart} label="Products" />
           <NavItem to="/cart" icon={faHistory} label="History" onClick={handleHistoryClick} />
        </ul>

        {/* AUTH BUTTONS (Right Side) */}
        <div className={navbarStyles.authWrapper}>
           {isAuth ? (
             <>
               {user.admin && (
                   <NavItem to="/addProduct" icon={faPlusCircle} label="Add" isOutline={true} />
               )}

               {!showLogoutConfirm ? (
                   <button onClick={handleLogoutClick} className={navbarStyles.logoutBtn}>
                       <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                   </button>
               ) : (
                   <div className={navbarStyles.confirmBox}>
                       <button onClick={cancelLogout} className={navbarStyles.cancelBtn}>
                           <FontAwesomeIcon icon={faTimes} />
                       </button>
                       <button onClick={confirmLogout} className={navbarStyles.confirmBtn}>
                           Confirm
                       </button>
                   </div>
               )}
             </>
           ) : (
             <>
                <NavItem to="/signIn" icon={faSignInAlt} label="Login" />
                <NavItem to="/signUp" icon={faUserPlus} label="Join" isButton={true} />
             </>
           )}
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button 
            className={navbarStyles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
        </button>

      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
          <div className={navbarStyles.mobileDrawer}>
               <NavItem to="/" icon={faHouse} label="Home" />
               <NavItem to="/products" icon={faShoppingCart} label="Products" />
               <NavItem to="/cart" icon={faHistory} label="Search History" onClick={handleHistoryClick} />
               
               <hr className={navbarStyles.mobileDivider} />
               
               {isAuth ? (
                   <>
                        {user.admin && (
                             <NavItem to="/addProduct" icon={faPlusCircle} label="Add Product" isOutline={true} />
                        )}
                        <button onClick={confirmLogout} className={navbarStyles.mobileLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </button>
                   </>
               ) : (
                   <div className={navbarStyles.mobileAuthGrid}>
                        <Link to="/signIn" onClick={() => setIsMobileMenuOpen(false)} className={navbarStyles.mobileLoginBtn}>
                            <FontAwesomeIcon icon={faSignInAlt} /> Login
                        </Link>
                        <Link to="/signUp" onClick={() => setIsMobileMenuOpen(false)} className={navbarStyles.mobileJoinBtn}>
                            <FontAwesomeIcon icon={faUserPlus} /> Join
                        </Link>
                   </div>
               )}
          </div>
      )}

    </nav>
  );
}

export default Navbar;