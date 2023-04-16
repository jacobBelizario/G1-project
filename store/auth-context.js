import React, { useCallback, useEffect, useState } from "react";
import { auth, db } from "../config.js/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";

const AuthContext = React.createContext({
  isLoggedIn: false,
  email: "",
  login: (user) => {},
  logout: () => {},
  signUp: (user) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  const logoutHandler = async () => {
    await signOut(auth);
    setEmail(null);
    setIsLoggedIn(false);
  };

  const loginHandler = async (user) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        user?.email,
        user?.password
      );
      setEmail(userCredentials.user.email);
      setIsLoggedIn(true);
      return {
        status: true,
        message: null,
        user: userCredentials.user,
      };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        message: error.message,
      };
    }
  };

  const signUpHandler = async (user) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        user?.email,
        user?.password
      );
      setEmail(userCredentials.user.email);
      setIsLoggedIn(true);
      return {
        status: true,
        message: null,
        user: userCredentials.user,
      };
    } catch (error) {
      console.error(error);

      return {
        status: false,
        message: error.message,
      };
    }
  };

  const contextValue = {
    isLoggedIn: isLoggedIn,
    email: email,
    login: loginHandler,
    logout: logoutHandler,
    signup: signUpHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
