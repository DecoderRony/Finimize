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
import { BsPlus, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { EXPENSE_ROW_HEADER } from "../constants";
import useQuerySnapshotDocs from "../hooks/useQuerySnapshotDocs";
import { Expense } from "../interface";
import { auth, db } from "../services/Firebase-config";
import ExpenseRow from "./ExpenseRow";

const Expenses = () => {
  const navigate = useNavigate();
  const expenses = useQuerySnapshotDocs();
  const expensesToDelete = new Map<string, Expense>();

  const addNewExpense = () => {
    navigate("add-expense");
  };

  const extractSnapshotDocs = (
    querySnapshot: QuerySnapshot<DocumentData, DocumentData>
  ) => {
    querySnapshot.docs.forEach((document) => {
      if (expensesToDelete.has(document.id)) {
        deleteDoc(document.ref);
      }
    });
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

      <Stack direction="row" spacing="6" p={4}>
        <Checkbox />

        <SimpleGrid columns={3} spacing={4} w="100%">
          {EXPENSE_ROW_HEADER.map((header) => (
            <Text key={header}>{header}</Text>
          ))}
        </SimpleGrid>
      </Stack>

      {expenses === undefined ? (
        <SkeletonCircle></SkeletonCircle>
      ) : (
        expenses.map((expense, index) => (
          <ExpenseRow
            key={expense.subject + expense.description}
            expense={expense}
            bgColor={index % 2 === 0 ? "gray.900" : "gray.700"}
            expensesToDelete={expensesToDelete}
            mb="0.1rem"
          />
        ))
      )}
    </Box>
  );
};

export default Expenses;
