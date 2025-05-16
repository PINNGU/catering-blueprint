import React, { useEffect, useState } from 'react';
import MenuCard from './MenuCard';
import './TodaysMenuEditor.css';
const token = localStorage.getItem('adminToken');

function TodaysMenuEditor({ onClose }) {
  const [allItems, setAllItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:5000/api/menu')
      .then((res) => res.json())
      .then((data) => setAllItems(data))
      .catch((err) => console.error('Error loading menu items:', err));

    fetch('http://localhost:5000/api/todaysMenu')
      .then((res) => res.json())
      .then((todaysMenuData) => {

        setSelectedItems(todaysMenuData);
      })
      .catch((err) => console.error('Error loading todays menu items:', err));
  }, []);

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.find((i) => i.name === item.name)
        ? prev.filter((i) => i.name !== item.name)
        : [...prev, item]
    );
  };

  const saveTodaysMenu = () => {
    fetch('http://localhost:5000/api/todaysMenu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedItems),
      Authorization: `Bearer ${token}`
    })
      .then((res) => {
        if (res.ok) {
          alert('Današnji meni je uspešno ažuriran!');
          onClose();
        } else {
          alert('Greška prilikom slanja menija.');
        }
      })
      .catch((err) => console.error('Greška:', err));
  };

  return (
    <div className="todays-menu-editor-overlay">
      <div className="todays-menu-editor">
        <h2>Izaberite stavke za današnji meni</h2>
        <div className="editor-scroll-container">
          {allItems.map((item, idx) => (
            <div
              key={idx}
              className={`editor-card-wrapper ${
                selectedItems.find((i) => i.name === item.name) ? 'selected' : ''
              }`}
              onClick={() => toggleItem(item)}
            >
              <MenuCard {...item} />
            </div>
          ))}
        </div>
        <div className="editor-actions">
          <button onClick={saveTodaysMenu}>Sačuvaj</button>
          <button onClick={onClose}>Otkaži</button>
        </div>
      </div>
    </div>
  );
}

export default TodaysMenuEditor;
