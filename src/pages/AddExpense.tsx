import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { addDoc, collection, doc } from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsXSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { auth, db } from "../services/Firebase-config";

interface ExpenseInputs {
  subject: string;
  date: string;
  amount: number;
  category: string;
  description: string;
}

const AddExpense = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<ExpenseInputs>();

  const onSubmit: SubmitHandler<ExpenseInputs> = async (formInputs) => {
    const collectionRef = collection(db, "Users");
    const docRef = doc(collectionRef, auth.currentUser?.uid);
    await addDoc(collection(docRef, "Expenses"), formInputs);
    navigate(-1);
  };

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Box p="6">
      <PageHeader title="New Expense">
        <Icon
          as={BsXSquare}
          color="gray.500"
          _hover={{
            cursor: "pointer",
            color: "gray.100",
          }}
          onClick={() => handleClick()}
        ></Icon>
      </PageHeader>

      <hr />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt="3rem">
          <HStack spacing="2.1rem">
            <FormLabel fontWeight="bold" color="gray.400">
              Subject<sup>*</sup>
            </FormLabel>
            <Input
              type="name"
              bgColor="gray.900"
              {...register("subject", { required: true, minLength: 4 })}
              focusBorderColor="gray.100"
            />
          </HStack>
        </FormControl>

        <FormControl mt="4">
          <HStack spacing="3.4rem">
            <FormLabel fontWeight="bold" color="gray.400">
              Date<sup>*</sup>
            </FormLabel>
            <Input
              color="gray.400"
              type="date"
              bgColor="gray.900"
              focusBorderColor="gray.100"
              {...register("date", { required: true })}
            />
          </HStack>
        </FormControl>

        <FormControl mt="4">
          <HStack spacing="7">
            <FormLabel fontWeight="bold" color="gray.400">
              Amount<sup>*</sup>
            </FormLabel>
            <Input
              color="gray.400"
              type="number"
              bgColor="gray.900"
              focusBorderColor="gray.100"
              {...register("amount", {
                required: true,
                pattern: {
                  value: /^[1-9]\d*$/,
                  message: "Enter a valid amount",
                },
              })}
            />
          </HStack>
        </FormControl>

        <FormControl mt="4">
          <HStack spacing="5">
            <FormLabel fontWeight="bold" color="gray.400">
              Category<sup>*</sup>
            </FormLabel>
            <Select
              placeholder="Type"
              color="gray.400"
              bgColor="gray.900"
              focusBorderColor="gray.100"
              {...register("category", {
                required: true,
              })}
            >
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
          </HStack>
        </FormControl>

        <FormControl mt="4">
          <HStack alignItems="start">
            <FormLabel fontWeight="bold" color="gray.400">
              Description
            </FormLabel>
            <Textarea
              bgColor="gray.900"
              focusBorderColor="gray.100"
              rows={5}
              {...register("description")}
            />
          </HStack>
        </FormControl>

        <HStack w="100%" justifyContent="end" mt="4">
          <Button px="10" type="submit">
            Save
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default AddExpense;
