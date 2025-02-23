import { User } from "firebase/auth";

export interface AuthenticatedUserDetails {
  user: User | undefined;
}

export interface Expense {
  amount: string;
  category: string;
  date: string;
  description: string;
  subject: string;
  _id: string;
}

export interface ExpensesProps {
  expenses: Expense[] | undefined;
}
