import expenseCollection, { Expense } from "../models/expense";

const addExpense = async (uid: string, expenseData: Expense) => {
  return await expenseCollection.findOneAndUpdate(
    { _id: uid },
    { $push: { expenses: expenseData } },
    { upsert: true, new: true }
  );
};

export default addExpense;
