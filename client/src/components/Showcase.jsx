import "./Showcase.css";
import MenuCard from "./MenuCard"; // Import MenuCard

function Showcase() {
  const showcaseItems = [
    { image: 'burger.jpg', name: 'Dish 1', description: 'Description of dish 1', price: 12.99 },
    { image: 'burger.jpg', name: 'Dish 2', description: 'Description of dish 2', price: 10.99 },
    { image: 'burger.jpg', name: 'Dish 3', description: 'Description of dish 3', price: 14.99 },
    { image: 'burger.jpg', name: 'Dish 4', description: 'Description of dish 4', price: 9.99 },
    { image: 'burger.jpg', name: 'Dish 5', description: 'Description of dish 5', price: 11.99 },
    { image: 'burger.jpg', name: 'Dish 6', description: 'Description of dish 6', price: 15.99 },
  ]; // Sample items. Replace with dynamic data if necessary.

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
        <a href="#full-menu">..ili pogledajte celi meni.</a>
      </h3>
    </div>
  );
}

export default Showcase;
