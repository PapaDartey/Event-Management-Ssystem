import React, { useState, useEffect } from "react";

const Hero = () => {
  const images = [
    "./B1.avif",
    "./B2.avif",
    "./B3.avif",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Transition every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className=" z-10 flex flex-col items-center justify-center text-center text-white p-6 absolute inset-0">
        <h1 className="text-2xl lg:text-5xl font-bold tracking-wide">
          Discover, Learn, and Grow at Campus Events
        </h1>
        <p className="mt-4 text-sm lg;text-lg max-w-2xl">
          Explore workshops, seminars, and activities designed to enrich your
          experience. Join the community and shape your future.
        </p>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-1 rounded-sm ${
              index === currentImage ? "bg-black" : "bg-white"
            }`}
            onClick={() => setCurrentImage(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
