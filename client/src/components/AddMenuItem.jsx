import React, { useState, useEffect } from 'react';
import './AddMenuItem.css';

function AddMenuItem({ onClose, onItemAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    setToken(storedToken);
  }, []);

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
    if (!formData.image) return setError('Molimo izaberite sliku.');

    if (!token) return setError('Admin nije prijavljen.');

    try {
      setIsUploading(true);

      // 1. Upload the image
      const imageData = new FormData();
      imageData.append('image', formData.image);

      const uploadRes = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: imageData
      });

      const uploadResult = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadResult.error || 'Greška pri slanju slike.');

      // 2. Create the new menu item
      const newItem = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: uploadResult.imagePath
      };

      const res = await fetch('http://localhost:5000/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newItem)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Dodavanje jela nije uspelo.');

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
