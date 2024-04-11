import { createBrowserRouter } from "react-router-dom";
import { ADD_EXPENSE_ROUTE, EXPENSES_ROUTE, LOGIN_ROUTE } from "../constants";
import AddExpense from "../pages/AddExpense";
import DashboardLayout from "../pages/DashboardLayout";
import ExpenseContainer from "../pages/ExpenseContainer";
import Expenses from "../pages/Expenses";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Tracker from "../pages/Tracker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Tracker />,
  },
  {
    path: LOGIN_ROUTE,
    element: <LoginPage />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: EXPENSES_ROUTE,
        element: <ExpenseContainer />,
        children: [
          {
            index: true,
            element: <Expenses />,
          },
          {
            path: ADD_EXPENSE_ROUTE,
            element: <AddExpense />,
          },
        ],
      },
    ],
  },
]);

export default router;
