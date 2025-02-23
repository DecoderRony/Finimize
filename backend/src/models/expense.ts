import { Document, Schema, model } from "mongoose";
import { EXPENSE_COLLECTION } from "./const";

export type Expense = {
  subject: string;
  date: Date;
  amount: number;
  category: string;
  description?: string;
} & Document;
// interface for expense document
interface IExpenseDocument extends Expense, Document {}

// expense data schema
const ExpenseSchema = new Schema<IExpenseDocument>({
  subject: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  description: {
    type: String,
    required: false,
  }
});

interface IExpenseCollection extends IExpenseDocument {
    expenses: Expense[];
};

const ExpenseCollectionSchema = new Schema<IExpenseCollection>({
  _id: {
    type: String,
    required: true,
    unique: true
  }, // defining id manually as we want doc name to be set using firebase user id
  expenses: {
    type: [ExpenseSchema],
    required: true,
    default: []
  }
});

const expenseCollection = model<IExpenseCollection>(EXPENSE_COLLECTION, ExpenseCollectionSchema)




export default expenseCollection;
