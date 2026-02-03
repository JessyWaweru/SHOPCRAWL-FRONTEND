import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../providers/Auth.provider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // --- SUCCESS ---
        console.log("Login Success:", data);
        
        // 1. Save Token (CRITICAL FOR HISTORY)
        if (data.token) {
            localStorage.setItem("token", data.token);
        }

        // 2. Save User Data
        // The backend returns { token: '...', user: { ... } }
        const userData = data.user || data; 
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        
        toast.success("Login Successful!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        // --- FAILURE ---
        console.error("Login Failed:", data);
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
    <div 
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')`
        }}
    >
      <ToastContainer position="top-center" />

      <div className="bg-white/95 p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-rose-600 mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-6">Login to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
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

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="border border-gray-300 rounded-lg w-full p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <span 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 cursor-pointer hover:text-rose-600 transition"
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`font-bold rounded-lg p-3 mt-2 transition duration-300 shadow-lg transform active:scale-95 ${
                isLoading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-rose-600 text-white hover:bg-rose-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center border-t pt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-rose-600 font-bold hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;