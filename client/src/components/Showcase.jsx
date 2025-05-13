import "./Showcase.css";
import MenuCard from "./MenuCard";
import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'


function Showcase() {
  const [showcaseItems, setShowCaseItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then((res) => res.json())
      .then((data) => {
        setShowCaseItems(data);
      })
      .catch((err) => {
        console.error("Failed to load menu items:", err);
      });
  }, []);

  return (
    <div className="showcase">
      <h2>Nešto sa današnjeg menija...</h2>

      <div className="showcase-grid">
        {showcaseItems.length === 0 ? (
          <p className="no-items-message">Trenutno nismo otvoreni 😢. Svratite posle!</p>
        ) : (
          showcaseItems.slice(0, 6).map((item, index) => (
            <MenuCard key={index} {...item} />
          ))
        )}
      </div>

      <h3>
        <NavLink to="/menu">..ili pogledajte celi meni.</NavLink>
      </h3>
    </div>
  );
}

export default Showcase;
