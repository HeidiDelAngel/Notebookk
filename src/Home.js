import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNotes, notesData } from "./data";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import NoteDetailModal from './NoteDetailModal';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    responsible: "",
    priority: "",
    noteType: "",
    startDate: "",
    finishDate: "",
  });

  const [showFilters, setShowFilters] = useState({
    responsible: false,
    startDate: false,
    finishDate: false,
    priority: false,
    noteType: false,
    status: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getAllNotes();
      setNotes(fetchedNotes);
    };
    fetchNotes();
  }, []);

  const handleShowModal = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNote(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const clearFilter = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: "",
    }));
    setShowFilters((prevShowFilters) => ({
      ...prevShowFilters,
      [filterName]: false, // Oculta el campo de filtro al limpiar
    }));
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearchTerm =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesStatus = filters.status ? note.status === filters.status : true;
    const matchesResponsible = filters.responsible
      ? note.responsible.toLowerCase().includes(filters.responsible.toLowerCase())
      : true;
    const matchesPriority = filters.priority ? note.priority === filters.priority : true;
    const matchesNoteType = filters.noteType ? note.noteType === filters.noteType : true;
  
    // Aquí modificamos para que coincida con el día exacto
    const matchesStartDate = filters.startDate
      ? new Date(note.startDate).toDateString() === new Date(filters.startDate).toDateString()
      : true;
    const matchesFinishDate = filters.finishDate
      ? new Date(note.finishDate).toDateString() === new Date(filters.finishDate).toDateString()
      : true;
  
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
  

  return (
    <div className="container mt-5" style={{ maxWidth: "1400px" }}>
      <h1 className="text-center">Pendientes y Actividades</h1>

      {/* Barra de Búsqueda */}
      <div className="row mb-4">
        <div className="col-12 col-md-8 offset-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar notas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Acciones</th>
                  <th>Título</th>
                  <th>
                    Tipo
                    <FilterListIcon
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                      onClick={() => setShowFilters((prev) => ({ ...prev, noteType: !prev.noteType }))}
                    />
                    {showFilters.noteType && (
                      <div>
                        <select
                          className="form-select form-select-sm mt-2"
                          name="noteType"
                          onChange={handleFilterChange}
                        >
                          <option value="">Seleccionar Tipo</option>
                          <option value="Evento">Evento</option>
                          <option value="Actividad">Actividad</option>
                          <option value="Pendiente">Pendiente</option>
                        </select>
                        {filters.noteType && (
                          <button
                            className="btn btn-sm btn-danger mt-2"
                            onClick={() => clearFilter("noteType")}
                          >
                            Limpiar
                          </button>
                        )}
                      </div>
                    )}
                  </th>
                  <th>
                    Prioridad
                    <FilterListIcon
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                      onClick={() => setShowFilters((prev) => ({ ...prev, priority: !prev.priority }))}
                    />
                    {showFilters.priority && (
                      <div>
                        <select
                          className="form-select form-select-sm mt-2"
                          name="priority"
                          onChange={handleFilterChange}
                        >
                          <option value="">Seleccionar Prioridad</option>
                          <option value="Alta">Alta</option>
                          <option value="Media">Media</option>
                          <option value="Baja">Baja</option>
                        </select>
                        {filters.priority && (
                          <button
                            className="btn btn-sm btn-danger mt-2"
                            onClick={() => clearFilter("priority")}
                          >
                            Limpiar
                          </button>
                        )}
                      </div>
                    )}
                  </th>
                  <th>Fecha de Creación</th>
                  <th>
                    Fecha de Inicio
                    <FilterListIcon
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                      onClick={() => setShowFilters((prev) => ({ ...prev, startDate: !prev.startDate }))}
                    />
                    {showFilters.startDate && (
                      <div>
                        <input
                          type="date"
                          className="form-control form-control-sm mt-2"
                          name="startDate"
                          onChange={handleFilterChange}
                        />
                        {filters.startDate && (
                          <button
                            className="btn btn-sm btn-danger mt-2"
                            onClick={() => clearFilter("startDate")}
                          >
                            Limpiar
                          </button>
                        )}
                      </div>
                    )}
                  </th>
                  <th>
                    Fecha de Finalización
                    <FilterListIcon
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                      onClick={() => setShowFilters((prev) => ({ ...prev, finishDate: !prev.finishDate }))}
                    />
                    {showFilters.finishDate && (
                      <div>
                        <input
                          type="date"
                          className="form-control form-control-sm mt-2"
                          name="finishDate"
                          onChange={handleFilterChange}
                        />
                        {filters.finishDate && (
                          <button
                            className="btn btn-sm btn-danger mt-2"
                            onClick={() => clearFilter("finishDate")}
                          >
                            Limpiar
                          </button>
                        )}
                      </div>
                    )}
                  </th>
                  <th>
                    Estado
                    <FilterListIcon
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                      onClick={() => setShowFilters((prev) => ({ ...prev, status: !prev.status }))}
                    />
                    {showFilters.status && (
                      <div>
                        <select
                          className="form-select form-select-sm mt-2"
                          name="status"
                          onChange={handleFilterChange}
                        >
                          <option value="">Seleccionar Estado</option>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Completado">Completado</option>
                        </select>
                        {filters.status && (
                          <button
                            className="btn btn-sm btn-danger mt-2"
                            onClick={() => clearFilter("status")}
                          >
                            Limpiar
                          </button>
                        )}
                      </div>
                    )}
                  </th>
                  <th>
                    Responsable
                    <FilterListIcon
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                      onClick={() => setShowFilters((prev) => ({ ...prev, responsible: !prev.responsible }))}
                    />
                    {showFilters.responsible && (
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm mt-2"
                          name="responsible"
                          placeholder="Responsable"
                          onChange={handleFilterChange}
                        />
                        {filters.responsible && (
                          <button
                            className="btn btn-sm btn-danger mt-2"
                            onClick={() => clearFilter("responsible")}
                          >
                            Limpiar
                          </button>
                        )}
                      </div>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredNotes.map((note) => (
                  <tr key={note.id}>
                    <td>
                      <Link to={`/note/${note.id}`} className="btn btn">
                        <EditIcon />
                      </Link>
                      <button className="btn btn" onClick={() => handleShowModal(note)}>
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
        <div className="col-md-8 offset-md-2 d-flex justify-content-center">
          <Link to="/add" className="btn btn-primary mb-3">
            Agregar Nueva Nota
          </Link>
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
