/*
  Context will be used to store the user data
*/

import { createContext, useState, useContext, useEffect } from "react";
import axios from "../api/axios.js";
import Cookie from "js-cookie";

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
  const [loading, setLoading] = useState(true);

  const signup = async (data) => {
    try {
      const res = await axios.post("/signup", data, {
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
      const res = await axios.post(`/signin`, data);
      setUser(res.data);
      setIsAuth(true);
      console.log("login success");
      return res.data;
    } catch (err) {
      console.log(err);
      if (Array.isArray(err.response.data)) return setErrors(err.response.data);
      else setErrors([err.response.data.message]);
    }
  };

  const signout = async () => {
    try {
      const res = await axios.post(`/signout`);
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    console.log(Cookie.get());
    if (Cookie.get("token")) {
      // get profile
      axios
        .get(`/profile`)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          setIsAuth(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
          setIsAuth(false);
          setLoading(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      // any components that are wrapped in the AuthProvider will have access to the user, isAuth, and errors state
      value={{
        user,
        isAuth,
        errors,
        signup,
        signin,
        signout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
