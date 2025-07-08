import React from 'react';
import './StatusCard.css';

const indicators = [
  { label: 'PFR1 / CB CLOSED', color: 'red' },
  { label: 'PFG1 / CB OPEN', color: 'green' },
  { label: 'PFA1 / CB TRIP', color: 'orange' },
  { label: 'PFW1 / CB TCS HEALTHY', color: 'white' },
  { label: 'PFR2 / CB IN SERVICE', color: 'red' },
  { label: 'PFG2 / CB IN TEST', color: 'green' },
  { label: 'PFG3 / EARTH SW CLOSE', color: 'red' },
  { label: 'PFR3 / EARTH SW OPEN', color: 'green' },
  { label: 'PFB1 / CB SP CHARGED', color: 'blue' },
  { label: 'PFR3 / R-PH HEALTHY', color: 'red' },
  { label: 'PFY3 / Y-PH HEALTHY', color: 'yellow' },
  { label: 'PFB3 / B-PH HEALTHY', color: 'blue' },
];

const hooters = [
  { label: 'PJ1 / HOOTER' },
  { label: 'PJ2 / HOOTER' },
];

const StatusCard = () => {
  return (
    <div className="status-card">
      <h4>Panel Indicators & Hooters</h4>

      <div className="lights-grid">
        {indicators.map((item, i) => (
          <div className="indicator" key={i}>
            <div className={`light ${item.color}`} />
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="hooter-container">
        {hooters.map((item, i) => (
          <div className="hooter" key={i}>
            <div className="hooter-box">
              <div className="hooter-text">ELECTRONIC HOOTER</div>
              <div className="hooter-led"></div>
              <div className="hooter-text1">ON</div>
              <div className="hooter-icon">🔊</div>
            </div>
            <div className="label">{item.label}</div>
          </div>
    ))}
    </div>

    </div>
  );
};

export default StatusCard;
