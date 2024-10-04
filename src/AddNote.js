// src/AddNote.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { collection, addDoc } from 'firebase/firestore'; // Importa Firestore

const AddNote = () => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    priority: 'Media',
    creationDate: new Date().toLocaleDateString(),
    startDate: '',
    finishDate: '',
    responsible: '',
    status: 'Pendiente',
    noteType: 'Actividad',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Maneja el checkbox para el estado
    if (type === 'checkbox') {
      setNote((prevNote) => ({
        ...prevNote,
        status: checked ? 'Completado' : 'Pendiente'
      }));
    } else {
      setNote((prevNote) => ({
        ...prevNote,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el envío del formulario por defecto
    try {
      // Verifica que todos los campos requeridos estén completos
      if (!note.title || !note.content || !note.startDate || !note.responsible) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
      }

      // Log de los datos a enviar
      console.log("Datos a enviar a Firestore:", note);

      // Agrega la nota a Firestore
      const docRef = await addDoc(collection(db, 'libreta'), note);
      console.log("Nota guardada con ID:", docRef.id);

      // Opcional: Limpiar el estado después de guardar
      setNote({
        title: '',
        content: '',
        priority: 'Media',
        creationDate: new Date().toLocaleDateString(),
        startDate: '',
        finishDate: '',
        responsible: '',
        status: 'Pendiente',
        noteType: 'Actividad',
      });

      // Navegar a la pantalla principal
      navigate('/');
    } catch (error) {
      console.error("Error al agregar la nota: ", error);

      // Manejo de errores
      if (error.code === 'permission-denied') {
        alert("No tienes permiso para agregar notas. Verifica las reglas de seguridad en Firestore.");
      } else {
        alert("Hubo un error al guardar la nota. Por favor, intenta de nuevo.");
      }
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-8">
        <h2>Agregar Nueva Nota</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={note.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Contenido</label>
            <textarea
              className="form-control"
              name="content"
              value={note.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group mt-3">
            <label>Prioridad</label>
            <select
              className="form-control"
              name="priority"
              value={note.priority}
              onChange={handleChange}
            >
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label>Tipo de Nota</label>
            <select
              className="form-control"
              name="noteType"
              value={note.noteType}
              onChange={handleChange}
            >
              <option>Evento</option>
              <option>Actividad</option>
              <option>Pendiente</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label>Fecha de Inicio</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={note.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Fecha de Finalización</label>
            <input
              type="date"
              className="form-control"
              name="finishDate"
              value={note.finishDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mt-3">
            <label>Persona Responsable</label>
            <input
              type="text"
              className="form-control"
              name="responsible"
              value={note.responsible}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>
              <input
                type="checkbox"
                name="status"
                checked={note.status === 'Completado'}
                onChange={handleChange}
              />
              {' '}¿Completado?
            </label>
          </div>

          {/* Botón centrado */}
          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-success">
              Guardar Nota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
