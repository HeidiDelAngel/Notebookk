// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Si usas Firestore
import { getAuth } from 'firebase/auth'; // Si usas autenticación

// Tus credenciales de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAzp8nhIT50kY0IsgIYEcEBecQ6QMRJYYI",
  authDomain: "agenda-invisible.firebaseapp.com",
  projectId: "agenda-invisible",
  storageBucket: "agenda-invisible.appspot.com",
  messagingSenderId: "760772303782",
  appId: "1:760772303782:web:81baf72eaa456189078d67",
  measurementId: "G-41THKTSPEC"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Auth si los necesitas
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
