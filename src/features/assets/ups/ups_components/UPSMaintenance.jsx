import React from 'react';


const maintenanceSchedule = [
  {
    id: 'UPS-01',
    location: 'HQ Data Center',
    scheduledDate: '2025-08-10',
    service: 'Battery Health Check'
  },
  {
    id: 'UPS-02',
    location: 'East Wing',
    scheduledDate: '2025-07-05',
    service: 'Battery replacement'
  },
  {
    id: 'UPS-03',
    location: 'North Branch',
    scheduledDate: '2025-06-22',
    service: 'Annual maintenance'
  }
];

const Maintenance = () => {
  return (
    <div className="tab-content-section">
      <h3 className="maintenance-title">Maintenance Schedule</h3>
      <div className="maintenance-table">
        <div className="maintenance-header">
          <span>UPS ID</span>
          <span>Location</span>
          <span>Scheduled Date</span>
          <span>Service</span>
        </div>
        {maintenanceSchedule.map((item) => (
          <div className="maintenance-row" key={item.id}>
            <span>{item.id}</span>
            <span>{item.location}</span>
            <span>{item.scheduledDate}</span>
            <span>{item.service}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;
