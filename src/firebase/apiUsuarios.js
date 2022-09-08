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

const collectionName = "users";

export const saveUsuario = (newLink) =>
  addDoc(collection(db, collectionName), newLink);

export const updateUsuario = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

/*export const getUsuario = (id) => {
  const unsub = onSnapshot(collection(db, collectionName), id);
  return unsub;
};
*/
export const getUsuarios = () => getDocs(collection(db, collectionName));

export const deleteUsuario = (id) => deleteDoc(doc(db, collectionName, id));


export const getUsuario = (id) => getDoc(doc(db, collectionName, id));
