import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Auth Context
import { useAuthContext } from "../providers/Auth.provider";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEnvelope, 
    faLock, 
    faShieldAlt, 
    faUserPlus,
    faShoppingBag,
    faEye,       
    faEyeSlash,
    faInfoCircle,
    faUserShield 
} from "@fortawesome/free-solid-svg-icons";

// --- IMPORT STYLES ---
import { authStyles } from "../styles/AuthStyles";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    recovery_pin: "",
    admin_code: "" 
  });

  // --- VISIBILITY STATES ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPin, setShowPin] = useState(false);
  
  // Toggle for showing the Admin Input field
  const [showAdminInput, setShowAdminInput] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setUser } = useAuthContext(); 

  // --- HANDLERS ---
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { password, password_confirmation, recovery_pin, email, admin_code } = formData;

    // --- 1. VALIDATION CHECKS ---
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    if (!isValidLength || !hasUpperCase || !hasNumber || !hasSymbol) {
        toast.error("Password too weak! Must have 8+ chars, 1 capital, 1 number & 1 symbol.");
        setIsLoading(false);
        return;
    }

    if (password !== password_confirmation) {
        toast.error("Passwords do not match!");
        setIsLoading(false);
        return;
    }

    if (recovery_pin.length < 4) {
        toast.error("Recovery PIN must be at least 4 digits.");
        setIsLoading(false);
        return;
    }

    // --- 2. ADMIN LOGIC ---
    const isAdmin = admin_code === "secret123";

    // --- 3. PREPARE DATA ---
    const userPayload = {
        // BACKEND COMPATIBILITY: 
        // Django's User model requires a unique 'username'. 
        // We map 'email' to 'username' to allow email-based login.
        username: email, 
        email: email,
        password: password,
        recovery_pin: recovery_pin,
        admin: isAdmin 
    };

    try {
      // --- STEP A: CREATE ACCOUNT ---
      const registerResponse = await fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });

      const data = await registerResponse.json();

      if (registerResponse.ok) {
        const successMsg = isAdmin ? "Admin Account Created!" : "Account Created!";
        toast.success(`${successMsg} Logging you in...`);

        // --- STEP B: AUTO-LOGIN ---
        try {
            const loginResponse = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const loginData = await loginResponse.json();

            if (loginResponse.ok) {
                if (loginData.token) localStorage.setItem("token", loginData.token);
                
                const userData = loginData.user || loginData;
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));

                setTimeout(() => navigate("/"), 1500);
            } else {
                toast.warning("Auto-login failed. Please sign in manually.");
                setTimeout(() => navigate("/signin"), 2000);
            }

        } catch (loginError) {
            console.error("Auto-login failed:", loginError);
            navigate("/signin");
        }

      } else {
        // --- IMPROVED ERROR HANDLING ---
        
        // Check for specific "Already Exists" errors from Django
        if (data.username && Array.isArray(data.username) && data.username[0].includes("already exists")) {
             toast.error("Account already exists! Please Login.");
        } 
        else if (data.email && Array.isArray(data.email) && data.email[0].includes("already exists")) {
             toast.error("This email is already taken. Try resetting your password.");
        } 
        else {
             // Fallback for other errors
             const errorMessage = data.detail || "Failed to create account.";
             toast.error(`Error: ${errorMessage}`);
        }
        setIsLoading(false);
      }

    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Server error. Please try again later.");
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
            <div className={authStyles.brandContent}>
                <div className="flex items-center gap-3 text-white mb-8">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        <FontAwesomeIcon icon={faShoppingBag} className="text-2xl"/>
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight">Shopcrawl</span>
                </div>
            </div>
            <div className={authStyles.brandContent}>
                <h2 className="text-3xl font-bold mb-4">Start Saving Today.</h2>
                <p className={authStyles.quote}>
                    "Join thousands of shoppers finding the best deals across Amazon, Jumia, and Kilimall instantly."
                </p>
            </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className={authStyles.formSection}>
            <div className="mb-6">
                <h2 className={authStyles.headerTitle}>Create Account</h2>
                <p className={authStyles.headerSub}>Fill in your details below to get started.</p>
            </div>

            <form onSubmit={handleSubmit}>
              
              {/* EMAIL */}
              <div className={authStyles.inputGroup}>
                 <label className={authStyles.label}>Email Address</label>
                 <div className={authStyles.inputWrapper}>
                    <FontAwesomeIcon icon={faEnvelope} className={authStyles.inputIcon} />
                    <input
                        name="email"
                        type="email"
                        required
                        className={authStyles.inputField}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                 </div>
              </div>

              {/* RECOVERY PIN */}
              <div className="mb-5 bg-blue-50 p-4 rounded-xl border border-blue-100">
                 <label className={`${authStyles.label} text-blue-800`}>
                    Recovery PIN <span className="font-normal opacity-70 text-xs">(Required for reset)</span>
                 </label>
                 <div className={authStyles.inputWrapper}>
                    <FontAwesomeIcon icon={faShieldAlt} className={`${authStyles.inputIcon} text-blue-400`} />
                    <input
                        name="recovery_pin"
                        type={showPin ? "text" : "password"}
                        required
                        maxLength="6"
                        className={`${authStyles.inputField} border-blue-200 focus:ring-blue-500`}
                        placeholder="e.g. 1234"
                        value={formData.recovery_pin}
                        onChange={handleChange}
                    />
                    <FontAwesomeIcon 
                        icon={showPin ? faEyeSlash : faEye} 
                        className={authStyles.eyeIcon}
                        onClick={() => setShowPin(!showPin)}
                    />
                 </div>
              </div>

              {/* PASSWORDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <div className={authStyles.inputGroup}>
                     <label className={authStyles.label}>Password</label>
                     <div className={authStyles.inputWrapper}>
                        <FontAwesomeIcon icon={faLock} className={authStyles.inputIcon} />
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            className={authStyles.inputField}
                            placeholder="••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <FontAwesomeIcon 
                            icon={showPassword ? faEyeSlash : faEye} 
                            className={authStyles.eyeIcon}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                     </div>
                  </div>
                  <div className={authStyles.inputGroup}>
                     <label className={authStyles.label}>Confirm</label>
                     <div className={authStyles.inputWrapper}>
                        <FontAwesomeIcon icon={faLock} className={authStyles.inputIcon} />
                        <input
                            name="password_confirmation"
                            type={showConfirm ? "text" : "password"}
                            required
                            className={authStyles.inputField}
                            placeholder="••••••"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                        />
                        <FontAwesomeIcon 
                            icon={showConfirm ? faEyeSlash : faEye} 
                            className={authStyles.eyeIcon}
                            onClick={() => setShowConfirm(!showConfirm)}
                        />
                     </div>
                  </div>
              </div>

              {/* HELPER TEXT */}
              <div className="text-xs text-gray-500 mb-6 flex gap-2 items-start bg-gray-50 p-2 rounded-lg border border-gray-100">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-rose-500 mt-0.5" />
                  <p>
                    Password must be <strong>8+ chars</strong> and include at least <strong>1 Capital</strong>, <strong>1 Number</strong>, and <strong>1 Symbol</strong>.
                  </p>
              </div>

              {/* --- ADMIN TOGGLE SECTION --- */}
              <div className="mb-4">
                  <button 
                    type="button"
                    onClick={() => setShowAdminInput(!showAdminInput)}
                    className="text-xs text-gray-400 hover:text-rose-600 font-semibold flex items-center gap-1 transition"
                  >
                     <FontAwesomeIcon icon={faUserShield} /> 
                     {showAdminInput ? "Hide Admin Options" : "Register as Admin?"}
                  </button>

                  {/* Hidden Admin Input */}
                  {showAdminInput && (
                      <div className="mt-2 animate-fade-in-down">
                        <label className={`${authStyles.label} text-gray-500`}>Admin Secret Code</label>
                        <input 
                            name="admin_code"
                            type="password"
                            className="w-full p-2 rounded-lg border border-gray-300 focus:border-rose-500 outline-none text-sm"
                            placeholder="Enter secret code..."
                            value={formData.admin_code}
                            onChange={handleChange}
                        />
                      </div>
                  )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className={isLoading ? authStyles.btnDisabled : authStyles.btnPrimary}
              >
                {isLoading ? "Creating Account..." : (
                    <>Sign Up <FontAwesomeIcon icon={faUserPlus} /></>
                )}
              </button>

              {/* FOOTER */}
              <p className={authStyles.footerText}>
                Already have an account? 
                <Link to='/signin' className={authStyles.linkText}>
                    Login here
                </Link>
              </p>

            </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;