import React from 'react';
import './TransformerAlarm.css';

const panelData = [
  { label: 'E/F + OC OPTD', color: 'red' },
  { label: '86 OPTD', color: 'red' },
  { label: 'TCS UNHEALTHY', color: 'red' },
  { label: 'TRAFO TEMP TRIP', color: 'red' },
  { label: 'TRAFO TEMP ALARM', color: 'red' },
  { label: 'TRAFO TEMP MONITOR FAULT ALARM', color: 'red' },
  { label: 'AC FAIL', color: 'white' },
  { label: 'DC FAIL', color: 'white' },
];

const bottomButtons = [
  { label: 'MUTE', class: 'mute' },
  { label: 'AKN', class: 'akn' },
  { label: 'ALAN', class: 'alan' },
  { label: 'RAT', class: 'rat' },
  { label: 'TEST', class: 'test' },
];

export default function AlarmPanel() {
  return (
    <div className="alarm-card">
      <div className="alarm-header">
        <h3>Transformer Alarm</h3>
      </div>

      <div className="panel-grid">
        {panelData.map((item, index) => (
          <div
            key={index}
            className={`panel-block ${item.color === 'red' ? 'red-bg' : 'white-bg'}`}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="bottom-buttons">
        {bottomButtons.map((btn, idx) => (
          <div key={idx} className={`bottom-button ${btn.class}`}>
            {btn.label}
          </div>
        ))}
      </div>
    </div>
  );
}
