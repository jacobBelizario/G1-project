import React, { useCallback, useEffect, useState } from "react";
import { auth, db } from "../config.js/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const AuthContext = React.createContext({
  isLoggedIn: false,
  email: "",
  uid: "",
  login: (user) => {},
  logout: () => {},
  signUp: (user) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [uid, setUid] = useState(null);

  const logoutHandler = async () => {
    console.log(`logging out...`);
    setEmail(null);
    setUid(null);
    setIsLoggedIn(false);
    await signOut(auth);
  };

  const signupHandler = async (user) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        user?.email,
        user?.password
      );

      // create user collection and set UID
      const collectionRef = collection(db, "movie_users");
      const insertedDoc = await addDoc(collectionRef, {
        email: user?.email,
        password: user?.password,
      });
      setUid(insertedDoc.id);
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

  const loginHandler = async (user) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        user?.email,
        user?.password
      );

      const collectionRef = collection(db, "movie_users");
      const filter = where("email", "==", user?.email);
      const q = query(collectionRef, filter);
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs;

      console.log(`Number of documents received : ${documents.length}`);

      if (documents.length > 0) {
        for (let i = 0; i < documents.length; i++) {
          setUid(documents[i].id);
        }
      } else {
        console.error(`no matching user found for ${user?.email}`);
      }
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
    uid: uid,
    login: loginHandler,
    signup: signupHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
