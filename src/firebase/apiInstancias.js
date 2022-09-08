import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  documentId,
  document
} from "firebase/firestore";
import { db } from "./config";

const collectionName = "tareas";


export const onGetLinks = (callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

//export const getTareas = () => getDocs(collection(db, collectionName));

export const getInstancias = (id) => getDocs(collection(db, "tareas", id, "instancias"));

export const getInstancia = (tareaid, instanciaid) => 
getDocs(collection(db,"tareas",tareaid,"instancias")) ;

//export const getUsers = () => getDocs(collection(db, "users"));

//export const getOficina = (id) => getDoc(doc(db, "oficinas", id));
export const saveInstancia = (tareaid, instanciaid) =>
  addDoc(collection(db, "tareas", tareaid, "instancias"), instanciaid);

export const updateInstancia = (tareaid, instanciaid, instancia) =>
  updateDoc(doc(db, "tareas", tareaid, "instancias", instanciaid), instancia);

export const deleteInstancia = (tareaid, instanciaid) => deleteDoc(doc(db, "tareas", tareaid, "instancias", instanciaid));
