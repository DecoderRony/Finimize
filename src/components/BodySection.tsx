import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const BodySection = () => {
  return (
    <Box bgColor="gray.700" w="100%" h="100%" borderRadius="0.4rem">
      <Outlet />
    </Box>
  );
};

export default BodySection;
