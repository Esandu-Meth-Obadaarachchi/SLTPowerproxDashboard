import React from 'react';
import '../../../shared/CSS/shared_Css.css';
import { AlertTriangle, Snowflake } from 'lucide-react';

const ACAlarmsTab = () => (
  <div className="tab-content-section">
    <div className="alarms-list">
      <div className="alarm-item warning">
        <div className="alarm-icon">
          <AlertTriangle size={20} />
        </div>
        <div className="alarm-content">
          <h4>High Temperature - CRAC-07</h4>
          <p>North Data Center - 09:45 AM</p>
        </div>
        <div className="alarm-status warning">Warning</div>
      </div>
      
      <div className="alarm-item warning">
        <div className="alarm-icon">
          <AlertTriangle size={20} />
        </div>
        <div className="alarm-content">
          <h4>Filter Replacement Due - CRAC-02</h4>
          <p>HQ Data Center - 3 days remaining</p>
        </div>
        <div className="alarm-status warning">Warning</div>
      </div>
      
      <div className="alarm-item resolved">
        <div className="alarm-icon">
          <Snowflake size={20} />
        </div>
        <div className="alarm-content">
          <h4>Maintenance Complete - CRAC-05</h4>
          <p>East Data Center - System restored</p>
        </div>
        <div className="alarm-status resolved">Resolved</div>
      </div>
    </div>
  </div>
);

export default ACAlarmsTab;