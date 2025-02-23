import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../constants";
import { auth } from "@/services/FirebaseConfig";

// custom hook to check the auth status of user and reidrect to route on basis of auth status
// on auth success take user to dashboard; else login screen
const useAuthStateChange = (route: string) => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(route);
        return;
      }

      navigate(LOGIN_ROUTE);
    });

    return unsubscribe;
  }, [navigate, route]);
};

export default useAuthStateChange;
