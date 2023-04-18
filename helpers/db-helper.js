import { db } from "../config.js/firebase-config";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

export const getAllUserPurchase = async (uid) => {
  try {
    const q = query(collection(db, "movie_users", uid, "purchased_tickets"));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs;

    return documents;
  } catch (err) {
    console.error(`Error while getting all documents from collection : ${err}`);
    return null;
  }
};

export const addSubcollection = async (data, uid) => {
  try {
    const subCollectionRef = collection(
      db,
      "movie_users",
      uid,
      "purchased_tickets"
    );
    const insertedDoc = await addDoc(subCollectionRef, data);
    console.log(`Employee added successfully : ${insertedDoc.id}`);
  } catch (err) {
    console.error(`Error while saving document to collection : ${err}`);
  }
};
