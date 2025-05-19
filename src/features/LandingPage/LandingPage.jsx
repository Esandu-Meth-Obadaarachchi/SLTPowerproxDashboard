import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './LandingPage.css';
import StatCard from './../shared/components/StatCard/StatCard'; 

// Import images
import slideshowImage1 from '../../features/shared/images/slideshow/slide1.jpeg';
import slideshowImage2 from '../../features/shared/images/slideshow/slide2.jpeg';
// Import InfluxDB service
import { fetchOverallStats } from './influxApiService';

const LandingPage = () => {
  const navigate = useNavigate();
  
  // State to store stats from InfluxDB
  const [stats, setStats] = useState({
    generators: 0,
    locations: 0
  });
  
  // Online images with placeholders in case they fail to load
  const onlineImage1 = 'https://raw.githubusercontent.com/AchithaPS/image-hosting/main/asset1.jpg';
  const onlineImage2 = 'https://raw.githubusercontent.com/AchithaPS/image-hosting/main/asset4.jpg';
  
  const handleGeneratorClick = () => {
    navigate('/generator');
  };
  
  const handleLocationClick = () => {
    navigate('/locations');
  };
  
  // Fetch stats when component mounts
  useEffect(() => {
    const loadStats = async () => {
      try {
        const overallStats = await fetchOverallStats();
        setStats({
          generators: parseInt(overallStats.numberOfGenerators, 10),
          locations: parseInt(overallStats.numberOfLocations, 10)
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
        // Optionally set some default values or show an error message
      }
    };

    loadStats();
  }, []);

  // SVG icons for the stat cards
  const generatorIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  );
  
  const locationIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  // Image error handler
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/path/to/placeholder.png'; // Replace with your placeholder image
    e.target.alt = 'Image could not be loaded';
  };
  
  return (
    <div className="landing-page">
      {/* Top stats section */}
      <div className="stats-container-landing-page">
        <StatCard 
          title="Number of Generators" 
          value={stats.generators} 
          icon={generatorIcon} 
        />
        
        <StatCard 
          title="Number of Locations" 
          value={stats.locations} 
          icon={locationIcon} 
        />
      </div>
      
      {/* Middle carousel section - Updated for better slide visibility */}
      <div className="slideshow-container">
        <div className="carousel-content">
          <Carousel
            showArrows={false} // Hide arrows as requested
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            transitionTime={800}
            centerMode={true}
            centerSlidePercentage={70} // Reduced from 80 to show more of adjacent slides
            emulateTouch={true}
            swipeable={true}
            dynamicHeight={false}
            className="custom-carousel"
          >
            <div>
              <img src={slideshowImage1} alt="Slide 1" />
            </div>

            <div>
              <img 
                src={onlineImage1} 
                alt="Online Image 1" 
                onError={handleImageError} 
              />
            </div>
            
            <div>
              <img src={slideshowImage2} alt="Slide 2" />
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