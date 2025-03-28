import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './Location.css';

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Container style for the map
  const containerStyle = {
    width: '100%',
    height: '600px'
  };
  
  // Center position (for Sri Lanka Telecom HQ as shown in the screenshot)
  const center = {
    lat: 6.927079,
    lng: 79.861243
  };
  
  // Sample location data based on your screenshot
  const locations = [
    {
      id: 1,
      name: 'SLT HQ',
      position: { lat: 6.927079, lng: 79.861243 },
      address: 'Sri Lanka Telecom Head Office, Lotus Road, Colombo 01',
      generators: 15
    },
    {
      id: 2,
      name: 'SLT WELIKADA A',
      position: { lat: 6.9100, lng: 79.8800 },
      address: 'SLT WELIKADA A Facility',
      generators: 8
    },
    {
      id: 3,
      name: 'SLT WELIKADA B',
      position: { lat: 6.9120, lng: 79.8820 },
      address: 'SLT WELIKADA B Facility',
      generators: 6
    },
    {
      id: 4,
      name: 'SLT OTS',
      position: { lat: 6.9200, lng: 79.8700 },
      address: 'SLT OTS Facility',
      generators: 10
    },
    {
      id: 5,
      name: 'Regional WPN- 1',
      position: { lat: 6.9300, lng: 79.8600 },
      address: 'Regional WPN-1 Facility',
      generators: 4
    },
    {
      id: 6,
      name: 'Regional WPN- 2',
      position: { lat: 6.9400, lng: 79.8500 },
      address: 'Regional WPN-2 Facility',
      generators: 5
    }
  ];
  
  // Handle marker click
  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };
  
  // Handle location selection from dropdown
  const handleLocationSelect = (e) => {
    const selectedId = parseInt(e.target.value);
    const location = locations.find(loc => loc.id === selectedId);
    setSelectedLocation(location);
  };

  return (
    <div className="location-container">
      <h1>Location</h1>
      
      <div className="location-top-row">
        <div className="location-selector">
          <select onChange={handleLocationSelect} defaultValue="1">
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="address-container">
          <h3><i className="fa fa-map-marker"></i> Address</h3>
          <p className='address-name'>{selectedLocation ? selectedLocation.address : locations[0].address}</p>
        </div>
        
        <div className="generators-container">
          <h3>Number of Generators</h3>
          <div className="generator-count">
            {selectedLocation ? selectedLocation.generators : locations[0].generators}
          </div>
        </div>
      </div>
      
      <div className="map-container">
        <LoadScript googleMapsApiKey="AIzaSyAp_qWvoMK6reqUfY9_0pLsfDbYcwkn_GQ">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={selectedLocation ? selectedLocation.position : center}
            zoom={15}
          >
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={location.position}
                onClick={() => handleMarkerClick(location)}
              />
            ))}
            
            {selectedLocation && (
              <InfoWindow
                position={selectedLocation.position}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div>
                  <h3>{selectedLocation.name}</h3>
                  <p>{selectedLocation.address}</p>
                  <p>Generators: {selectedLocation.generators}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Location;