import { Box, Image, Show, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { AuthError } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoverImage from "../assets/cover-img.png";
import AuthenticationButton from "../components/AuthenticationButton";
import { signInWithGooglePopup } from "../services/Firebase-config";
import styles from "./LoginPage.module.css";

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
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2, xl: 2 }} height="100vh">
      <Box display="flex" h="100%">
        <SimpleGrid row={2} mx="auto">
          <Text
            px={{ base: "2rem", lg: "0", xl: "0" }}
            py={{ base: "2rem", lg: "0", xl: "0" }}
            fontSize={{ base: "2rem", lg: "3rem", xl: "3rem" }}
            justifyContent={{
              base: "flex-start",
              lg: "flex-end",
              xl: "flex-end",
            }}
            mt={{ base: "0", lg: "auto", xl: "auto" }}
          >
            Track your expenses
            <br />
            <Text
              as="span"
              fontSize={{ base: "4rem", lg: "6rem", xl: "6rem" }}
              className={styles.textGradient}
            >
              Efficiently.
            </Text>
          </Text>

          <Stack
            direction={{
              base: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            justify="space-evenly"
            justifyContent={{
              base: "flex-end",
              lg: "flex-start",
              xl: "flex-start",
            }}
            mt={{ base: "0", lg: "3", xl: "3" }}
            px={{ base: "2rem", lg: "0", xl: "0" }}
            pb={{ base: "2rem", lg: "0", xl: "0" }}
          >
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
          </Stack>
        </SimpleGrid>
      </Box>

      <Show above="lg">
        <Image
          src={CoverImage}
          style={{ transform: "rotateY(180deg)" }}
          pos="absolute"
          right="0"
          bottom="0"
          boxSize="45rem"
        ></Image>
      </Show>
    </SimpleGrid>
  );
};

export default LoginPage;
