import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from '../config';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowLeft, 
    faLock, 
    faEnvelope, 
    faKey, 
    faShieldAlt,
    faShoppingBag,
    faEye,       
    faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

// --- IMPORT STYLES ---
import { authStyles } from "../styles/AuthStyles";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [recoveryPin, setRecoveryPin] = useState("");
  const [password, setPassword] = useState("");
  
  // Visibility States
  const [showPin, setShowPin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // 1. Fetch Users to find the matching email
      // (In a real app, you would have a specific endpoint like /api/check-email)
      const response = await fetch(`${API_URL}/api/users/`);
      
      if (!response.ok) throw new Error("Could not connect to server");
      
      const data = await response.json();
      
      // 2. Find User by Email
      const user = data.find((u) => u.email === email);

      if (user) {
        
        // --- 3. VERIFICATION STEP ---
        // Compare the typed PIN with the one in the database
        // We cast both to String to avoid type mismatch errors (e.g. 1234 vs "1234")
        if (String(user.recovery_pin) !== String(recoveryPin)) {
             toast.error("Invalid Recovery PIN. Identity could not be verified.");
             setIsLoading(false);
             return; 
        }

        // 4. Update Password (PATCH request)
        // Now that serializers.py is fixed, this 'password' will be hashed properly.
        const updateResponse = await fetch(`${API_URL}/api/users/${user.id}/`, {
            method: 'PATCH',
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password 
            })
        });

        if (updateResponse.ok) {
          toast.success("Password reset successfully! Redirecting...");
          setEmail("");
          setRecoveryPin("");
          setPassword("");
          setTimeout(() => navigate("/signin"), 2000);
        } else {
          const errorData = await updateResponse.json();
          console.error("Update failed:", errorData);
          toast.error("Failed to update password. Server rejected the request.");
        }

      } else {
        toast.error("Email not found in our records.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Check your connection.");
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className={authStyles.container}>
      <ToastContainer position="top-center" theme="colored" />
      
      <div className={authStyles.card}>
        
        {/* --- LEFT SIDE: BRANDING --- */}
        <div className={authStyles.brandSection}>
            <div className={authStyles.brandPattern}></div>
            <div className={authStyles.brandContent}>
                <div className="flex items-center gap-3 text-white mb-8">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        <FontAwesomeIcon icon={faShoppingBag} className="text-2xl"/>
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight">Shopcrawl</span>
                </div>
            </div>
            <div className={authStyles.brandContent}>
                <h2 className="text-3xl font-bold mb-4">Secure Your Account.</h2>
                <p className={authStyles.quote}>
                    "Forgot your password? No problem. Use your unique Recovery PIN to get back in seconds."
                </p>
            </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className={authStyles.formSection}>
            <div className="mb-8">
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center mb-4 text-rose-600 text-xl">
                    <FontAwesomeIcon icon={faShieldAlt} />
                </div>
                <h2 className={authStyles.headerTitle}>Reset Password</h2>
                <p className={authStyles.headerSub}>
                    Enter your email and Recovery PIN to verify your identity.
                </p>
            </div>

            <form onSubmit={handleResetPassword}>
              
              {/* EMAIL */}
              <div className={authStyles.inputGroup}>
                 <label className={authStyles.label}>Email Address</label>
                 <div className={authStyles.inputWrapper}>
                    <FontAwesomeIcon icon={faEnvelope} className={authStyles.inputIcon} />
                    <input
                        type="email"
                        required
                        className={authStyles.inputField}
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                 </div>
              </div>

              {/* RECOVERY PIN */}
              <div className={authStyles.inputGroup}>
                 <label className={authStyles.label}>Recovery PIN</label>
                 <div className={authStyles.inputWrapper}>
                    <FontAwesomeIcon icon={faShieldAlt} className={authStyles.inputIcon} />
                    <input
                        type={showPin ? "text" : "password"} 
                        required
                        className={authStyles.inputField}
                        placeholder="e.g. 1234"
                        value={recoveryPin}
                        onChange={(e) => setRecoveryPin(e.target.value)}
                    />
                    {/* Eye Icon */}
                    <FontAwesomeIcon 
                        icon={showPin ? faEyeSlash : faEye} 
                        className={authStyles.eyeIcon}
                        onClick={() => setShowPin(!showPin)}
                    />
                 </div>
              </div>

              {/* NEW PASSWORD */}
              <div className={authStyles.inputGroup}>
                 <label className={authStyles.label}>New Password</label>
                 <div className={authStyles.inputWrapper}>
                    <FontAwesomeIcon icon={faKey} className={authStyles.inputIcon} />
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={4}
                        className={authStyles.inputField}
                        placeholder="New secure password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Eye Icon */}
                    <FontAwesomeIcon 
                        icon={showPassword ? faEyeSlash : faEye} 
                        className={authStyles.eyeIcon}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                 </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className={isLoading ? authStyles.btnDisabled : authStyles.btnPrimary}
              >
                {isLoading ? "Verifying..." : "Reset Password"}
              </button>

              {/* FOOTER */}
              <div className="mt-6 text-center">
                <Link to='/signin' className="text-gray-500 hover:text-rose-600 transition flex items-center justify-center gap-2 font-medium text-sm">
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to Login
                </Link>
              </div>

            </form>
        </div>
      </div>
    </div>
  );
}