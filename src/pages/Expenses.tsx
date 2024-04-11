import { Box, Button, HStack, Icon, Text } from "@chakra-ui/react";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const Expenses = () => {
  const navigate = useNavigate();

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
