import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Overview.css';
import StatCard from '../shared/components/StatCard/StatCard';
import { Bolt, MapPin, AlertCircle, Battery, Activity, Clock } from 'lucide-react';

const Overview = () => {
  const navigate = useNavigate();
  //5foIlVThkUQK6wlKmtPaX_VBdRcdw44xTi5aqiO-97VZWyeG78rV7zMpT8L83ksWXWT7VjOZB1ZWWhdZ8D1mog==
  // Sample data with all locations
  const overviewData = {
    totalConsumption: '4250 kWh',
    avgEfficiency: '82%',
    activeAlerts: '7',
    generatorCount: '42',
    locationCount: '7',
    generatorStatus: {
      online: 23,
      standby: 12,
      fault: 5,
      warning: 2,
      total: 42
    },
    locations: [
      {
        name: 'SLT HQ',
        building: 'Headquarters Building',
        consumption: '1210 kWh',
        efficiency: '92% Eff',
        alerts: 1,
        rooms: 3,
        areas: [
          { name: 'Power Center', consumption: '620 kWh', efficiency: '94% Eff' },
          { name: 'Server Room A', consumption: '390 kWh', efficiency: '90% Eff' },
          { name: 'UPS Room', consumption: '200 kWh', efficiency: '85% Eff' }
        ],
        totalPower: '1210 kWh',
        totalEfficiency: '92% Eff'
      },
      {
        name: 'SLT OTS',
        building: 'Off-site Technical Station',
        consumption: '980 kWh',
        efficiency: '72% Eff',
        alerts: 2,
        rooms: 3,
        areas: [
          { name: 'Backup Power', consumption: '420 kWh', efficiency: '70% Eff' },
          { name: 'Control Room', consumption: '380 kWh', efficiency: '75% Eff' },
          { name: 'Generator Room', consumption: '180 kWh', efficiency: '68% Eff' }
        ],
        totalPower: '980 kWh',
        totalEfficiency: '72% Eff'
      },
      {
        name: 'SLT WELIKADA A',
        building: 'Welikada A Power Distribution Station',
        consumption: '1250 kWh',
        efficiency: '88% Eff',
        alerts: 0,
        rooms: 3,
        areas: [
          { name: 'Distribution Center', consumption: '650 kWh', efficiency: '90% Eff' },
          { name: 'Control Room', consumption: '400 kWh', efficiency: '88% Eff' },
          { name: 'Power Backup', consumption: '200 kWh', efficiency: '85% Eff' }
        ],
        totalPower: '1250 kWh',
        totalEfficiency: '88% Eff'
      },
      {
        name: 'SLT WELIKADA B',
        building: 'Welikada B Power Distribution Station',
        consumption: '850 kWh',
        efficiency: '75% Eff',
        alerts: 1,
        rooms: 2,
        areas: [
          { name: 'Distribution Center', consumption: '500 kWh', efficiency: '78% Eff' },
          { name: 'Control Room', consumption: '350 kWh', efficiency: '70% Eff' }
        ],
        totalPower: '850 kWh',
        totalEfficiency: '75% Eff'
      },
      {
        name: 'SLT Thalawathugoda RSU',
        building: 'Thalawathugoda Remote Service Unit',
        consumption: '420 kWh',
        efficiency: '85% Eff',
        alerts: 0,
        rooms: 1,
        areas: [
          { name: 'Service Unit', consumption: '420 kWh', efficiency: '85% Eff' }
        ],
        totalPower: '420 kWh',
        totalEfficiency: '85% Eff'
      },
      {
        name: 'SLT MATTAKKULIYA TELESHOP',
        building: 'Mattakkuliya Teleshop Backup Station',
        consumption: '310 kWh',
        efficiency: '80% Eff',
        alerts: 0,
        rooms: 1,
        areas: [
          { name: 'Backup Station', consumption: '310 kWh', efficiency: '80% Eff' }
        ],
        totalPower: '310 kWh',
        totalEfficiency: '80% Eff'
      },
      {
        name: 'SLT NAWALA EXCHANGE',
        building: 'Nawala Exchange Power Center',
        consumption: '580 kWh',
        efficiency: '79% Eff',
        alerts: 2,
        rooms: 2,
        areas: [
          { name: 'Exchange Center', consumption: '380 kWh', efficiency: '82% Eff' },
          { name: 'Power Room', consumption: '200 kWh', efficiency: '74% Eff' }
        ],
        totalPower: '580 kWh',
        totalEfficiency: '79% Eff'
      },
      {
        name: 'SLT NEGOMBO EXCHANGE',
        building: 'Negombo Exchange Power Center',
        consumption: '510 kWh',
        efficiency: '76% Eff',
        alerts: 1,
        rooms: 2,
        areas: [
          { name: 'Exchange Center', consumption: '310 kWh', efficiency: '78% Eff' },
          { name: 'Power Room', consumption: '200 kWh', efficiency: '73% Eff' }
        ],
        totalPower: '510 kWh',
        totalEfficiency: '76% Eff'
      }
    ]
  };

  const handleLocationClick = (locationName) => {
  // Navigate to the location detail page with the location name as ID
  navigate(`/app/location/${encodeURIComponent(locationName)}`);
  };

  return (
    <div className="energy-dashboard-container">
      <h1 className="energy-dashboard-title">Energy Analytics Overview</h1>
      
      <div className="energy-dashboard-summary">
        <div className="energy-stats-container">
          <div className="energy-summary-stats">
            <StatCard 
              title="Total Consumption" 
              value={overviewData.totalConsumption} 
              icon={<Bolt color="#0077ff" />} 
            />
            <StatCard 
              title="Avg. Efficiency" 
              value={overviewData.avgEfficiency} 
              icon={<Activity color="#0077ff" />} 
            />
            <StatCard 
              title="Active Alerts" 
              value={overviewData.activeAlerts} 
              icon={<AlertCircle color="#ff3333" />} 
            />
            <StatCard 
              title="NO. Generators" 
              value={overviewData.generatorCount} 
               icon={<div className="generator-icon"><Battery color="#0077ff" /></div>}
            />
            <StatCard 
              title="NO. Locations" 
              value={overviewData.locationCount} 
              icon={<MapPin color="#0077ff" />} 
            />
          </div>
          
          <div className="energy-generator-status">
            <h2>Generator Status Summary</h2>
            <div className="energy-status-indicators">
              <div className="energy-status-item online">
                <span className="energy-status-label">Online</span>
                <span className="energy-status-value">{overviewData.generatorStatus.online}</span>
              </div>
              <div className="energy-status-item standby">
                <span className="energy-status-label">Standby</span>
                <span className="energy-status-value">{overviewData.generatorStatus.standby}</span>
              </div>
              <div className="energy-status-item fault">
                <span className="energy-status-label">Fault</span>
                <span className="energy-status-value">{overviewData.generatorStatus.fault}</span>
              </div>
              <div className="energy-status-item warning">
                <span className="energy-status-label">Warning</span>
                <span className="energy-status-value">{overviewData.generatorStatus.warning}</span>
              </div>
              <div className="energy-status-item total">
                <span className="energy-status-label">Total</span>
                <span className="energy-status-value">{overviewData.generatorStatus.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="energy-locations-grid">
        {overviewData.locations.map((location, index) => (
          <div 
            key={index} 
            className="energy-location-card"
            onClick={() => handleLocationClick(location.name)}
            style={{ cursor: 'pointer' }}
          >
            <div className="energy-location-header">
              <div className="energy-location-title">
                <h3>{location.name}</h3>
                <p>{location.building}</p>
              </div>
              <div className="energy-location-stats">
                <div className="energy-consumption">{location.consumption}</div>
                <div className="energy-efficiency">{location.efficiency}</div>
              </div>
              {location.alerts > 0 && (
                <div className="energy-location-alerts">
                  <span className="energy-alert-count has-alerts">
                    {location.alerts} Alert{location.alerts !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
            
            <div className="energy-location-details">
              <div className="energy-room-count">Number of rooms = {location.rooms}</div>
              <div className="energy-areas-section">
                <h4>Rooms & Areas</h4>
                <div className="energy-areas-list">
                  {location.areas.map((area, areaIndex) => (
                    <div key={areaIndex} className="energy-area-item">
                      <div className="energy-area-name">{area.name}</div>
                      <div className="energy-area-consumption">{area.consumption}</div>
                      <div className="energy-area-efficiency">{area.efficiency}</div>
                      <div className="energy-trend-indicator down">↓</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="energy-location-totals">
                <div className="energy-total-row">
                  <div className="energy-total-label">Total Power</div>
                  <div className="energy-total-value">{location.totalPower}</div>
                  <div className="energy-total-efficiency">{location.totalEfficiency}</div>
                  <div className="energy-trend-indicator down">↓</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;