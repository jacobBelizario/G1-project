import React, { useState } from 'react';
import { auth, db } from '../config.js/firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = React.createContext({
  isLoggedIn: false,
  email: '',
  login: (user) => {},
  logout: () => {},
  signUp: (user) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  const logoutHandler = async () => {
    console.log(`logging out...`);
    setEmail(null);
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

      // create user collection
      const collectionRef = collection(
        db,
        'movie_users',
        user?.email,
        'user_profile'
      );
      const docRef = doc(collectionRef, user?.email);
      await setDoc(docRef, {
        email: user?.email,
        password: user?.password,
      });

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

      // check if there's a user collection for the logged in user
      const subCollectionRef = collection(
        db,
        'movie_users',
        user?.email,
        'user_profile'
      );
      const docRef = doc(subCollectionRef, user?.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // The document exists.
        const data = docSnap.data();
        console.log('Document data:', data);
      } else {
        // user not found
        // create user collection
        const collectionRef = collection(
          db,
          'movie_users',
          user?.email,
          'user_profile'
        );
        const docRef = doc(collectionRef, user?.email);
        await setDoc(docRef, {
          email: user?.email,
          password: user?.password,
        });
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
