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
