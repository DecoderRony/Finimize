import { Center, HStack, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { AuthError } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoverImage from "../assets/cover-img.png";
import AuthenticationButton from "../components/AuthenticationButton";
import { signInWithGooglePopup } from "../services/Firebase-config";
import styles from "./LoginPage.module.css";
import { HOME_ROUTE } from "../constants";

const authenicateUsingGoogleSignIn = (
  setIsAuthenticated: (value: boolean) => void
) => {
  signInWithGooglePopup()
    .then((res) => {
      if (res.user) {
        setIsAuthenticated(true);
      }
    })
    .catch((err: AuthError) => console.log("Error typed:", err.code));
};

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <SimpleGrid columns={2} height="100vh">
      <Center h="100%">
        <SimpleGrid row={2}>
          <Text fontSize="3rem">
            Track your expenses
            <br />
            <Text as="span" fontSize="6rem" className={styles.textGradient}>
              Efficiently.
            </Text>
          </Text>

          <HStack justify="space-evenly" mt={3}>
            <AuthenticationButton
              authenticate={authenicateUsingGoogleSignIn}
              setIsAuthenticated={setIsAuthenticated}
            >
              Google sign in
            </AuthenticationButton>

            <AuthenticationButton
              authenticate={authenicateUsingGoogleSignIn}
              setIsAuthenticated={setIsAuthenticated}
            >
              Phone
            </AuthenticationButton>
          </HStack>
        </SimpleGrid>
      </Center>

      <Image
        src={CoverImage}
        style={{ transform: "rotateY(180deg)" }}
        pos="absolute"
        right="0"
        bottom="0"
        boxSize="45rem"
      ></Image>
    </SimpleGrid>
  );
};

export default LoginPage;
