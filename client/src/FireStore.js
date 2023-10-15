import React, { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getDatabase, update } from "firebase/database";
import { app } from "./Firebase";
const fireStore = getFirestore(app);
const db = getDatabase(app);
const FireStore = () => {
  const writeData = async () => {
    const result = await addDoc(collection(fireStore, "food"), {
      name: "Shawarma",
      Cost: 100,
    });
    console.log(result);
  };
  const subData = async () => {
    const parentDocRef = doc(fireStore, "food", "XaI4wjpEkv6tJQlpfTmf");

    // Create a reference to the subcollection
    const subcollectionRef = collection(parentDocRef, "places");

    // The data you want to add to the subcollection
    const data = {
      desc: "Awesome food",
    };
    const res = await addDoc(subcollectionRef, data);

    console.log(res);
  };
  const getDocument = async () => {
    const res = await doc(fireStore, "food", "XaI4wjpEkv6tJQlpfTmf");
    const data = await getDoc(res);
    console.log(data.data());
  };

  const queryData = async () => {
    const ref = collection(fireStore, "users");
    const q = query(ref, where("isMale", "==", true));
    const data = await getDocs(q);
    data.forEach((d) => {
      console.log(d.data());
    });
  };
  const updatedoc = () => {
    const parentDocRef = doc(fireStore, "food", "XaI4wjpEkv6tJQlpfTmf");
    const data = updateDoc(parentDocRef,{
      price:1000
    })
  };
  return (
    <div>
      FireStore
      <button onClick={writeData}>Write Data</button>
      <button onClick={subData}>Put Sub Data</button>
      <button onClick={getDocument}>Read Data</button>
      <button onClick={queryData}>Query Data</button>
      <button onClick={updatedoc}>Update Document</button>
    </div>
  );
};

export default FireStore;
