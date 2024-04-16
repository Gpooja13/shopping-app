import { Carousel } from "flowbite-react";
import React from "react";

const ImageCarousel = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img
          src="https://source.unsplash.com/featured/1280x700/?shop clothes"
          // src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          alt="..."
        />
        <img
          src="https://source.unsplash.com/featured/1280x700/?shopping clothes"
          // src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
          alt="..."
        />
        <img
          src="https://source.unsplash.com/featured/1280x700/?clothing store"
          // src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="..."
        />
        <img
          src="https://source.unsplash.com/featured/1280x700/?clothes"
          // src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
          alt="..."
        />
        <img
          src="https://source.unsplash.com/featured/1280x700/?fashion clothing"
          // src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
          alt="..."
        />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
