import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../providers/Auth.provider";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEnvelope, 
    faLock, 
    faArrowRight, 
    faShoppingBag, 
    faEye, 
    faEyeSlash,
    faSignInAlt
} from '@fortawesome/free-solid-svg-icons';

// --- IMPORT STYLES ---
import { authStyles } from "../styles/AuthStyles";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setUser } = useAuthContext(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) localStorage.setItem("token", data.token);
        const userData = data.user || data; 
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        
        toast.success("Welcome back!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(data.error || "Invalid email or password.");
        setIsLoading(false);
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error("Server connection failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className={authStyles.container}>
      <ToastContainer position="top-center" theme="colored" />
      
      <div className={authStyles.card}>
        
        {/* --- LEFT SIDE: BRANDING --- */}
        <div className={authStyles.brandSection}>
            <div className={authStyles.brandPattern}></div>
            
            {/* Logo Area */}
            <div className={authStyles.brandContent}>
                <div className="flex flex-col items-center text-center text-white mb-8">
                    <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md mb-6 shadow-inner">
                        <FontAwesomeIcon icon={faShoppingBag} className="text-4xl"/>
                    </div>
                    <span className="text-3xl font-extrabold tracking-tight">Shopcrawl.</span>
                </div>
            </div>
            
            {/* Text Area (Centered) */}
            <div className={`${authStyles.brandContent} text-center`}>
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                    Smart Shopping <br/> Starts Here.
                </h2>
                <p className={authStyles.quote}>
                    "Join thousands of shoppers saving money every day with our AI-powered store comparison engine."
                </p>
            </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className={authStyles.formSection}>
            
            {/* Mobile Logo (Visible only on small screens) */}
            <div className="md:hidden mb-6 flex items-center justify-center text-rose-600">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <FontAwesomeIcon icon={faShoppingBag} /> Shopcrawl
                </h1>
            </div>

            <div className="mb-8">
                <h3 className={authStyles.headerTitle}>Welcome Back</h3>
                <p className={authStyles.headerSub}>Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit}>
                
                {/* Email Field */}
                <div className={authStyles.inputGroup}>
                    <label className={authStyles.label}>Email Address</label>
                    <div className={authStyles.inputWrapper}>
                        <FontAwesomeIcon icon={faEnvelope} className={authStyles.inputIcon} />
                        <input 
                            type="email" 
                            className={authStyles.inputField} 
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className={authStyles.inputGroup}>
                    <label className={authStyles.label}>Password</label>
                    <div className={authStyles.inputWrapper}>
                        <FontAwesomeIcon icon={faLock} className={authStyles.inputIcon} />
                        
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className={authStyles.inputField} 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {/* Toggle Icon */}
                        <FontAwesomeIcon 
                            icon={showPassword ? faEyeSlash : faEye} 
                            className={authStyles.eyeIcon}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    
                    {/* Forgot Password Link (Below Input) */}
                    <Link to="/reset-password" className={authStyles.forgotPass}>
                        Forgot password?
                    </Link>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={isLoading} 
                    className={isLoading ? authStyles.btnDisabled : authStyles.btnPrimary}
                >
                    {isLoading ? "Signing In..." : (
                        <>Sign In <FontAwesomeIcon icon={faSignInAlt} /></>
                    )}
                </button>
            </form>

            {/* Footer */}
            <p className={authStyles.footerText}>
                Don't have an account?{" "}
                <Link to="/signup" className={authStyles.linkText}>
                    Create free account
                </Link>
            </p>
        </div>

      </div>
    </div>
  );
}

export default SignIn;