import { Badge, Center, Show, SimpleGrid, Text } from "@chakra-ui/react";
import { ExpensesProps } from "../interface";

const RecentExpenses = ({ expenses }: ExpensesProps) => {
  const recentExpenses = expenses?.slice(0, 3);

  return (
    <>
      {recentExpenses?.map(({ subject, date, category, amount }, index) => {
        const subjectSubtr = subject.length > 8 ? subject.substring(0, 8) + '...' : subject;
        const categorySubStr = category.length > 4 ? category.substring(0, 5) + '...' : category;
        return (
          <SimpleGrid
            columns={{ base: 3, md: 4, lg: 4, xl: 4 }}
            mb={index < recentExpenses.length - 1 ? 2 : 0}
            p="0"
            key={subject + index}
          >
            <Text>{subjectSubtr}</Text>

            <Show above="md">
              <Text>{date.split("T")[0]}</Text>
            </Show>

            <Badge borderRadius="0.8rem" mx={{base: 1, md: 5, lg: 5, xl:5}}>
              <Center h="100%">{categorySubStr}</Center>
            </Badge>

            <Text justifySelf="center">{amount}</Text>
          </SimpleGrid>
        );
      })}
    </>
  );
};

export default RecentExpenses;
