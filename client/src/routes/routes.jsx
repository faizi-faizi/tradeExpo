import { createBrowserRouter } from "react-router-dom";
import ViewExcel from "../pages/ViewExcel.jsx";
import Homepage from "../pages/Homepage.jsx";

export const routes = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/managexcel", element: <ViewExcel /> },
]);