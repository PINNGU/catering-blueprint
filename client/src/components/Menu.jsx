import React, { useRef, useEffect } from 'react';
import './Menu.css';
import MenuCard from './MenuCard';

function Menu() {
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

  const todaysMenuItems = [
    { name: "Margherita", description: "Classic pizza with fresh basil.", price: 12.00, image: "/burger.jpg" },
    { name: "Spaghetti", description: "Traditional Italian pasta with marinara sauce.", price: 14.00, image: "/burger.jpg" },
    { name: "Caesar Salad", description: "Crispy lettuce with Caesar dressing.", price: 10.00, image: "/burger.jpg" },
    { name: "Mushroom Risotto", description: "Creamy risotto with fresh mushrooms.", price: 15.00, image: "/burger.jpg" },
    { name: "Tiramisu", description: "Classic Italian dessert with coffee and mascarpone.", price: 8.00, image: "/burger.jpg" },
    { name: "Penne Arrabbiata", description: "Spicy pasta with tomato and chili sauce.", price: 13.00, image: "/burger.jpg" },
    { name: "Panna Cotta", description: "Italian vanilla dessert with berry compote.", price: 7.00, image: "/burger.jpg" },
    { name: "Lasagna", description: "Layered pasta with bolognese sauce and cheese.", price: 16.00, image: "/burger.jpg" },
    { name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, and basil.", price: 9.00, image: "/burger.jpg" },
    { name: "Risotto Milanese", description: "Saffron risotto with a rich flavor.", price: 18.00, image: "/burger.jpg" },
  ];

  const completeMenuItems = [
    { name: "Beef Steak", description: "Juicy steak cooked to perfection.", price: 25.00, image: "/burger.jpg" },
    { name: "Lasagna", description: "Layered pasta with rich tomato sauce and cheese.", price: 18.00, image: "/burger.jpg" },
    { name: "Risotto", description: "Creamy rice with mushrooms and parmesan.", price: 16.00, image: "/burger.jpg" },
    { name: "Grilled Salmon", description: "Fresh salmon grilled with herbs.", price: 22.00, image: "/burger.jpg" },
    { name: "Vegetarian Pizza", description: "Pizza topped with a variety of fresh veggies.", price: 14.00, image: "/burger.jpg" },
    { name: "Fettuccine Alfredo", description: "Creamy pasta with Alfredo sauce.", price: 17.00, image: "/burger.jpg" },
    { name: "Margherita Pizza", description: "Classic pizza with mozzarella and tomato.", price: 12.00, image: "/burger.jpg" },
    { name: "Baked Ziti", description: "Pasta baked with tomato sauce and mozzarella.", price: 15.00, image: "/burger.jpg" },
    { name: "Chicken Parmesan", description: "Breaded chicken with marinara and cheese.", price: 19.00, image: "/burger.jpg" },
    { name: "Minestrone Soup", description: "Traditional Italian vegetable soup.", price: 10.00, image: "/burger.jpg" },
  ];

  return (
    <div className="menu-background-wrapper">
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>Savršen zalogaj</h1>
            <p>
              Uživajte u sveže skuvanim jelima <br />
              svakog dana.
            </p>
          </div>
        </div>
      </section>

      <div className="menus">
        <section className="menu-section">
          <h2>Današnji Meni</h2>
          <p className="menu-subtitle">Pogledajte šta smo danas spremili za vas.</p>
          <div
            className="scrollable-cards"
            ref={(el) => (scrollContainersRef.current[0] = el)}
          >
            {todaysMenuItems.map((item, index) => (
              <MenuCard key={index} {...item} />
            ))}
          </div>
        </section>

        <section className="menu-section">
          <h2>Sve u Ponudi</h2>
          <p className="menu-subtitle">Ovdje možete videti našu celokupnu ponudu.</p>
          <div
            className="scrollable-cards"
            ref={(el) => (scrollContainersRef.current[1] = el)}
          >
            {completeMenuItems.map((item, index) => (
              <MenuCard key={index} {...item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Menu;
