import React from 'react';

interface ImageInfo {
    path: string;
    description?: string;
}

const ImageCarousel: React.FC<{
    imageArray: ImageInfo[];
    roundedImg?: boolean;
    id: string;
}> = ({ imageArray, roundedImg = false, id }) => {
    if (!imageArray || imageArray.length === 0) return null;

    return (
        <div id={id} className="carousel slide" data-bs-ride="carousel" data-bs-wrap="true">
            {/* image number indication (middle bottom) */}
            <div className="carousel-indicators">
                {imageArray.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target={`#${id}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>
            {/* Carousel images */}
            <div className="carousel-inner">
                {imageArray.map((img, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        {/* image */}
                        <img 
                            src={img.path} 
                            className={`d-block w-100 h-100 ${roundedImg ? "rounded" : ""}`}
                            style={{ aspectRatio: "1/1", objectFit: "cover" }}
                            alt="" 
                        />
                        {/* Optional description of image */}
                        {img.description && (
                            <div className="carousel-caption d-none d-md-block">
                                <p>{img.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* back/ next buttons */}
            <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
        </div>
    );
};

export default ImageCarousel;
