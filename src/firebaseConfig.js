// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Si usas Firestore
import { getAuth } from 'firebase/auth'; // Si usas autenticación

// Tus credenciales de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAwJgspfYOcuTnQcRZxK72q1Yyp20jf4Bo",
  authDomain: "libreta-466c9.firebaseapp.com",
  projectId: "libreta-466c9",
  storageBucket: "libreta-466c9.appspot.com",
  messagingSenderId: "821473467102",
  appId: "1:821473467102:web:9136c84db2b058fc51c04f",
  measurementId: "G-D6B4DRZB8J"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Auth si los necesitas
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
