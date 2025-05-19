import React from 'react';
import './MenuCard.css';

function MenuCard({ image, name, description, price }) {
  return (
    <div className="menu-card">
      <img src={image} alt={name} className="menu-image" />
      <div className="menu-card-content">
        <div className="text-section">
          <h3 className="menu-title">{name}</h3>
          <p className="menu-description">{description}</p>
        </div>
        <p className="menu-price">{price} RSD</p>
      </div>
    </div>
  );
}

export default MenuCard;
