import React, { useEffect, useState } from 'react';
import MenuCard from './MenuCard';
import './MenuItemDeleter.css';

function MenuItemDeleter({ onClose }) {
  const [allItems, setAllItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then((res) => res.json())
      .then((data) => setAllItems(data))
      .catch((err) => console.error('Error loading menu items:', err));
  }, []);

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.find((i) => i.name === item.name)
        ? prev.filter((i) => i.name !== item.name)
        : [...prev, item]
    );
  };

  const deleteItems = async () => {
    try {
      for (const item of selectedItems) {
        await fetch(`http://localhost:5000/api/menu/${item._id}`, {
          method: 'DELETE',
        });

        // Also delete from today's menu if it exists
        await fetch(`http://localhost:5000/api/todaysMenu/${item._id}`, {
          method: 'DELETE',
        });
      }
      alert('Izabrane stavke su obrisane.');
      onClose();
    } catch (err) {
      console.error('Greška pri brisanju stavki:', err);
      alert('Došlo je do greške prilikom brisanja.');
    }
  };

  return (
    <div className="menu-deleter-overlay">
      <div className="menu-deleter">
        <h2>Obrišite stavke iz menija</h2>
        <div className="deleter-scroll-container">
          {allItems.map((item, idx) => (
            <div
              key={idx}
              className={`deleter-card-wrapper ${
                selectedItems.find((i) => i.name === item.name) ? 'selected' : ''
              }`}
              onClick={() => toggleItem(item)}
            >
              <MenuCard {...item} />
            </div>
          ))}
        </div>
        <div className="deleter-actions">
          <button onClick={deleteItems}>Obriši</button>
          <button onClick={onClose}>Otkaži</button>
        </div>
      </div>
    </div>
  );
}

export default MenuItemDeleter;
