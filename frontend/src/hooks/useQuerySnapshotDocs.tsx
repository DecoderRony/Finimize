import { onAuthStateChanged } from "firebase/auth";
import {
  QuerySnapshot,
  DocumentData,
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Expense } from "../interface";
import { auth, db } from "../services/FirebaseConfig";

const useQuerySnapshotDocs = () => {
  const [expenses, setExpenses] = useState<Expense[] | undefined>(undefined);

  const extractSnapshotDocs = (
    querySnapshot: QuerySnapshot<DocumentData, DocumentData>
  ) => {
    const newExpenses: Expense[] = [];
    querySnapshot.docs.forEach((doc) => {
      const newExpense: Expense = {
        ...(doc.data() as Expense),
        id: doc.id,
      };
      newExpenses.push(newExpense);
    });

    setExpenses(newExpenses);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collectionRef = collection(db, "Users");
        const docRef = doc(collectionRef, auth.currentUser?.uid);
        const expensesCollectionRef = collection(docRef, "Expenses");
        const sortedQuery = query(
          expensesCollectionRef,
          orderBy("date", "desc")
        );
        onSnapshot(sortedQuery, (querySnapshot) => {
          extractSnapshotDocs(querySnapshot);
        });
      }
    });

    return unsubscribe;
  }, []);

  return expenses;
};

export default useQuerySnapshotDocs;
