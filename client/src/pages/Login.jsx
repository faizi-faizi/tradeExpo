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
 <div className="min-h-screen flex justify-center items-center px-4 bg-stone-50">
  <div className="bg-gray-700 shadow-xl rounded-3xl p-10 w-full max-w-sm text-center border border-gray-400">
    <img
      src={logo}
      alt="Trade Expo Logo"
      className="w-28 h-auto mx-auto mb-6 object-contain"
    />

    <h2 className="text-3xl font-extrabold text-gray-100 mb-8 tracking-wide">
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
        className="w-full px-4 py-3 border border-gray-300 bg-stone-50 rounded-lg text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-300"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 bg-stone-50 rounded-lg text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-300"
      />

      <button
        type="submit"
        className="w-full bg-gray-200 text-black font-bold py-3 rounded-full shadow-lg hover:bg-gray-400 transition-all duration-500 ease-in-out cursor-pointer"
      >
        Login
      </button>
    </form>
  </div>
</div>
  );
}

export default Login;