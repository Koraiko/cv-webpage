import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ImageInfo {
    path: string;   // path to img file
    description?: string;   // optional description of the image
}

/**
 * Image carousel component for displaying a series of images. Scrolls on its own through the images.
 * @param imageArray information about the images (refer to ImageInfo interface)
 * @param roundedImg if true, images will be displayed with rounded corners
 * @param id unique identifier for the carousel, used for linking controls and indicators
 * @returns JSX.Element | null
 */
const ImageCarousel: React.FC<{
    imageArray: ImageInfo[];
    roundedImg?: boolean;
    id: string;
}> = ({ imageArray, roundedImg = false, id }) => {
    if (!imageArray || imageArray.length === 0) return null;
    id += "-" + uuidv4(); // Ensure unique ID for each instance

    return (
        <div id={id} className="carousel slide" data-bs-ride="carousel" data-bs-wrap="true">
            <div className="carousel-inner">
                {/* image number indication (middle bottom) */}
                <div className="carousel-indicators">
                    {imageArray.length < 2 ? null : imageArray.map((_, index) => (
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
                {/* images */}
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
                {/* back/ next buttons (left/right middle) */}
                {
                    imageArray.length < 2 ? null :
                        <>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            </button><button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            </button>
                        </>
                }
            </div>
        </div>
    );
};

export default ImageCarousel;
