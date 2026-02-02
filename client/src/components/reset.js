
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // 1. Fetch all users to find the one with this email
      // (Ideally, your backend should have a specific filter endpoint, but this works for now)
      const response = await fetch("http://127.0.0.1:8000/api/users/");
      
      if (!response.ok) {
          throw new Error("Could not connect to server");
      }
      
      const data = await response.json();
      
      // 2. Find the user by email
      const user = data.find((user) => user.email === email);

      if (user) {
        // 3. Perform the actual Update (PATCH)
        const updateResponse = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/`, {
            method: 'PATCH', // Use PATCH to update specific fields
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password_digest: password // Map to Django field name
            })
        });

        if (updateResponse.ok) {
          toast.success("Password reset successfully! Redirecting...");
          setEmail("");
          setPassword("");
          // Redirect to login after 2 seconds
          setTimeout(() => navigate("/signin"), 2000);
        } else {
          toast.error("Failed to update password. Please try again.");
        }

      } else {
        toast.error("Email not found in our records.");
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <form
        onSubmit={handleResetPassword}
        className="border w-96 rounded-lg shadow-lg p-4 flex flex-col gap-4"
      >
        <h1 className="text-center text-2xl text-rose-600">Reset Password</h1>
        
        <h3>Enter Email</h3>
        <div>
          <input
            type="email"
            placeholder='Enter your email'
            className="border rounded-lg w-full p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      
        <h3>New Password</h3>
        <div>
          <input
            type="password"
            placeholder='Enter new password'
            className="border rounded-lg w-full p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
          />
        </div>

        <div>
           <button
            type="submit"
            className="bg-rose-600 rounded-lg w-48 p-3 mt-2 text-white hover:opacity-80 m-auto block"
            disabled={isLoading}
           >
            {isLoading ? "Processing..." : "Reset Password"}
           </button>
        </div>
      
        <div className="text-center mt-2">
            <Link to='/signin' className="text-blue-500 hover:underline">
                Back To Login
            </Link>
        </div>
      </form>
    </div>
  );
}