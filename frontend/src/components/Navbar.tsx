import { Box, Button, HStack } from "@chakra-ui/react";
import { sidePanelItems } from "../constants";
import { useNavigate } from "react-router-dom";
import useCurrentRoute from "../hooks/useCurrentRoute";

const Navbar = () => {
  const navigate = useNavigate();
  const currentRoute = useCurrentRoute();

  return (
    <Box
      bgColor="gray.700"
      borderRadius="0.4rem"
      overflowX="auto"
      style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "auto" }}
    >
      <HStack spacing={0}>
        {sidePanelItems.map((item) => (
          <Button
            key={item.id}
            bgColor={
              currentRoute.displayName === item.displayName
                ? "rgba(99, 99, 99, 0.3)"
                : "rgba(17, 17, 17, 0.3)"
            }
            _focus={{
              bg: "rgba(99, 99, 99, 0.3)",
            }}
            backdropFilter="blur(11px)"
            my="2"
            ml="2"
            borderRadius="0.3rem"
            px="3rem"
            onClick={() => navigate(item.route)}
          >
            <Box zIndex="5">{item.displayName}</Box>
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default Navbar;
