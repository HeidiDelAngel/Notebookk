import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, updateNote, deleteNote } from './data';

const ViewNote = () => {
  const { id } = useParams();
  const note = getNoteById(parseInt(id));
  const [editableNote, setEditableNote] = useState({ ...note });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setEditableNote(prevNote => ({
        ...prevNote,
        status: checked ? 'Completado' : 'Pendiente'
      }));
    } else {
      setEditableNote(prevNote => ({
        ...prevNote,
        [name]: value
      }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateNote(editableNote);
    navigate('/');
  };

  const handleDelete = () => {
    deleteNote(id);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Ver Nota</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={editableNote.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mt-3">
          <label>Contenido</label>
          <textarea
            className="form-control"
            name="content"
            value={editableNote.content}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group mt-3">
          <label>Prioridad</label>
          <select
            className="form-control"
            name="priority"
            value={editableNote.priority}
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
            value={editableNote.noteType}
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
            value={editableNote.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mt-3">
          <label>Fecha de Finalización</label>
          <input
            type="date"
            className="form-control"
            name="finishDate"
            value={editableNote.finishDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mt-3">
          <label>Persona Responsable</label>
          <input
            type="text"
            className="form-control"
            name="responsible"
            value={editableNote.responsible}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mt-3">
          <label>
            <input
              type="checkbox"
              name="status"
              checked={editableNote.status === 'Completado'}
              onChange={handleChange}
            />
            {' '}¿Completado?
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Actualizar Nota
        </button>
        <button type="button" className="btn btn-danger mt-3 ms-3" onClick={handleDelete}>
          Eliminar Nota
        </button>
      </form>
    </div>
  );
};

export default ViewNote;
