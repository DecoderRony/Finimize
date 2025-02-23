import expenseCollection from "../models/expense";

const deleteExpense = async (userId: string, docUid: string) => {
  const modifyCount = await expenseCollection.updateOne(
    { _id: userId },
    { $pull: { expenses: { _id: docUid } } }
  );
  if (modifyCount) {
    return Promise.resolve(true);
  }

  return Promise.reject(new Error(`doc with id: ${docUid} not found`));
};

export default deleteExpense;
