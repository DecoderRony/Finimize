import {
  Checkbox,
  SimpleGrid,
  Stack,
  StyleProps,
  Text,
} from "@chakra-ui/react";
import { Expense } from "../interface";
import React, { useContext } from "react";
import { ExpenseToDeleteContext } from "./Expenses";

interface ExpenseProps extends StyleProps {
  expense: Expense;
  bgColor: string;
  index: number;
  checkedItems: boolean[];
  setCheckedItems: (checkedItems: boolean[]) => void;
}

const ExpenseRow = ({
  expense,
  bgColor,
  index,
  checkedItems,
  setCheckedItems,
  ...chakraSystemProps
}: ExpenseProps) => {
  const { expensesToDelete, setExpensesToDelete } = useContext(
    ExpenseToDeleteContext
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      checkedItems[index] = !checkedItems[index];
      setExpensesToDelete([...expensesToDelete, expense._id]);
      setCheckedItems([...checkedItems]);
      return;
    }

    const updatedExpensesToDelArr = expensesToDelete.filter(
      (expenseItem) => expenseItem !== expense._id
    );
    checkedItems[index] = !checkedItems[index];
    setExpensesToDelete(updatedExpensesToDelArr);
    setCheckedItems([...checkedItems]);
  };

  return (
    <Stack
      direction="row"
      spacing="6"
      p="4"
      bgColor={bgColor}
      {...chakraSystemProps}
    >
      <Checkbox
        onChange={(event) => handleChange(event)}
        isChecked={checkedItems[index]}
      />

      <SimpleGrid
        columns={3}
        spacing={4}
        w="100%"
        fontSize={{ base: "0.7rem", md: "1rem", lg: "1rem", xl: "1rem" }}
        justifyContent="center"
      >
        <Text>{expense.subject}</Text>
        <Text>{expense.amount}</Text>
        <Text>{expense.category}</Text>
      </SimpleGrid>
    </Stack>
  );
};

export default ExpenseRow;
