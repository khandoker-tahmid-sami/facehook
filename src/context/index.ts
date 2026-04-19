import { createContext } from "react";

type AuthContextType = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar:string;
    email: string;
    bio: string;
  } | null;
  authToken: string | null;
  refreshToken: string | null;
};
const AuthContext = createContext<AuthContextType | null>(null);

const ProfileContext = createContext(null)

export { AuthContext, ProfileContext };
export type { AuthContextType };
