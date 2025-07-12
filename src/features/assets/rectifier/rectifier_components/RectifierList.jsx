import React from 'react';
import { BatteryCharging, AlertTriangle } from 'lucide-react';
import './RectifierList.css';

const RectifierList = () => {
  const rectifiers = [
    { id: 'RECT-01', location: 'HQ Data Center', voltage: 48, current: 30, status: 'Normal' },
    { id: 'RECT-02', location: 'HQ Data Center', voltage: 47.5, current: 32, status: 'Warning', issue: 'Low Voltage' },
    { id: 'RECT-03', location: 'East Data Center', voltage: 48.1, current: 29, status: 'Normal' },
    { id: 'RECT-04', location: 'North Data Center', voltage: 46.8, current: 35, status: 'Critical', issue: 'Overcurrent' },
    { id: 'RECT-05', location: 'West Data Center', voltage: 48.0, current: 31, status: 'Normal' },
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `RECT-${String(i + 6).padStart(2, '0')}`,
      location: ['East Data Center', 'South Data Center', 'West Data Center'][i % 3],
      voltage: (47.8 + Math.random() * 0.5).toFixed(1),
      current: Math.floor(28 + Math.random() * 8),
      status: 'Normal'
    }))
  ];

  return (
    <div className="rectifier-units-list-section">
      <h3 className="section-title">Rectifier Systems</h3>
      <div className="units-list">
        {rectifiers.map((unit) => (
          <div key={unit.id} className={`unit-item ${unit.status.toLowerCase()}`}>
            <div className="unit-info">
              <h4>{unit.id}</h4>
              <p>
                {unit.location} – {unit.voltage}V / {unit.current}A – {unit.status}
                {unit.issue ? ` (${unit.issue})` : ''}
              </p>
            </div>
            <div className={`unit-status ${unit.status.toLowerCase()}`}>
              {unit.status === 'Normal' ? <BatteryCharging size={16} /> : <AlertTriangle size={16} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RectifierList;
