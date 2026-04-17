import { useState } from "react";

import { AuthContext } from "../context";

import type { AuthContextType } from "../context";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  //lazy initiator function
  const [auth, setAuth] = useState<AuthContextType | null>(() => {
    const saved = localStorage.getItem("auth")
    return saved ? JSON.parse(saved) : null
  });


  //custom handle set function and saving auth details in localstorage
  const handleSetAuth = (authData) =>{
    if(authData){
      localStorage.setItem("auth", JSON.stringify(authData))
    }else(
      localStorage.removeItem("auth")
    )
    setAuth(authData)
  }
  return (
    <AuthContext.Provider value={{ auth, setAuth: handleSetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
