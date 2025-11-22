import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

// registration
export const registerUser = (data) => {
  return API.post("/api/users/register", data);
};

//get list
export const getUsers = () => API.get("/api/users/list");

//login
export const loginAdmin = (data) => API.post("/api/auth/login", data);

// Stall registration
export const registerStall = (data) => {
  return API.post("/api/stall/register", data);
};

// Get all stalls
export const getStalls = () => {
  return API.get("/api/stall/list");
};

// get single user by id
export const getUserById = (id) => API.get(`/api/users/${id}`);