import { useReducer } from "react";
import { ProfileContext } from "../context";
import { initialState, profileReducer } from "../reducers/ProfileReducer";

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
