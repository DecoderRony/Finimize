import { Badge, Center, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { ExpensesProps } from "../interface";

const RecentExpenses = ({ expenses }: ExpensesProps) => {
  const recentExpenses = expenses?.slice(0, 5);

  return (
    <>
      {recentExpenses?.map(({ subject, date, category, amount }, index) => {
        return (
          <SimpleGrid
            columns={4}
            mb={index < recentExpenses.length - 1 ? 2 : 0}
            key={subject + index}
          >
            <Text>{subject}</Text>

            <Text>{date}</Text>

            <Badge borderRadius="0.8rem" pt="1">
              <Center>{category}</Center>
            </Badge>

            <Text justifySelf="center">{amount}</Text>
          </SimpleGrid>
        );
      })}
    </>
  );
};

export default RecentExpenses;
