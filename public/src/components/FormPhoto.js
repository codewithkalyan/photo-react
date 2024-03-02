import React, { useState, useRef, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database';
import './FormPhotoStyles.css'; // Import the CSS file for styling

const firebaseConfig = {
  apiKey: "AIzaSyA2yfwL5s4ZSsYN7aiFc39Fnt8yE-MdCP0",
  authDomain: "sampleone-kalyan.firebaseapp.com",
  	   databaseURL: "https://sampleone-kalyan-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "sampleone-kalyan",
  storageBucket: "sampleone-kalyan.appspot.com",
  messagingSenderId: "731094145622",
  appId: "1:731094145622:web:ac8cd74373f780a85bf9f7",
  measurementId: "G-XMX9QK7FKM" 
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const FormPhoto = ({ onClose }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const formRef = useRef(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    push(ref(database, 'items'), {
      name: name,
      imageUrl: imageUrl,
      description: description,
      timestamp: serverTimestamp()
    });
    setName('');
    setImageUrl('');
    setDescription('');
    onClose();
  };

  const handleCancel = () => {
    setName('');
    setImageUrl('');
    setDescription('');
    onClose();
  };

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={formRef} className="form-popup">
  <h2>Add Photo</h2>
  <div className="form-group">
    <label htmlFor="name">Photographer Name:</label>
    <input type="text" id="name" value={name} onChange={handleNameChange} />
  </div>
  <div className="form-group">
    <label htmlFor="imageUrl">Image URL:</label>
    <input type="text" id="imageUrl" value={imageUrl} onChange={handleImageUrlChange} />
  </div>
  <div className="form-group">
    <label htmlFor="description">Description:</label>
    <textarea id="description" value={description} onChange={handleDescriptionChange} />
  </div>
  <div>
    <button onClick={handleSubmit} className="submit-button">Submit</button>
    <button onClick={handleCancel} className="cancel-button">Cancel</button>
  </div>
</div>

  );
};

export default FormPhoto;
