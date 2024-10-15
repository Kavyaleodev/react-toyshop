import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import './SortByAge.css'; // For styling

const images = [
  '/images/char1.jpg',
  '/images/char2.jpg',
  '/images/char3.jpg',
  '/images/char4.jpg',
  '/images/char5.jpg',
  '/images/char6.jpg',
  '/images/char7.jpg',
  '/images/char8.jpg',
  '/images/char9.jpg',
];

const ShopByChar = () => {
  // State to track the current value of the slider
  const [sliderValue, setSliderValue] = useState(0);

  // Handler for line slider change
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue); // Update the slider value
  };

  return (
    <div className="sort-by-age-container">
        <h1></h1>
      <h1>Shop By Character</h1>

      {/* Image Slider */}
      <div className="image-slider-container">
        <img 
          src={images[sliderValue]} // Correctly access the current image based on the slider value
          alt={`Age ${sliderValue + 1}`} 
          style={{
            maxWidth: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />
      </div>

      {/* Line Slider */}
      <Slider
        size="large"
        value={sliderValue}
        min={0}
        max={images.length - 1} // Limit slider to the number of images
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default ShopByChar;
