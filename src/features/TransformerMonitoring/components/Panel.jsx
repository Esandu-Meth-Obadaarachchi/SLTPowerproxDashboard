import React, { useState } from 'react';
import LVPanel from './LVPanel';
import MVPanel from './MVPanel';
import './Panel.css';

const TransformerPanel = () => {
  const [activeTab, setActiveTab] = useState('LV');

  return (
    <div className="transformer-panel">
      <div className="tab-bar right-align">
        <button
          className={`tab-button ${activeTab === 'LV' ? 'active' : ''}`}
          onClick={() => setActiveTab('LV')}
        >
          LV Panel 
        </button>
        <button
          className={`tab-button ${activeTab === 'MV' ? 'active' : ''}`}
          onClick={() => setActiveTab('MV')}
        >
          MV Panel 
        </button>
      </div>

      {/* No main card wrapper here */}
      {activeTab === 'LV' ? <LVPanel /> : <MVPanel />}
    </div>
  );
};

export default TransformerPanel;
