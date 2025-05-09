import React, { useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {

  const postIds = [
    'DJbM528tMhq', 
    'DJBaa04txm8', 
    'DIiilSCthgF',
    'DGfT4K5treB',
    'DDyxk4SNhO4'
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="gallery">
      {postIds.map((id, index) => (
        <div key={id} className={`gallery-item rotate-${index % 5}`}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={`https://www.instagram.com/p/${id}/`}
            data-instgrm-version="14"
          ></blockquote>
        </div>
      ))}
    </div>
  );
};

export default Gallery;