import { collection, addDoc, getDoc, doc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Asegúrate de tener configurada la conexión a Firebase aquí

// Función para agregar una nueva nota
export const addNote = async (note) => {
  try {
    const docRef = await addDoc(collection(db, "libreta"), note);
    console.log("Nota agregada con ID: ", docRef.id);
    return docRef.id; // Retorna el ID de la nueva nota
  } catch (e) {
    console.error("Error al agregar la nota: ", e);
  }
};

// Función para obtener una nota por su ID
export const getNoteById = async (id) => {
  try {
    const docRef = doc(db, "libreta", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No existe el documento");
      return null;
    }
  } catch (e) {
    console.error("Error al obtener la nota: ", e);
  }
};

// Función para actualizar una nota
export const updateNote = async (updatedNote) => {
  try {
    const noteRef = doc(db, "libreta", updatedNote.id);
    await updateDoc(noteRef, updatedNote);
    console.log("Nota actualizada con éxito");
  } catch (e) {
    console.error("Error al actualizar la nota: ", e);
  }
};

// Función para eliminar una nota por ID
export const deleteNote = async (id) => {
  try {
    await deleteDoc(doc(db, "libreta", id));
    console.log("Nota eliminada con éxito");
  } catch (e) {
    console.error("Error al eliminar la nota: ", e);
  }
};

// Función para obtener todas las notas
export const getAllNotes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "libreta"));
    const notesArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return notesArray;
  } catch (e) {
    console.error("Error al obtener las notas: ", e);
    return [];
  }
};