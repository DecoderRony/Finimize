import axiosInstance from "@/services/AxiosService";
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
import { createContext, useEffect, useMemo, useState } from "react";
import { BsPlus, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { EXPENSE_ROW_HEADER } from "../constants";
import { Expense } from "../interface";
import { auth } from "../services/FirebaseConfig";
import ExpenseRow from "./ExpenseRow";

// context for expenses, to be passed to child element expense row
export const ExpenseToDeleteContext = createContext({
  expensesToDelete: [] as string[],
  setExpensesToDelete: (_: string[]) => {},
});

const Expenses = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[] | undefined>();
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [expensesToDelete, setExpensesToDelete] = useState<string[]>([]);
  const contextValue = useMemo(
    () => ({ expensesToDelete, setExpensesToDelete }),
    [expensesToDelete]
  );

  useEffect(() => {
    if (!auth.currentUser) return; // Ensure user is authenticated before fetching

    let isSubscribed = true; // To track if component is still mounted

    const fetchExpenses = async () => {
      try {
        const res = await axiosInstance.get(
          `/get-expenses/${auth.currentUser!.uid}`
        );
        if (isSubscribed) {
          setExpenses(res.data);
          setCheckedItems(new Array(res.data.length).fill(false));
        }
      } catch (err) {
        if (isSubscribed) {
          console.error("Error occurred while fetching expenses: ", err);
        }
      }
    };

    fetchExpenses();

    return () => {
      isSubscribed = false; // Cleanup function to prevent setting state on unmounted component
    };
  }, []);

  const allItemsChecked =
    checkedItems.length === 0
      ? false
      : checkedItems.every((item) => item === true);
  const isIndeterminate =
    checkedItems.some((item) => item === true) && !allItemsChecked;

  const createExpenseArrForDeletion = () => {
    const expensesArr = expenses?.map((expense) => expense._id);
    return expensesArr ?? [];
  };

  const selectAllAndSetExpenseToDelete = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const updatedCheckedItems = new Array(checkedItems.length).fill(true);
      setCheckedItems(updatedCheckedItems);
      const data = createExpenseArrForDeletion();
      setExpensesToDelete(data);
      return;
    }

    const updatedCheckedItems = new Array(checkedItems.length).fill(false);
    setCheckedItems(updatedCheckedItems);
  };

  const addNewExpense = () => {
    navigate("add-expense");
  };

  // const extractSnapshotDocs = (
  //   querySnapshot: QuerySnapshot<DocumentData, DocumentData>
  // ) => {
  //   querySnapshot.docs.forEach((document) => {
  //     if (expensesToDelete.has(document.id)) {
  //       deleteDoc(document.ref);
  //       expensesToDelete.delete(document.id);
  //     }
  //   });

  //   setCheckedItems([false]);
  // };

  // const deleteExpense = () => {
  //   const collectionRef = collection(db, "Users");
  //   const docRef = doc(collectionRef, auth.currentUser?.uid);
  //   const expensesCollectionRef = collection(docRef, "Expenses");
  //   onSnapshot(expensesCollectionRef, (querySnapshot) => {
  //     extractSnapshotDocs(querySnapshot);
  //   });
  // };

  const deleteExpense = async () => {
    try {
      const response = await axiosInstance.post("/delete-expenses", {
        expenses: expensesToDelete,
      });

      if (response.status === 200) {
        console.log("Expenses deleted successfully:", response.data);
        // Update state only if deletion was successful
        setExpenses((prevExpenses) =>
          prevExpenses?.filter(
            (expense) => !expensesToDelete.includes(expense._id)
          )
        );
        setExpensesToDelete([]);
        setCheckedItems([]);
      } else {
        console.error("Failed to delete expenses:", response.data);
      }
    } catch (error) {
      console.error("Error deleting expenses:", error);
    }
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
          {expenses?.map((expense, index) => (
            <ExpenseRow
              key={expense._id}
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
