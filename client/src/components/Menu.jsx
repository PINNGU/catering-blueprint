import React, { useRef, useEffect, useState } from 'react';
import './Menu.css';
import MenuCard from './MenuCard';
import TodaysMenuEditor from './TodaysMenuEditor';
import MenuItemDeleter from './MenuItemDeleter';
import AddMenuItem from './AddMenuItem';

function Menu() {
  const [completeMenuItems, setCompleteMenuItems] = useState([]);
  const [TodaysMenuItems, setTodaysMenuItems] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleterOpen, setIsDeleterOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const scrollContainersRef = useRef([]);

  useEffect(() => {
    scrollContainersRef.current.forEach((container) => {
      if (!container) return;

      let isDragging = false;
      let startX = 0;
      let scrollLeft = 0;

      const onPointerDown = (e) => {
        isDragging = true;
        container.classList.add("active-drag");
        document.body.classList.add("no-select"); 
        startX = e.pageX;
        scrollLeft = container.scrollLeft;
        container.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX;
        const walk = startX - x;
        container.scrollLeft = scrollLeft + walk;
      };

      const onPointerUp = (e) => {
        isDragging = false;
        container.classList.remove("active-drag");
        document.body.classList.remove("no-select"); 
        container.releasePointerCapture(e.pointerId);
      };

      container.addEventListener("pointerdown", onPointerDown);
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerup", onPointerUp);

      return () => {
        container.removeEventListener("pointerdown", onPointerDown);
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerup", onPointerUp);
      };
    });
  }, []);

  const fetchCompleteMenu = () => {
    fetch('http://localhost:5000/api/menu')
      .then((res) => res.json())
      .then((data) => setCompleteMenuItems(data))
      .catch((err) => console.error("Failed to load menu items:", err));
  };

  const fetchTodaysMenu = () => {
    fetch('http://localhost:5000/api/todaysMenu')
      .then((res) => res.json())
      .then((data) => setTodaysMenuItems(data))
      .catch((err) => console.error("Failed to load today's menu items:", err));
  };

  useEffect(() => {
    fetchCompleteMenu();
    fetchTodaysMenu();
  }, []);

  return (
    <div className="menu-background-wrapper">
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>Savršen zalogaj</h1>
            <p>Uživajte u sveže skuvanim jelima <br /> svakog dana.</p>
          </div>
        </div>
      </section>

      <div className="menus">
        <section className="menu-section">
          <h2>Današnji Meni</h2>
          <p className="menu-subtitle">Pogledajte šta smo danas spremili za vas.</p>
          <button className="edit-menu-button" onClick={() => setIsEditorOpen(true)}>
            Izmeni Meni
          </button>
          <div className="scrollable-cards" ref={(el) => (scrollContainersRef.current[0] = el)}>
            {TodaysMenuItems.map((item, index) => (
              <MenuCard key={index} {...item} />
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h2>Sve u Ponudi</h2>
          <p className="menu-subtitle">Ovdje možete videti našu celokupnu ponudu.</p>
            <div className="menu-section-buttons">
              <button className="delete-menu-button" onClick={() => setIsDeleterOpen(true)}>
              Obriši Stavke
              </button>
              <button className="add-menu-button" onClick={() => setIsAddItemOpen(true)}>
              Dodaj Stavku
              </button>
          </div>
          <div className="scrollable-cards" ref={(el) => (scrollContainersRef.current[1] = el)}>
            {completeMenuItems.map((item, index) => (
              <MenuCard key={index} {...item} />
            ))}
          </div>
        </section>
      </div>

      {isEditorOpen && (
        <TodaysMenuEditor
          onClose={() => {
            setIsEditorOpen(false);
            fetchTodaysMenu();
          }}
        />
      )}

      {isDeleterOpen && (
        <MenuItemDeleter
          onClose={() => {
            setIsDeleterOpen(false);
            fetchCompleteMenu();
            fetchTodaysMenu();
          }}
        />
      )}

      {isAddItemOpen && (
        <AddMenuItem
          onClose={() => {
            setIsAddItemOpen(false);
            fetchCompleteMenu();
          }}
        />
      )}
    </div>
  );
}

export default Menu;
