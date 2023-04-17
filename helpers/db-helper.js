import React, { useContext } from "react";
import { auth, db } from "../config.js/firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import AuthContext from "../store/auth-context";

export const getAllUserPurchase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db));
  } catch (error) {
    console.log("error");
  }
};

export const addUser = async (context, data) => {
  try {
    const addUser = await addDoc(collection(db, "users"), {
      user: context.email,
    });
    const addSubcollection = await addDoc(
      collection(db, "users").doc(addUser.uid).collection("purchases"),
      data
    );
  } catch (error) {
    console.log("error");
  }
};
