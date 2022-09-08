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

const collectionName = "tareas";

export const saveTarea = (newLink) =>
  addDoc(collection(db, collectionName), newLink);

export const updateTarea = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const onGetLinks = (callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

export const getTareas = () => getDocs(collection(db, collectionName));

export const deleteTarea = (id) => deleteDoc(doc(db, collectionName, id));

export const getTarea = (id) => getDoc(doc(db, collectionName, id));

export const getOficinas = () => getDocs(collection(db, "oficinas"));

export const getOficina = (id) => getDoc(doc(db, "oficinas", id));