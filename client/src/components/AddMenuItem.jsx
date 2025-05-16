import React, { useState } from 'react';
import './AddMenuItem.css';
const token = localStorage.getItem('adminToken');

function AddMenuItem({ onClose, onItemAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.image) {
      return setError('Please select an image.');
    }

    try {
      setIsUploading(true);

      // 1. Upload the image
      const imageData = new FormData();
      imageData.append('image', formData.image);

      const uploadRes = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: imageData.append,
        Authorization: `Bearer ${token}`
      });

      const uploadResult = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadResult.error || 'Image upload failed');

      // 2. Send the menu item to /api/menu
      const newItem = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: uploadResult.imagePath // e.g. "/burger.jpg"
      };

      const res = await fetch('http://localhost:5000/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
        Authorization: `Bearer ${token}`
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to add menu item');

      // Notify parent and close
      if (onItemAdded) onItemAdded();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="add-menu-item-overlay">
      <div className="add-menu-item-modal">
        <h2>Dodaj Novo Jelo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Naziv jela"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Opis"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Cena"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />

          {error && <p className="error">{error}</p>}

          <div className="button-group">
            <button type="submit" disabled={isUploading}>
              {isUploading ? 'Dodavanje...' : 'Dodaj'}
            </button>
            <button type="button" onClick={onClose}>
              Otkaži
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMenuItem;
