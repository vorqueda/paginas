import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBuLg4fry-x-DrXg2CfgdX4SdIo-sUFgH0',
  authDomain: 'prueba1-192bc.firebaseapp.com',
  databaseURL: 'https://prueba1-192bc.firebaseio.com',
  projectId: 'prueba1-192bc',
  storageBucket: 'prueba1-192bc.appspot.com',
  messagingSenderId: '1058085418340',
  appId: '1:1058085418340:web:bedc3ecf75f3d45aa73671',
  measurementId: 'G-Z5RKTN7PL9'
};
// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
