// src/components/Masonry.jsx
import React, { useState, useEffect } from "react";
import "./Masonry.css";

export default function Masonry({ images, columnCount = 4 }) {
  const [sizedImages, setSizedImages] = useState([]);

  useEffect(() => {
    let mounted = true;

    Promise.all(
      images.map((img) => {
        return new Promise((resolve) => {
          const image = new Image();
          image.src = img.url;
          image.onload = () => {
            resolve({ ...img, width: image.width, height: image.height });
          };
        });
      })
    ).then((results) => {
      if (mounted) setSizedImages(results);
    });

    return () => {
      mounted = false;
    };
  }, [images]);

  const imageColumns = generateImageColumns(sizedImages, columnCount);

  return (
    <div className="masonry-container">
      {imageColumns.map((column, colIndex) => (
        <div className="masonry-column" key={colIndex}>
          {column.map((image, index) => (
            <a
              key={index}
              href={`/restaurant/${image.restaurantId}`}
              className="masonry-item"
            >
              <img src={image.url} alt={`Food ${index}`} loading="lazy" />
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

function generateImageColumns(images, columnCount = 4) {
  const columns = Array.from({ length: columnCount }, () => []);
  const columnHeights = new Array(columnCount).fill(0);

  images.forEach((img) => {
    const minCol = columnHeights.indexOf(Math.min(...columnHeights));
    columns[minCol].push(img);
    columnHeights[minCol] += img.height / img.width;
  });

  return columns;
}
