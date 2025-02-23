import { Button } from "@chakra-ui/react";

type setIsAuthenticatedType = (value: boolean) => void;

interface Props {
  authenticate: (setIsAuthenticated: setIsAuthenticatedType) => void;
  setIsAuthenticated: setIsAuthenticatedType;
  children: string;
}

const AuthenticationButton = ({
  authenticate,
  setIsAuthenticated,
  children,
}: Props) => {
  return (
    <Button
      w="100%"
      variant="outline"
      p={5}
      borderRadius="10px"
      border="none"
      color="whitesmoke"
      bgColor="#1565c0"
      fontSize="1em"
      _hover={{
        cursor: "pointer",
      }}
      onClick={() => authenticate(setIsAuthenticated)}
    >
      {children}
    </Button>
  );
};

export default AuthenticationButton;
