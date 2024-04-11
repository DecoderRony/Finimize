import { User } from "firebase/auth";

export interface AuthenticatedUserDetails {
  user: User | undefined;
}
