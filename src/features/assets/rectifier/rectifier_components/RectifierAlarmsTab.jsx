import React from 'react';
import { AlertTriangle, BatteryCharging } from 'lucide-react'; // Using BatteryCharging as an example icon

const RectifierAlarmsTab = () => (
  <div className="tab-content-section">
    <div className="alarms-list">
      
      <div className="alarm-item warning">
        <div className="alarm-icon">
          <AlertTriangle size={20} />
        </div>
        <div className="alarm-content">
          <h4>Over Voltage - Rectifier-03</h4>
          <p>Main Plant - 11:15 AM</p>
        </div>
        <div className="alarm-status warning">Warning</div>
      </div>
      
      <div className="alarm-item warning">
        <div className="alarm-icon">
          <AlertTriangle size={20} />
        </div>
        <div className="alarm-content">
          <h4>Current Imbalance - Rectifier-01</h4>
          <p>Backup Site - 2 days since detected</p>
        </div>
        <div className="alarm-status warning">Warning</div>
      </div>
      
      <div className="alarm-item resolved">
        <div className="alarm-icon">
          <BatteryCharging size={20} />
        </div>
        <div className="alarm-content">
          <h4>Rectifier Replaced - Rectifier-05</h4>
          <p>Remote Site - System restored</p>
        </div>
        <div className="alarm-status resolved">Resolved</div>
      </div>
      
    </div>
  </div>
);

export default RectifierAlarmsTab;
