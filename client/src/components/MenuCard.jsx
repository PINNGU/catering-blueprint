import React from 'react';
import './MenuCard.css';

const MenuCard = ({ image, name, description, price }) => {
  return (
    <div className="menu-card">
      <img src={image} alt={name} className="menu-image" draggable="false" />
      <div className="menu-card-content">
        <h3 className="menu-title">{name}</h3>
        <p className="menu-description">{description}</p>
        <p className="menu-price">{price.toFixed(2)} RSD</p>
      </div>
    </div>
  );
};

export default MenuCard;