import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";
import { DASHBOARD_ROUTE } from "../constants";
import useAuthStateChange from "../hooks/useAuthStateChange";

const Tracker = () => {
  useAuthStateChange(DASHBOARD_ROUTE);

  return (
    <Box h="100vh">
      <AbsoluteCenter>
        <Spinner
          size="xl"
          speed="0.8s"
          emptyColor="gray.700"
          color="gray.100"
          thickness="0.2rem"
        />
      </AbsoluteCenter>
    </Box>
  );
};

export default Tracker;
