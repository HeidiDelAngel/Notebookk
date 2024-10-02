import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const NoteDetailModal = ({ show, handleClose, note }) => {
  if (!note) return null; // Asegúrate de que haya una nota

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card h-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span className="h5">Actividad</span>
            <div className="text-end" style={{ fontSize: "0.85rem" }}>
              <div>
                <strong>Estado:</strong> {note.status}
              </div>
              <div>
                <strong>Prioridad:</strong> {note.priority}
              </div>
              <div>
                <strong>Fecha creación:</strong> {note.creationDate}
              </div>
              <div>
                <strong>Fecha inicio:</strong> {note.startDate}
              </div>
              <div>
                <strong>Fecha finalización:</strong> {note.finishDate} {/* Agregado */}
              </div>
            </div>
          </div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>{note.title}</p>
              <footer className="blockquote-footer">{note.content}</footer> {/* Contenido de la nota */}
            </blockquote>
          </div>
          {/* Nuevo header para el responsable */}
          <div className="card-footer">
            <small className="text-muted">
              <strong>Responsable:</strong> {note.responsible}
            </small>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteDetailModal;
