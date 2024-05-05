import { Box, Button, HStack } from "@chakra-ui/react";
import { sidePanelItems } from "../constants";
import { useNavigate } from "react-router-dom";
import useCurrentRoute from "../hooks/useCurrentRoute";

const Navbar = () => {
  const navigate = useNavigate();
  const currentRoute = useCurrentRoute();

  return (
    <Box
      zIndex="5"
      bgColor="gray.700"
      borderRadius="0.4rem"
      overflowX="scroll"
      style={{ scrollbarWidth: "none" }}
    >
      <HStack spacing={0}>
        {sidePanelItems.map((item) => (
          <Button
            key={item.id}
            bgColor={
              currentRoute.displayName === item.displayName
                ? "gray.600"
                : "gray.900"
            }
            _focus={{
              bg: "gray.600",
            }}
            my="2"
            ml="2"
            borderRadius="0.3rem"
            px="3rem"
            onClick={() => navigate(item.route)}
          >
            {item.displayName}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default Navbar;
