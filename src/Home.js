import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { notesData } from './data';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    responsible: '',
    priority: '',
    startDate: '',
    finishDate: ''
  });

  // Filtrar notas basado en múltiples criterios
  const filteredNotes = notesData.filter(note => {
    const matchesSearchTerm =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status ? note.status === filters.status : true;
    const matchesResponsible = filters.responsible ? note.responsible.includes(filters.responsible) : true;
    const matchesPriority = filters.priority ? note.priority === filters.priority : true;
    const matchesStartDate = filters.startDate ? note.startDate === filters.startDate : true;
    const matchesFinishDate = filters.finishDate ? note.finishDate === filters.finishDate : true;

    return (
      matchesSearchTerm &&
      matchesStatus &&
      matchesResponsible &&
      matchesPriority &&
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
    <div className="container mt-5">
      <h1>Pendientes y Actividades</h1>

      {/* Barra de Búsqueda */}
      <div className="row mb-4">
        <div className="col-md-8 offset-md-2">
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
        <div className="col-md-12">
          <h5>Filtrar por:</h5>
          <div className="row">
            <div className="col-md-2">
              <select className="form-select" name="status" onChange={handleFilterChange}>
                <option value="">Estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                name="responsible"
                placeholder="Responsable"
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <select className="form-select" name="priority" onChange={handleFilterChange}>
                <option value="">Prioridad</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                name="startDate"
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
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

      {/* Tabla de Notas */}
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Acciones</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Prioridad</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Creación</th>
                <th>Estado</th>
                <th>Persona Responsable</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.map(note => (
                <tr key={note.id}>
                  <td>
                    <Link to={`/note/${note.id}`} className="btn btn">
                      <VisibilityIcon />
                    </Link>
                  </td>
                  <td>{note.title}</td>
                  <td>{note.noteType}</td>
                  <td>{note.priority}</td>
                  <td>{note.startDate}</td>
                  <td>{note.creationDate}</td>
                  <td>{note.responsible}</td>
                  <td>{note.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botón para agregar nueva nota */}
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <Link to="/add" className="btn btn-primary">Agregar Nueva Nota</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
