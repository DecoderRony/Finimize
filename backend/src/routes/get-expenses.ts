import { Request, Response, Router } from "express";
import getExpenses from "../services/getExpenses";

const getExpensesRouterInstance = Router();

interface RequestWithUid extends Request {
  params: {
    uid: string;
  };
}

getExpensesRouterInstance.get("/:uid", async (req: RequestWithUid, res: Response) => {
  try {
    const { uid } = req.params;

    const expenses = await getExpenses(uid);
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default getExpensesRouterInstance;
