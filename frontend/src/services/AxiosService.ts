import axios from "axios";
import { getAuth } from "firebase/auth";

const API_BASE_URL = import.meta.env.VITE_SERVICE_URL; // Your backend URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Attach Firebase Auth Token to Requests
try{

  axiosInstance.interceptors.request.use(
    async (config) => {
      const auth = getAuth(); // Get Firebase Auth instance
      const user = auth.currentUser;
  
      if (user) {
        const token = await user.getIdToken(); // Get Firebase token
        config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(new Error(error));
    }
  );
}catch(err){
  console.log(err);
}

export default axiosInstance;
