import { Center, SkeletonText, Text } from "@chakra-ui/react";
import { AuthenticatedUserDetails } from "../interface";

const DisplayName = ({ user }: AuthenticatedUserDetails) => {
  if (user) {
    return (
      <Center mt="-4.5rem">
        <Text fontWeight="bold">{user.displayName}</Text>
      </Center>
    );
  }

  return (
    <Center mt="-4.5rem">
      <SkeletonText noOfLines={1} width="5rem" mt="2" />
    </Center>
  );
};

export default DisplayName;
