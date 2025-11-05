import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import logo from "../logos/bk-logo.png";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", form);
      if (res.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("isLoggedIn", "true");
        setTimeout(() => navigate("/managexcel"), 800);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
   <div
      className="min-h-screen flex justify-center items-center px-4 bg-linear-to-br from-gray-500 via-black-950 to-white"
    >
      <Toaster richColors />
      
      {/* Glass-style card */}
      <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-sm text-center border border-white/20">
        {/* Logo */}
        <img
          src={logo}
          alt="Trade Expo Logo"
          className="w-32 h-auto mx-auto mb-6 object-contain drop-shadow-xl"
        />

        <h2 className="text-3xl font-extrabold text-white mb-8 tracking-wide drop-shadow-lg">
          Admin Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="email"
            placeholder="Username"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-none bg-white/20 text-white placeholder-gray-200 rounded-lg focus:bg-white/30 focus:ring-4 focus:ring-gray-400 outline-none transition-all duration-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-none bg-white/20 text-white placeholder-gray-200 rounded-lg focus:bg-white/30 focus:ring-4 focus:ring-gray-400 outline-none transition-all duration-300"
          />

          <button
            type="submit"
            className="w-full bg- text-white font-bold py-3 rounded-full shadow-lg hover:bg-gray-400 transition-all duration-500 ease-in-out cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;