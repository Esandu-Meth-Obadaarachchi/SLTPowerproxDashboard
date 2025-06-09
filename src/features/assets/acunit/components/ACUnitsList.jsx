import React from 'react';
import { Snowflake, AlertTriangle } from 'lucide-react';

const ACUnitsList = () => {
  const acUnits = [
    { id: 'CRAC-01', location: 'East Data Center', temp: 22.5, humidity: 45, status: 'Normal' },
    { id: 'CRAC-02', location: 'HQ Data Center', temp: 21.8, humidity: 42, status: 'Warning', issue: 'Filter' },
    { id: 'CRAC-03', location: 'HQ Data Center', temp: 22.2, humidity: 43, status: 'Normal' },
    { id: 'CRAC-07', location: 'North Data Center', temp: 24.8, humidity: 48, status: 'Warning', issue: 'High Temp' },
    { id: 'CRAC-08', location: 'North Data Center', temp: 22.6, humidity: 44, status: 'Normal' },
    ...Array.from({ length: 13 }, (_, i) => ({
      id: `CRAC-${String(i + 9).padStart(2, '0')}`,
      location: ['East Data Center', 'West Data Center', 'South Data Center'][i % 3],
      temp: (21 + Math.random() * 2).toFixed(1),
      humidity: Math.floor(40 + Math.random() * 10),
      status: 'Normal'
    }))
  ];

  return (
    <div className="ac-units-list-section">
      <h3 className="section-title">Precision AC Units</h3>
      <div className="units-list">
        {acUnits.map((unit, index) => (
          <div key={unit.id} className={`unit-item ${unit.status.toLowerCase()}`}>
            <div className="unit-info">
              <h4>{unit.id}</h4>
              <p>{unit.location} - {unit.temp}°C / {unit.humidity}% RH - {unit.status}{unit.issue ? ` (${unit.issue})` : ''}</p>
            </div>
            <div className={`unit-status ${unit.status.toLowerCase()}`}>
              {unit.status === 'Normal' ? <Snowflake size={16} /> : <AlertTriangle size={16} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ACUnitsList;