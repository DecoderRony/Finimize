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
      expensesToDelete.set(expense.id, expense);
      checkedItems[index] = !checkedItems[index];
      setExpensesToDelete(new Map(expensesToDelete));
      setCheckedItems([...checkedItems]);
      return;
    }

    expensesToDelete.delete(expense.id);
    checkedItems[index] = !checkedItems[index];
    setExpensesToDelete(new Map(expensesToDelete));
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
        fontSize="0.7rem"
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
