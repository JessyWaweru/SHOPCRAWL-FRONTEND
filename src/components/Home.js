import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../providers/Auth.provider";
import Highlights from "./Highlights";
import ProductsHome from "./ProductsHome";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserShield, 
    faUnlockAlt, 
    faPlusCircle, 
    faArrowRight, 
    faShoppingBag 
} from '@fortawesome/free-solid-svg-icons';

// Styles
import { homeStyles } from "../styles/HomeStyles";

function Home() {
  const auth = useAuthContext();
  const user = auth?.user;
  const isAdmin = user?.admin === true;

  return (
    <div>
      {/* --- HERO SECTION --- */}
      <div className={homeStyles.heroContainer}>
        
        {/* 1. NEW GRADIENT BACKGROUND (Replaces the Photo) */}
        <div className={homeStyles.bgImageWrapper}>
            {/* These blobs create the glowing "Tech" effect */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px]"></div>
        </div>

        {/* 2. CONTENT OVERLAY */}
        <div className={homeStyles.overlay}>
          
          {/* ---------------- ADMIN VIEW ---------------- */}
          {isAdmin ? (
            <div className="animate-fade-in-up z-10">
                
                {/* Glass Badge */}
                <div className={homeStyles.adminBadge}>
                    <FontAwesomeIcon icon={faUserShield} />
                    Admin Control Panel
                </div>

                <h1 className={homeStyles.heroTitle}>
                    Welcome, <br/>
                    <span className="text-white">Admin</span>
                </h1>
                
                <div className="mt-8 space-y-4 border-l-4 border-rose-600 pl-6">
                    <h3 className={homeStyles.adminSubHeading}>
                        <FontAwesomeIcon icon={faUnlockAlt} className="text-rose-500" />
                        Manage Database Records
                    </h3>
                    <h3 className={homeStyles.adminSubHeading}>
                        <FontAwesomeIcon icon={faUnlockAlt} className="text-rose-500" />
                        Update & Delete Products
                    </h3>
                    
                    <Link to="/addProduct">
                        <button className={homeStyles.btnPrimary}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            Add New Product
                        </button>
                    </Link>
                </div>
            </div>
          ) : (
            
            /* ---------------- CUSTOMER VIEW ---------------- */
            <div className="animate-fade-in-up z-10">
              <h1 className={homeStyles.heroTitle}>
                Compare Prices. <br />
                <span className={homeStyles.brandSpan}>Save Money.</span>
              </h1>
              
              <p className={homeStyles.heroSubtitle}>
                Discover the smartest way to shop online. Shopcrawl tracks real-time prices across Amazon, Jumia, and more to find you the best deals instantly.
              </p>
            
              <div className="mt-10">
                {!user ? (
                    <Link to="/signIn">
                        <button className={homeStyles.btnPrimary}>
                            Get Started 
                            <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                ) : (
                    <Link to="/products">
                        <button className={homeStyles.btnPrimary}>
                            <FontAwesomeIcon icon={faShoppingBag} />
                            Start Shopping
                        </button>
                    </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- SECTIONS BELOW HERO --- */}
      <Highlights />
      <ProductsHome />
    </div>
  );
}

export default Home;