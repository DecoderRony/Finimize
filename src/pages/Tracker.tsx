import { AbsoluteCenter, Spinner } from "@chakra-ui/react";
import { DASHBOARD_ROUTE, HOME_ROUTE } from "../constants";
import useAuthStateChange from "../hooks/useAuthStateChange";

const Tracker = () => {
  useAuthStateChange(`${DASHBOARD_ROUTE}/${HOME_ROUTE}`);

  return (
    <AbsoluteCenter h="100vh">
      <Spinner
        size="xl"
        speed="0.8s"
        emptyColor="gray.700"
        color="gray.100"
        thickness="0.2rem"
      />
    </AbsoluteCenter>
  );
};

export default Tracker;
