import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, updateNote, deleteNote } from "./data";

const ViewNote = () => {
  const { id } = useParams();
  const [editableNote, setEditableNote] = useState(null); // Initialize as null
  const navigate = useNavigate();

  // Fetch note data when the component mounts
  useEffect(() => {
    const fetchNote = async () => {
      const note = await getNoteById(id);
      setEditableNote(note); // Set the note data to state
    };

    fetchNote();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setEditableNote((prevNote) => ({
        ...prevNote,
        status: checked ? "Completado" : "Pendiente",
      }));
    } else {
      setEditableNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    }
  };

  // Handle updating the note
  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateNote(editableNote);
    navigate("/"); // Navigate back to the home page after updating
  };

  // Handle deleting the note
  const handleDelete = async () => {
    await deleteNote(id);
    navigate("/"); // Navigate back to the home page after deleting
  };

  // Show loading or error state if editableNote is not loaded
  if (!editableNote) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-8">
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
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
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
              <option value="Evento">Evento</option>
              <option value="Actividad">Actividad</option>
              <option value="Pendiente">Pendiente</option>
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
                checked={editableNote.status === "Completado"}
                onChange={handleChange}
              />{" "}
              ¿Completado?
            </label>
          </div>

          {/* Botones centrados */}
          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-primary me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M14 4l0 4l-6 0l0 -4" />
              </svg>
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-eraser"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
                <path d="M18 13.3l-6.3 -6.3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewNote;
