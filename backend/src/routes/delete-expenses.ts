import { Response, Router } from "express";
import { RequestType } from "../middlewares/auth-middleware";
import deleteExpense from "../services/deleteExpense";

const deleteExpensesRouterInstance = Router();

interface RequestWithBody extends RequestType {
  body: {
    expenses: string[];
  };
}

deleteExpensesRouterInstance.post(
  "/",
  async (req: RequestWithBody, res: Response) => {
    try {
      const userUid = req.user!.uid;
      const deleteResults = await Promise.allSettled(
        req.body.expenses.map((expenseDoc) =>
          deleteExpense(userUid, expenseDoc)
        )
      );

      // Check if all deletions were successful
      const allDeleted = deleteResults.every(
        (result) => result.status === "fulfilled" && result.value
      );

      if (allDeleted) {
        res.status(200).json({ message: "Documents deleted successfully", docIds: req.body.expenses });
      } else {
        res.status(404).json({
          message:
            "Cannot complete docs deletion as one or more provided document IDs were not found in DB.",
          failedIds: req.body.expenses
            .filter((_, index) => deleteResults[index].status !== "fulfilled")
            .map((expenseDoc) => expenseDoc),
        });
      }
    } catch (error) {
      console.error("Error deleting expenses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default deleteExpensesRouterInstance;
