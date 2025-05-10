import "./Reviews.css"
import { useEffect,useRef,useState } from "react";
import {ReactComponent as LinkIcon } from "../assets/external-link.svg"

function Reviews() {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animationFrame = useRef(null);

  const reviews = [
    { name: 'Sir Vilak', stars: 5, text: 'Дивни људи са још дивнијом храном.', link: "https://maps.app.goo.gl/zsebrtQyrib348QH6" },
    { name: 'ninoslava pilipovic', stars: 5, text: 'Најбоља храна у целом граду.', link: "https://maps.app.goo.gl/6MWx9T4CFf8RHwfb7" },
    { name: 'Aleksandar Topic', stars: 5, text: 'НАЈБОЉЕ ПРЖЕНО БЕЛО МЕСО У СУЗАМУ У ГРАДУ ♥', link: "https://maps.app.goo.gl/8GVLW4WkdM1Y5eVe6" },
    { name: 'Kristina Peša Đурђеvić', stars: 5, text: 'Прелепи људи, породица златних руку. Храна је укусна, све здраво и домаће 🍜🍽.', link: "https://maps.app.goo.gl/4pXk2zUEgMkFSxJRA" },
    { name: "Jasmina Zivovic", stars: 5, text: 'Одлична храна, љубазно особље', link: "https://maps.app.goo.gl/UsEwRHK3EnkxumYF6" },
    { name: 'Kristina Peša Đурђеvić', stars: 5, text: 'Прелепи људи, породица златних руку. Храна је укусна, све здраво и домаће 🍜🍽.', link: "https://maps.app.goo.gl/4pXk2zUEgMkFSxJRA" },
    { name: "Jasmina Zivovic", stars: 5, text: 'Одлична храна, љубазно особље', link: "https://maps.app.goo.gl/UsEwRHK3EnkxumYF6" },
    
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (e) => {
      isDragging.current = true;
      container.classList.add('active-drag');
      cancelAnimationFrame(animationFrame.current);

      startX.current = e.pageX;
      scrollLeft.current = container.scrollLeft;
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDragging.current) return;
      const x = e.pageX;
      const walk = startX.current - x;
      container.scrollLeft = scrollLeft.current + walk;
    };

    const onPointerUp = (e) => {
      isDragging.current = false;
      container.classList.remove('active-drag');
      container.releasePointerCapture(e.pointerId);
      
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  

 

  return (
    <section className="reviews-section">
      <div className="reviews-wrapper">
        <div className="reviews-container" ref={containerRef}>
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <h3>{review.name}   <a href={review.link}><LinkIcon /></a></h3>
              <h2>{'★'.repeat(review.stars)}</h2>
              <p>"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;