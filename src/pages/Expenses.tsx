import { Box, Button, HStack, Icon, Text } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { auth, db } from "../services/Firebase-config";

const Expenses = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const collectionRef = collection(db, "Users");
        const docRef = doc(collectionRef, auth.currentUser?.uid);
        const expensesCollectionRef = collection(docRef, "Expenses");
        onSnapshot(expensesCollectionRef, (querySnapshot) => {
          querySnapshot.docs.forEach((doc) => console.log(doc.data()));
        });
      }
    });
  }, []);

  const handleClick = () => {
    navigate("add-expense");
  };

  return (
    <Box p="6">
      <PageHeader title="Expenses">
        <HStack>
          <Button size="xs" onClick={() => handleClick()}>
            <HStack gap="0" spacing="0">
              <Icon as={BsPlus}></Icon>
              <Text>New expense</Text>
            </HStack>
          </Button>
        </HStack>
      </PageHeader>

      <hr />
    </Box>
  );
};

export default Expenses;
