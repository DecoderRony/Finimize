import { Router } from "express";
import createExpenseRouterInstance from "./create-expense";
import checkUserAuthenticationStatus from "../middlewares/auth-middleware";
import getExpensesRouterInstance from "./get-expenses";
import deleteExpensesRouterInstance from "./delete-expenses";

// this route serves as the base route file which is /api
// all routes are added in this file creating api format as /api/{routeName}
const baseRouter = Router();
baseRouter.use(checkUserAuthenticationStatus);
baseRouter.get("/", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});
baseRouter.use("/create-expense", createExpenseRouterInstance);
baseRouter.use("/get-expenses", getExpensesRouterInstance);
baseRouter.use("/delete-expenses", deleteExpensesRouterInstance);

export default baseRouter;
