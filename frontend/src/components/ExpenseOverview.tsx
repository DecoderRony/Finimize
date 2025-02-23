import { Container, HStack, Stack, Text } from "@chakra-ui/react";
import { ExpensesProps } from "../interface";

const ExpenseOverView = ({ expenses }: ExpensesProps) => {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  let monthsExpenseSum: number = 0;
  let yearsExpenseSum: number = 0;

  expenses?.forEach((expense) => {
    const date = expense.date;
    const month = date.substring(date.indexOf("-") + 1, date.lastIndexOf("-"));
    const year = date.substring(0, date.indexOf("-"));
    if (+month === currentMonth) {
      monthsExpenseSum += parseInt(expense.amount);
    }

    if (+year === currentYear) {
      yearsExpenseSum += parseFloat(expense.amount);
    }
  });

  return (
    <Stack direction="row">
      <Container w="100%" p="0" m="0">
        {
          // monthly expense
        }
        <HStack justifyContent="space-between">
          <Text>Month's expense</Text>
          <Text>Rs. {monthsExpenseSum}</Text>
        </HStack>
        {
          // yearly expense
        }
        <HStack justifyContent="space-between">
          <Text>Year's expense</Text>
          <Text>Rs. {yearsExpenseSum}</Text>
        </HStack>
      </Container>
    </Stack>
  );
};

export default ExpenseOverView;
