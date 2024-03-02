import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, set } from 'firebase/database';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

const PhotoDisplay = () => {
  const [images, setImages] = useState([]);

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
            liked: false  // Add a 'liked' property to each image
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
        // Toggle the 'liked' status of the image
        const updatedLiked = !image.liked;
        // Update the 'liked' status in the database
        const database = getDatabase();
        set(ref(database, `items/${id}/liked`), updatedLiked);
        // Return the updated image object
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

  return (
    <div>
      <h2>Photo Gallery</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {images.map(image => (
          <div key={image.id} style={{ position: 'relative', width: '250px', height: '250px', overflow: 'hidden', borderRadius: '8px' }}>
            <img src={image.imageUrl} alt={image.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <FavoriteIcon color={image.liked ? 'secondary' : 'action'} onClick={() => handleLike(image.id)} style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }} />
            <DeleteIcon onClick={() => handleDelete(image.id)} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} />
            <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: '#fff', fontSize: '12px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ margin: '2px', textAlign: 'left' }}>
                <div>{image.description}</div>
                <div>{formatDate(image.timestamp)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>~by {image.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoDisplay;
