import { createBrowserRouter } from "react-router-dom";
import ViewExcel from "../pages/ViewExcel.jsx";
import Homepage from "../pages/Homepage.jsx";
import Login from "../pages/Login.jsx";
import CardPage from "../pages/CardPage.jsx";

export const routes = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> }, 
  { path: "/managexcel", element: <ViewExcel /> },
  { path: "/card/:id", element: <CardPage /> },
]);