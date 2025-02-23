import expenseCollection from "../models/expense";

const getExpenses = async (uid: string) => {
     // Find document where `_id` matches the UID
     const expenseDoc = await expenseCollection.findById(uid);
     return expenseDoc?.expenses;
}

export default getExpenses;