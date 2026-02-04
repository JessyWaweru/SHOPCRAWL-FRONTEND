import React from "react";
import Highlights from "./Highlights";
import { Link } from "react-router-dom";
import ProductsHome from "./ProductsHome";
import { useAuthContext } from "../providers/Auth.provider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserShield,   // Best for "Admin Account"
    faEdit,         // Edit / Update
    faTrash,        // Delete
    faPlusCircle,   // Add New Product
    faCog,          // Settings / Configuration
    faChartLine,    // Dashboard / Analytics
    faUnlockAlt     // Admin Access Granted
} from '@fortawesome/free-solid-svg-icons';

function Home() {
  const auth = useAuthContext();
  const user = auth?.user;
  
  // Simplified check: If user exists and admin is true
  const isAdmin = user?.admin === true;

  return (
    <div>
      <div className="h-screen relative">
        {/* Background Image/Video Container */}
        <div 
            className="h-full w-full flex items-center justify-end pr-40 bg-cover bg-center"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1570876050997-2fdefb00c004?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')`
            }}
        >
          {/* Note: Standard <video> tags need a direct link to an .mp4 file. 
              Vimeo player links usually require an <iframe> to work. 
              I've commented this out so the background image shows clearly. 
          */}
          {/* <video autoPlay muted loop className="h-5/6 hidden md:block">
            <source src="your-direct-video-link.mp4" type="video/mp4" />
          </video> 
          */}
        </div>

        {/* Text Overlay Content */}
        <div className="absolute top-0 left-0 h-full w-full flex flex-col pl-20 md:pl-40 justify-center gap-6 bg-black/40 text-white">
          
          {/* ---------------- ADMIN VIEW ---------------- */}
          {isAdmin ? (
            <div className="animate-fade-in-up">
             <h4 className="text-6xl font-semibold uppercase tracking-wide">
        
        <span className="text-white inline-flex items-center gap-4">
            <FontAwesomeIcon icon={faUserShield}  className="text-rose-600 " />
            ADMIN 
        </span>
    </h4>
              
              <div className="mt-8 space-y-4 border-l-4 border-rose-600 pl-6">
                <h3 className="text-2xl font-semibold uppercase">
                  
    <span className="text-white rounded-md flex items-center gap-1">
        <FontAwesomeIcon icon={faUnlockAlt} className="text-rose-500" />
      Fine tune the Database
    </span>

      </h3>
                <h3 className="text-2xl font-semibold uppercase">
                  <span className=" text-white rounded-md flex items-center gap-1">
        <FontAwesomeIcon icon={faUnlockAlt} className="text-rose-500" />
      with update and delete options
    </span>
                </h3>
                
                <Link to="/addProduct">
                    <button className="mt-4 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
                        <i className="fa-solid fa-plus-circle mr-2"></i>
                        Add New Product
                    </button>
                </Link>
              </div>
            </div>
          ) : (
            /* ---------------- CUSTOMER VIEW ---------------- */
            <div className="animate-fade-in-up">
              <h1 className="text-6xl font-semibold uppercase leading-tight">
                Welcome to<br />
                <span className="text-rose-600">SHOPCRAWL</span>
              </h1>
              <p className="text-xl md:text-2xl mt-4 max-w-lg font-light">
                Discover dynamic ways to view your online shopping experience.
                <br />
                Compare stores. Save money.
                <br />
                <span className="font-bold text-rose-400">SHOPCRAWL</span> has got you covered.
              </p>
            
              <div className="mt-10">
                {!user ? (
                    <Link to="/signIn">
                    <button className="bg-rose-600 rounded-full w-48 py-3 text-white font-bold text-lg hover:bg-rose-700 shadow-lg transition transform hover:scale-105">
                        Get Started <i className="fa-solid fa-arrow-right ml-2"></i>
                    </button>
                    </Link>
                ) : (
                    <Link to="/products">
                    <button className="bg-rose-600 rounded-full w-56 py-3 text-white font-bold text-lg hover:bg-rose-700 shadow-lg transition transform hover:scale-105">
                        <i className="fa-solid fa-shopping-bag mr-2"></i>
                        Start Shopping
                    </button>
                    </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Highlights />
      <ProductsHome />
    </div>
  );
}

export default Home;