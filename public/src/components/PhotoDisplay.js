// PhotoDisplay.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, set } from 'firebase/database';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import './PhotoDisplayStyles.css';

const PhotoDisplay = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const itemsRef = ref(database, 'items');
      onValue(itemsRef, (snapshot) => {
        const itemsData = snapshot.val();
        if (itemsData) {
          const itemsArray = Object.keys(itemsData).map(key => ({
            id: key,
            ...itemsData[key],
            liked: false
          }));
          setImages(itemsArray);
        } else {
          setImages([]);
        }
      });
    };

    fetchData();
  }, []);

  const handleLike = (id) => {
    const updatedImages = images.map(image => {
      if (image.id === id) {
        const updatedLiked = !image.liked;
        const database = getDatabase();
        set(ref(database, `items/${id}/liked`), updatedLiked);
        return { ...image, liked: updatedLiked };
      }
      return image;
    });

    setImages(updatedImages);
  };

  const handleDelete = (id) => {
    const database = getDatabase();
    remove(ref(database, `items/${id}`));
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="photo-container">
      {images.map(image => (
        <div key={image.id} onClick={() => setSelectedImage(image)} className="photo-item">
          <img src={image.imageUrl} alt={image.name} />
          <FavoriteIcon
            color={image.liked ? 'secondary' : 'action'}
            onClick={(e) => {e.stopPropagation(); handleLike(image.id)}}
            className="icon like-icon"
          />
          <DeleteIcon
            onClick={(e) => {e.stopPropagation(); handleDelete(image.id)}}
            className="icon delete-icon"
          />
          <div className="info">
            <div>
              <div>{image.description}</div>
              <div>{formatDate(image.timestamp)}</div>
            </div>
            <div className="author">~by {image.name}</div>
          </div>
        </div>
      ))}
      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <img src={selectedImage.imageUrl} alt={selectedImage.name} />
            <button onClick={handleCloseModal} className="close-btn">X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoDisplay;

