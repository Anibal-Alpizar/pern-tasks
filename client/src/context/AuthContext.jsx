/*
  Context will be used to store the user data
*/

import { createContext, useState, useContext } from "react";
import axios from "axios";

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

  const signup = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/signup", data, {
        withCredentials: true,
      });
      setUser(res.data);
      setIsAuth(true);
      return res.data;
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data))
        return setErrors(error.response.data);
      else setErrors([error.response.data.message]);
    }
  };

  const signin = async (data) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/signin`, data, {
        withCredentials: true,
      });
      setUser(res.data);
      setIsAuth(true);
      return res.data;
    } catch (err) {
      console.log(err);
      if (Array.isArray(err.response.data)) return setErrors(err.response.data);
      else setErrors([err.response.data.message]);
    }
  };

  return (
    <AuthContext.Provider
      // any components that are wrapped in the AuthProvider will have access to the user, isAuth, and errors state
      value={{
        user,
        isAuth,
        errors,
        signup,
        signin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
