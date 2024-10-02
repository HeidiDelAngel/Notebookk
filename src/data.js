export let notesData = [
    {
      id: 1,
      title: 'Primera Nota',
      content: 'Contenido de la primera nota',
      priority: 'Alta',
      creationDate: '01/01/2024',
      startDate: '01/01/2024',
      finishDate: '10/01/2024',
      responsible: 'Juan Pérez',
      status: 'Pendiente',
      noteType: 'Evento'
    },
    {
      id: 2,
      title: 'Segunda Nota',
      content: 'Contenido de la segunda nota',
      priority: 'Media',
      creationDate: '02/01/2024',
      startDate: '02/01/2024',
      finishDate: '15/01/2024',
      responsible: 'Ana Gómez',
      status: 'Completado',
      noteType: 'Actividad'
    }
  ];
  
  
  export const addNote = (note) => {
    note.id = notesData.length + 1;
    notesData.push(note);
  };
  
  export const getNoteById = (id) => {
    return notesData.find(note => note.id === id);
  };
  
  export const updateNote = (updatedNote) => {
    notesData = notesData.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
  };
  
  export const deleteNote = (id) => {
    notesData = notesData.filter(note => note.id !== parseInt(id));
  };
  