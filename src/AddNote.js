import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from './data';

const AddNote = () => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    priority: 'Media',
    creationDate: new Date().toLocaleDateString(),
    startDate: '',
    finishDate: '',
    responsible: '',
    status: 'Pendiente', // Estado predeterminado
    noteType: 'Actividad', // Tipo de nota predeterminado
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Si es checkbox, se maneja el estado como completado/no completado
    if (type === 'checkbox') {
      setNote(prevNote => ({
        ...prevNote,
        status: checked ? 'Completado' : 'Pendiente'
      }));
    } else {
      setNote(prevNote => ({
        ...prevNote,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note); // Añadir la nota
    navigate('/'); // Volver a la pantalla principal
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
