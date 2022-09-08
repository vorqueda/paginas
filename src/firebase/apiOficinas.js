import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config";

const collectionName = "oficinas";

export const saveOficina = (newLink) =>
  addDoc(collection(db, collectionName), newLink);

export const updateOficina = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const onGetLinks = (callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

export const getOficinas = () => getDocs(collection(db, collectionName));

export const deleteOficina = (id) => deleteDoc(doc(db, collectionName, id));

export const getOficina = (id) => getDoc(doc(db, collectionName, id));
