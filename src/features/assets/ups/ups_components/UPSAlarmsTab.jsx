import React from 'react';
import { AlertTriangle, Zap } from 'lucide-react';

const UPSAlarmsTab = () => (
  <div className="tab-content-section">
    <div className="alarms-list">
      <div className="alarm-item warning">
        <div className="alarm-icon">
          <AlertTriangle size={20} />
        </div>
        <div className="alarm-content">
          <h4>Battery Voltage Low - UPS-12</h4>
          <p>Colombo DC - 10:12 AM</p>
        </div>
        <div className="alarm-status warning">Warning</div>
      </div>

      <div className="alarm-item critical">
        <div className="alarm-icon">
          <Zap size={20} />
        </div>
        <div className="alarm-content">
          <h4>Power Supply Failure - UPS-07</h4>
          <p>HQ Facility - 08:05 AM</p>
        </div>
        <div className="alarm-status critical">Critical</div>
      </div>

      <div className="alarm-item resolved">
        <div className="alarm-icon">
          <AlertTriangle size={20} />
        </div>
        <div className="alarm-content">
          <h4>Temperature Stabilized - UPS-03</h4>
          <p>Western Region - Issue resolved</p>
        </div>
        <div className="alarm-status resolved">Resolved</div>
      </div>
    </div>
  </div>
);

export default UPSAlarmsTab;
