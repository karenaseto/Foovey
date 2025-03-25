import mockImages from "../data/imageData";
import "./ImageGrid.css"; 

function ImageGrid({ cuisine }) {
    const images = mockImages[cuisine?.toLowerCase()] || [];

    return (
    <div className="image-grid">
        {images.map((item, index) => (
            <a key={index} href={`/restaurant/${item.restaurantId}`}>
            <img src={item.url} alt={`${cuisine} dish`} />
        </a>
        ))}
    </div>
    );
}

export default ImageGrid;
