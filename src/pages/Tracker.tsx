import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";
import useAuthStateChange from "../hooks/useAuthStateChange";
import { DASHBOARD_ROUTE, HOME_ROUTE } from "../constants";

const Tracker = () => {
  useAuthStateChange(`${DASHBOARD_ROUTE}/${HOME_ROUTE}`);

  return (
    <Box>
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
