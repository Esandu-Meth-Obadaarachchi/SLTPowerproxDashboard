import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const rectifierModules = [
  { id: 'Module-01', status: 'On', temperature: 42, failure: false },
  { id: 'Module-02', status: 'On', temperature: 45, failure: false },
  { id: 'Module-03', status: 'Off', temperature: 38, failure: true },
  { id: 'Module-04', status: 'On', temperature: 47, failure: false },
  { id: 'Module-05', status: 'Off', temperature: 36, failure: true },
  { id: 'Module-06', status: 'On', temperature: 44, failure: false }
];

const RectifierModulesTab = () => (
  <div className="tab-content-section">
    <h3 className="section-title">Module Status</h3>
    <div className="units-list">
      {rectifierModules.map((mod, index) => (
        <div
          key={mod.id}
          className={`unit-item ${mod.failure ? 'warning' : 'normal'}`}
          style={{ animationDelay: `${0.1 * index}s` }}
        >
          <div className="unit-info">
            <h4>{mod.id}</h4>
            <p>
              Status: {mod.status} &nbsp; | &nbsp;
              Temp: {mod.temperature}°C &nbsp; | &nbsp;
              {mod.failure ? 'Failure Detected' : 'Operational'}
            </p>
          </div>
          <div className={`unit-status ${mod.failure ? 'warning' : 'normal'}`}>
            {mod.failure ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RectifierModulesTab;
