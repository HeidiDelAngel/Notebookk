import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AddNote from './AddNote';
import ViewNote from './ViewNote';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddNote />} />
          <Route path="/note/:id" element={<ViewNote />} />
          <Route path="/note/:id" element={<ViewNote />} />
          
        </Routes>
      </div>
    </Router>
  );
}


export default App;
