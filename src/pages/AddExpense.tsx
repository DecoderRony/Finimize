import { Box, Icon } from "@chakra-ui/react";
import PageHeader from "../components/PageHeader";
import { BsXSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate();

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
    </Box>
  );
};

export default AddExpense;
