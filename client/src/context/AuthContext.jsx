/*
  Context will be used to store the user data
*/

import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  return (
    <AuthContext.Provider
      // any components that are wrapped in the AuthProvider will have access to the user, isAuth, and errors state
      value={{
        user,
        isAuth,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
