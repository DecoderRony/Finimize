import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Expenses from "../pages/Expenses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "expenses",
        element: <Expenses />,
      },
    ],
  },
]);

export default router;
