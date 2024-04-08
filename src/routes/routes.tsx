import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Expenses from "../pages/Expenses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
