import "./Reviews.css"
import { useEffect,useRef,useState } from "react";
import {ReactComponent as LinkIcon } from "../assets/external-link.svg"

function Reviews() {
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const cardsPerPage = 3;
  const reviews = [
    { name: 'Sir Vilak', stars: 5, text: 'Дивни људи са још дивнијом храном.',link:"https://maps.app.goo.gl/zsebrtQyrib348QH6" },
    { name: 'ninoslava pilipovic', stars: 5, text: 'Најбоља храна у целом граду.',link:"https://maps.app.goo.gl/6MWx9T4CFf8RHwfb7" },
     { name: 'Aleksandar Topic', stars: 5, text: 'НАЈБОЉЕ ПРЖЕНО БЕЛО МЕСО У СУЗАМУ У ГРАДУ ♥',link:"https://maps.app.goo.gl/8GVLW4WkdM1Y5eVe6" },
    { name: 'Kristina Peša Đurđević', stars: 5, text: 'Прелепи људи, породица златних руку. Храна је укусна, све здраво и домаће 🍜🍽.',link:"https://maps.app.goo.gl/4pXk2zUEgMkFSxJRA" },
    {name:"Jasmina Zivovic",stars:5,text:'Одлична храна, љубазно особље',link:"https://maps.app.goo.gl/UsEwRHK3EnkxumYF6"}
];
  const totalPages = Math.ceil(reviews.length / cardsPerPage);

  const updateCarousel = (page) => {
    const container = containerRef.current;
    if (!container) return; 
    const cards = container.querySelectorAll('.review-card');
    const cardWidth = cards[0].offsetWidth + 16; 
    const shift = page * cardsPerPage * cardWidth;
    container.style.transform = `translateX(-${shift}px)`;
  };

  useEffect(() => {
    updateCarousel(currentPage);
  }, [currentPage]);
  return (
    <section class="reviews-section">
            <button className="arrow left" disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
            
            <div class="reviews-wrapper">
                <div class="reviews-container" ref={containerRef}>
                {reviews.map((review, index) => (
                            <div className="review-card" key={index}>
                            <h3>{review.name} <a href={review.link}><LinkIcon></LinkIcon></a></h3>
                            <h2> {'★'.repeat(review.stars)}</h2>
                            <p>"{review.text}"</p>
                            </div>
                        ))}
                </div>
            </div>

            <button className="arrow right" disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
    </section>
        );
};

export default Reviews;