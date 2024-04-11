import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../constants";
import { auth } from "../services/Firebase-config";

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
  }, [auth]);
};

export default useAuthStateChange;
