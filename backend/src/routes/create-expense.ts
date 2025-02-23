import { Response, Router } from "express";
import { RequestType } from "../middlewares/auth-middleware";
import { Expense } from "../models/expense";
import addExpense from "../services/addExpense";

const createExpenseRouterInstance = Router();

interface ExpenseReq extends RequestType {
  body: Expense;
}

createExpenseRouterInstance.post(
  "/",
  async (req: ExpenseReq, res: Response) => {
    try {
      const uid = req.user!.uid;
      const expense = await addExpense(uid, req.body);
      res
        .status(201)
        .json({ message: "Expense added successfully", data: expense });
    } catch (error) {
      console.error("Error adding expense:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default createExpenseRouterInstance;
