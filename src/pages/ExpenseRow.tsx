import {
  Checkbox,
  SimpleGrid,
  Stack,
  StyleProps,
  Text,
} from "@chakra-ui/react";
import { Expense } from "../interface";

interface ExpenseProps extends StyleProps {
  expense: Expense;
  bgColor: string;
  expensesToDelete: Map<string, Expense>;
}

const ExpenseRow = ({
  expense,
  bgColor,
  expensesToDelete,
  ...chakraSystemProps
}: ExpenseProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      expensesToDelete.set(expense.id, expense);
      return;
    }

    expensesToDelete.delete(expense.id);
  };

  return (
    <Stack
      direction="row"
      spacing="6"
      p="4"
      bgColor={bgColor}
      {...chakraSystemProps}
    >
      <Checkbox onChange={(event) => handleChange(event)} />

      <SimpleGrid columns={3} spacing={4} w="100%">
        <Text>{expense.subject}</Text>
        <Text>{expense.amount}</Text>
        <Text>{expense.category}</Text>
      </SimpleGrid>
    </Stack>
  );
};

export default ExpenseRow;
