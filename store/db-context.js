import React, { useState } from 'react';
import { db } from '../config.js/firebase-config';
import { setDoc, collection, getDocs, query, doc } from 'firebase/firestore';
const DbContext = React.createContext({
  myPurchases: [],
  addPurchase: (data, email) => {},
  getPurchases: (email) => {},
});

export const DbContextProvider = (props) => {
  const [purchases, setPurchases] = useState([]);

  const addPurchase = async (data, email) => {
    try {
      console.log('checking the id', data?.id);
      const subCollectionRef = collection(
        db,
        'movie_users',
        email,
        'purchased_tickets'
      );

      const docRef = doc(subCollectionRef, String(data?.id));
      const insertedDoc = await setDoc(docRef, data);
      console.log(insertedDoc);
    } catch (err) {
      console.error(`Error while saving document to collection : ${err}`);
    }
  };

  const getAllPurchases = async (email) => {
    try {
      if (!email) return console.log('no email found');
      console.log(email);
      const q = query(
        collection(db, 'movie_users', email, 'purchased_tickets')
      );
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs;
      setPurchases(documents);
      return documents;
    } catch (err) {
      console.error(
        `Error while getting all documents from collection : ${err}`
      );
      setPurchases([]);
      return null;
    }
  };

  const contextValue = {
    myPurchases: purchases,
    addPurchase: addPurchase,
    getPurchases: getAllPurchases,
  };

  return (
    <DbContext.Provider value={contextValue}>
      {props.children}
    </DbContext.Provider>
  );
};

export default DbContext;
