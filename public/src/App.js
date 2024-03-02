import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FormPhoto from './components/FormPhoto';
import PhotoDisplay from './components/PhotoDisplay';
import { FaCirclePlus } from "react-icons/fa6";

function App() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="App">
      <div> <div id="plusSpace">
        <Navbar />
        <div className="content">
          <PhotoDisplay />
          {showForm && <div className="form-popup"><FormPhoto onClose={() => setShowForm(false)} /></div>}
        </div>
      </div>
      </div>
      <div className="floating-button">
        <button onClick={toggleForm}><FaCirclePlus /></button>
      </div>
    </div>
  );
}

export default App;
