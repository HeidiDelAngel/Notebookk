import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { notesData } from './data';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NoteDetailModal from './NoteDetailModal';
import EditIcon from '@mui/icons-material/Edit';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    responsible: '',
    priority: '',
    noteType: '',
    startDate: '',
    finishDate: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleShowModal = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNote(null);
  };

  const filteredNotes = notesData.filter(note => {
    const matchesSearchTerm =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesStatus = filters.status ? note.status === filters.status : true;
    const matchesResponsible = filters.responsible 
      ? note.responsible.toLowerCase().includes(filters.responsible.toLowerCase()) 
      : true;
    const matchesPriority = filters.priority ? note.priority === filters.priority : true;
    const matchesNoteType = filters.noteType ? note.noteType === filters.noteType : true;
    const matchesStartDate = filters.startDate ? new Date(note.startDate) >= new Date(filters.startDate) : true;
    const matchesFinishDate = filters.finishDate ? new Date(note.finishDate) <= new Date(filters.finishDate) : true;
  
    return (
      matchesSearchTerm &&
      matchesStatus &&
      matchesResponsible &&
      matchesPriority &&
      matchesNoteType &&
      matchesStartDate &&
      matchesFinishDate
    );
  });  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center">Pendientes y Actividades</h1>

      {/* Barra de Búsqueda */}
      <div className="row mb-4">
        <div className="col-12 col-md-8 offset-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar notas..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Contenedor para filtros */}
      <div className="row mb-4">
        <div className="col-12">
          <h5>Filtrar por:</h5>
          <div className="row g-3">
            <div className="col-12 col-md-2">
              <select className="form-select" name="status" onChange={handleFilterChange}>
                <option value="">Estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
            <div className="col-12 col-md-2">
              <input
                type="text"
                className="form-control"
                name="responsible"
                placeholder="Responsable"
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-12 col-md-2">
              <select className="form-select" name="priority" onChange={handleFilterChange}>
                <option value="">Prioridad</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
            <div className="col-12 col-md-2">
              <select className="form-select" name="noteType" onChange={handleFilterChange}>
                <option value="">Tipo</option>
                <option value="Evento">Evento</option>
                <option value="Actividad">Actividad</option>
                <option value="Pendiente">Pendiente</option>
              </select>
            </div>
            <div className="col-12 col-md-2">
              <label htmlFor="startDate">Fecha de Inicio</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-12 col-md-2">
              <label htmlFor="finishDate">Fecha de Finalización</label>
              <input
                type="date"
                className="form-control"
                name="finishDate"
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Notas Responsiva */}
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Acciones</th>
                  <th>Título</th>
                  <th>Tipo</th>
                  <th>Prioridad</th>
                  <th>Fecha de Creación</th>
                  <th>Fecha de Inicio</th>
                  <th>Fecha de Finalización</th>
                  <th>Estado</th>
                  <th>Responsable</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotes.map(note => (
                  <tr key={note.id}>
                    <td>
                      <Link to={`/note/${note.id}`} className="btn btn">
                        <EditIcon />
                      </Link>
                      <button
                        className="btn btn"
                        onClick={() => handleShowModal(note)}
                      >
                        <VisibilityIcon />
                      </button>
                    </td>
                    <td>{note.title}</td>
                    <td>{note.noteType}</td>
                    <td>{note.priority}</td>
                    <td>{note.creationDate}</td>
                    <td>{note.startDate}</td>
                    <td>{note.finishDate}</td>
                    <td>{note.status}</td>
                    <td>{note.responsible}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Botón para agregar nueva nota */}
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 text-center">
          <Link to="/add" className="btn btn-primary">Agregar Nueva Nota</Link>
        </div>
      </div>

      {/* Modal para mostrar los detalles de la nota */}
      <NoteDetailModal
        show={showModal}
        handleClose={handleCloseModal}
        note={selectedNote}
      />
    </div>
  );
};

export default Home;
