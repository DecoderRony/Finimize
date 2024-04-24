import {
  Box,
  Button,
  Checkbox,
  HStack,
  Icon,
  SimpleGrid,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { createContext, useEffect, useMemo, useState } from "react";
import { BsPlus, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { EXPENSE_ROW_HEADER } from "../constants";
import useQuerySnapshotDocs from "../hooks/useQuerySnapshotDocs";
import { Expense } from "../interface";
import { auth, db } from "../services/Firebase-config";
import ExpenseRow from "./ExpenseRow";

// context for expenses, to be passed to child element expense row
export const ExpenseToDeleteContext = createContext({
  expensesToDelete: new Map<string, Expense>(),
  setExpensesToDelete: (_: Map<string, Expense>) => {},
});

const Expenses = () => {
  const navigate = useNavigate();
  const expenses = useQuerySnapshotDocs();
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [expensesToDelete, setExpensesToDelete] = useState<
    Map<string, Expense>
  >(new Map());
  const contextValue = useMemo(
    () => ({ expensesToDelete, setExpensesToDelete }),
    [expensesToDelete]
  );

  useEffect(() => {
    setCheckedItems(new Array(expenses?.length).fill(false));
  }, [expenses]);

  const allItemsChecked =
    checkedItems.length === 0
      ? false
      : checkedItems.every((item) => item === true);
  const isIndeterminate =
    checkedItems.some((item) => item === true) && !allItemsChecked;

  const createExpenseMapForDeletion = () => {
    const expensesMap = new Map<string, Expense>();
    expenses?.forEach((expense) => expensesMap.set(expense.id, expense));
    return expensesMap;
  };

  const selectAllAndSetExpenseToDelete = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const updatedCheckedItems = new Array(checkedItems.length).fill(true);
      setCheckedItems(updatedCheckedItems);
      const data = createExpenseMapForDeletion();
      console.log("Data:>>", data);
      setExpensesToDelete(data);
      return;
    }

    const updatedCheckedItems = new Array(checkedItems.length).fill(false);
    setCheckedItems(updatedCheckedItems);
  };

  const addNewExpense = () => {
    navigate("add-expense");
  };

  const extractSnapshotDocs = (
    querySnapshot: QuerySnapshot<DocumentData, DocumentData>
  ) => {
    querySnapshot.docs.forEach((document) => {
      if (expensesToDelete.has(document.id)) {
        deleteDoc(document.ref);
        expensesToDelete.delete(document.id);
      }
    });

    setCheckedItems([false]);
  };

  const deleteExpense = () => {
    const collectionRef = collection(db, "Users");
    const docRef = doc(collectionRef, auth.currentUser?.uid);
    const expensesCollectionRef = collection(docRef, "Expenses");
    onSnapshot(expensesCollectionRef, (querySnapshot) => {
      extractSnapshotDocs(querySnapshot);
    });
  };

  return (
    <Box p="6">
      <PageHeader title="Expenses">
        <HStack>
          <Button size="xs" onClick={() => addNewExpense()}>
            <HStack gap="0" spacing="0">
              <Icon as={BsPlus}></Icon>
              <Text>New expense</Text>
            </HStack>
          </Button>

          <Button size="xs" onClick={() => deleteExpense()} disabled>
            <Icon as={BsTrash} color="red"></Icon>
          </Button>
        </HStack>
      </PageHeader>

      <hr />

      <Stack direction="row" spacing="6" p={4} justifyContent="center">
        <Checkbox
          isChecked={allItemsChecked}
          isIndeterminate={isIndeterminate}
          onChange={(event) => selectAllAndSetExpenseToDelete(event)}
        />

        <SimpleGrid columns={3} spacing={4} w="100%">
          {EXPENSE_ROW_HEADER.map((header) => (
            <Text
              key={header}
              fontSize={{ base: "0.8rem", md: "1rem", lg: "1rem", xl: "1rem" }}
            >
              {header}
            </Text>
          ))}
        </SimpleGrid>
      </Stack>

      {expenses === undefined ? (
        <SkeletonCircle></SkeletonCircle>
      ) : (
        <ExpenseToDeleteContext.Provider value={contextValue}>
          {expenses.map((expense, index) => (
            <ExpenseRow
              key={expense.subject + expense.description}
              expense={expense}
              bgColor={index % 2 === 0 ? "gray.900" : "gray.700"}
              index={index}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              mb="0.1rem"
            />
          ))}
        </ExpenseToDeleteContext.Provider>
      )}
    </Box>
  );
};

export default Expenses;
