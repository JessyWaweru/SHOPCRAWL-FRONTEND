import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../providers/Auth.provider"; 
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // --- Visibility Toggles ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for password feedback
  const [passwordFeedback, setPasswordFeedback] = useState([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setUser } = useAuthContext(); 

  // --- 1. Real-time Strict Password Validation ---
  useEffect(() => {
    const feedback = [];
    if (password.length > 0) {
        if (password.length < 6) feedback.push("At least 6 characters");
        if (!/[A-Z]/.test(password)) feedback.push("A capital letter");
        if (!/[0-9]/.test(password)) feedback.push("A number");
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) feedback.push("A symbol (!@#$)");
    }
    
    setPasswordFeedback(feedback);
    setIsPasswordValid(password.length > 0 && feedback.length === 0);
  }, [password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    if (!isPasswordValid) {
        toast.warning("Please meet all password requirements.");
        return;
    }

    setIsLoading(true);

    const userData = {
      username: email.split('@')[0],
      email: email,
      password: password,       
      password_digest: password, 
      age: 18,
      admin: false
    };

    try {
      // 1. CREATE USER
      const response = await fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        
        // 2. AUTO-LOGIN (Get the Token Immediately)
        // We use the same credentials to hit the login endpoint
        const loginResponse = await fetch("http://127.0.0.1:8000/api/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok && loginData.token) {
            // SUCCESS: Save Token & User
            localStorage.setItem("token", loginData.token);
            localStorage.setItem("user", JSON.stringify(loginData.user));
            setUser(loginData.user);

            toast.success("Account created! Logging you in...");
            setTimeout(() => navigate("/"), 1500);
        } else {
            // Fallback if auto-login fails (rare)
            toast.success("Account created! Please login.");
            setTimeout(() => navigate("/signIn"), 1500);
        }

      } else {
        const errorData = await response.json();
        const errorMessage = errorData.email ? errorData.email[0] : "Signup failed. Please try again.";
        toast.error(errorMessage);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div 
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')`
        }}
    >
      <ToastContainer position="top-center" />
      
      <div className="bg-white/95 p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm mt-10 mb-10">
        <h1 className="text-3xl font-bold text-center text-rose-600 mb-2">Create Account</h1>
        <p className="text-gray-500 text-center mb-6">Join Shopcrawl today</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"} // Toggle type
                    placeholder="••••••••"
                    className={`border rounded-lg w-full p-3 pr-10 focus:outline-none focus:ring-2 transition ${
                        password.length > 0 && !isPasswordValid ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-rose-500"
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {/* Eye Icon */}
                <span 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 cursor-pointer hover:text-rose-600 transition"
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
            </div>
            
            {/* Password Requirements Checklist */}
            {password.length > 0 && !isPasswordValid && (
                <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">
                    <p className="font-bold">Missing requirements:</p>
                    <ul className="list-disc list-inside">
                        {passwordFeedback.map((msg, index) => (
                            <li key={index}>{msg}</li>
                        ))}
                    </ul>
                </div>
            )}
             {password.length > 0 && isPasswordValid && (
                <p className="text-green-600 text-xs mt-1 font-bold">✔ Strong Password</p>
             )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <div className="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"} // Toggle type
                    placeholder="••••••••"
                    className="border border-gray-300 rounded-lg w-full p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {/* Eye Icon */}
                <span 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 cursor-pointer hover:text-rose-600 transition"
                >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isPasswordValid}
            className={`font-bold rounded-lg p-3 mt-4 transition duration-300 shadow-lg transform active:scale-95 ${
                isLoading || !isPasswordValid 
                ? "bg-gray-400 cursor-not-allowed text-gray-200" 
                : "bg-rose-600 text-white hover:bg-rose-700"
            }`}
          >
            {isLoading ? "Creating Account..." : "Sign Up & Login"}
          </button>
        </form>

        <div className="mt-6 text-center border-t pt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/signIn" className="text-rose-600 font-bold hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;