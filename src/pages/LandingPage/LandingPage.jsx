import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './LandingPage.css';

// Import images
import slideshowImage1 from '../../assets/slideshow/slide1.jpeg';
import slideshowImage2 from '../../assets/slideshow/slide2.jpeg';


const LandingPage = () => {
  const navigate = useNavigate();
  
  // Hardcoded data for now
  const stats = {
    generators: 42,
    locations: 16
  };
  
  // Online images with placeholders in case they fail to load
  const onlineImage1 = 'https://raw.githubusercontent.com/AchithaPS/image-hosting/main/asset1.jpg';
  const onlineImage2 = 'https://raw.githubusercontent.com/AchithaPS/image-hosting/main/asset4.jpg';
  
  const handleGeneratorClick = () => {
    navigate('/locations');
  };
  
  const handleLocationClick = () => {
    navigate('/locations');
  };
  
  // Image error handler
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/path/to/placeholder.png'; // Replace with your placeholder image
    e.target.alt = 'Image could not be loaded';
  };
  
  return (
    <div className="landing-page">
      {/* Top stats section */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-title">Number of Generators</div>
          <div className="stat-icon generator-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
              <line x1="12" y1="22" x2="12" y2="7"></line>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
            </svg>
          </div>
          <div className="stat-value">{stats.generators}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title">Number of Locations</div>
          <div className="stat-icon location-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div className="stat-value">{stats.locations}</div>
        </div>
      </div>
      
      {/* Middle carousel section - Converted from Flutter */}
      <div className="slideshow-container">
        <div className="carousel-content">
          <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            transitionTime={800}
            centerMode={true}
            centerSlidePercentage={80}
            emulateTouch={true}
            swipeable={true}
            dynamicHeight={false}
            className="custom-carousel"
          >
            <div>
              <img src={slideshowImage1} alt="Slide 1" />
            </div>
            <div>
              <img src={slideshowImage2} alt="Slide 2" />
            </div>
            
            <div>
              <img 
                src={onlineImage1} 
                alt="Online Image 1" 
                onError={handleImageError} 
              />
            </div>
            <div>
              <img 
                src={onlineImage2} 
                alt="Online Image 2" 
                onError={handleImageError} 
              />
            </div>
          </Carousel>
        </div>
      </div>
      
      {/* Bottom navigation section */}
      <div className="nav-buttons-container">
        <button 
          className="nav-button generator-button"
          onClick={handleGeneratorClick}
        >
          <span>Generator</span>
          <div className="button-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
        </button>
        
        <button 
          className="nav-button location-button"
          onClick={handleLocationClick}
        >
          <span>Location</span>
          <div className="button-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;