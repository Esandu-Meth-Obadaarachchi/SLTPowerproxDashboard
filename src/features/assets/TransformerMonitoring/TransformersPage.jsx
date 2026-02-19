

import React, { useState, useEffect } from 'react';
import TransformerPanel from './components/Panel';
import { MapPin, AlertTriangle, Zap, Activity } from 'lucide-react';
import '../../../styles/assets/transformer/TransformersPage.css';

const transformerData = {
  'SLT HQ': ['Transformer 1', 'Transformer 2', 'Transformer 3'],
  'Welikada': ['Transformer 1', 'Transformer 2', 'Transformer 3'],
};

const TransformersPage = () => {
  const [selectedLocation, setSelectedLocation] = useState('SLT HQ');
  const [selectedTransformer, setSelectedTransformer] = useState(transformerData['SLT HQ'][0]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [selectedLocation, selectedTransformer]);

  // Update selected transformer when location changes
  useEffect(() => {
    setSelectedTransformer(transformerData[selectedLocation][0]);
  }, [selectedLocation]);

  // Mock stats (replace with live data if needed)
  const totalTransformers = transformerData[selectedLocation].length;
  const activeAlarms = Math.floor(Math.random() * 3); // for demo
  const siteStatus = 'Online';

  return (
    <div className="transformers-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Transformers Monitoring</h1>
        <p className="page-subtitle">Instant status. Smarter maintenance. Safer transformers.</p>
      </div>

      {/* Overview Summary */}
      <div className="overview-grid mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="overview-card">
          <Zap size={24} className="text-blue-400" />
          <div>
            <h4>Total Transformers</h4>
            <p>{totalTransformers}</p>
          </div>
        </div>
        <div className="overview-card">
          <AlertTriangle size={24} className="text-yellow-400" />
          <div>
            <h4>Active Alarms</h4>
            <p>{activeAlarms}</p>
          </div>
        </div>
        <div className="overview-card">
          <Activity size={24} className="text-green-400" />
          <div>
            <h4>Status</h4>
            <p>{siteStatus}</p>
          </div>
        </div>
      </div>

      {/* Location Selector */}
      <div className="location-selector mb-4">
        {Object.keys(transformerData).map((loc) => (
          <button
            key={loc}
            className={`location-button ${selectedLocation === loc ? 'active' : ''}`}
            onClick={() => setSelectedLocation(loc)}
          >
            <MapPin size={16} className="mr-2" />
            {loc}
          </button>
        ))}
      </div>

      {/* Transformer Tabs */}
      <div className="transformer-tabs mb-6 flex space-x-4 border-b border-gray-300">
        {transformerData[selectedLocation].map((transformerName) => (
          <button
            key={transformerName}
            className={`transformer-tab-button ${
              selectedTransformer === transformerName ? 'active-tab' : ''
            }`}
            onClick={() => setSelectedTransformer(transformerName)}
          >
            {transformerName}
          </button>
        ))}
      </div>

      {/* Transformer Panel for selected transformer */}
      <div className={`transformer-panels-grid ${animate ? 'slide-in' : ''}`}>
        <TransformerPanel
          key={`${selectedLocation}-${selectedTransformer}`}
          id={selectedTransformer}
          site={selectedLocation}
        />
      </div>
    </div>
  );
};

export default TransformersPage;
