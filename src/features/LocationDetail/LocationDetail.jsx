import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Activity, 
  CloudLightning, 
  BarChart, 
  Database, 
  Calendar,
  Maximize2 
} from 'lucide-react';
import './LocationDetail.css';

// Import tab components
import LiveDataTab from './components/LiveDataTab';
import TariffEmissionsTab from './components/TariffEmissionsTab';
import OperationalMetricsTab from './components/OperationalMetricsTab';

// Import utility functions
import { processApiData } from './utils/dataProcessing';

// Import data service
import DataService from './locationDetailAPI';

// Import common components
import FullScreenModal from './components/FullScreenModal';

const LocationDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('LiveData');
  const [timeframeFilter, setTimeframeFilter] = useState('Live');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [locationData, setLocationData] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [fullscreenChart, setFullscreenChart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { 
      id: 'LiveData', 
      label: 'Live Data', 
      icon: <Activity size={18} /> 
    },
    { 
      id: 'Tariff&Emissions', 
      label: 'Tariff & Emissions', 
      icon: <CloudLightning size={18} /> 
    },
    { 
      id: 'OperationalMetrics', 
      label: 'Operational Metrics', 
      icon: <BarChart size={18} /> 
    }
  ];

  // Generator status is hardcoded for now, but could be fetched from InfluxDB
  const generatorData = {
    'SLT-HQ': [
      { id: 'Gen_HQb_1', status: 'Online', statusColor: '#8AE98A' },
      { id: 'Gen_HQb_2', status: 'Standby', statusColor: '#5B7EC2' },
      { id: 'Gen_HQb_3', status: 'Online', statusColor: '#8AE98A' }
    ],
    'SLT-OTS': [
      { id: 'Gen_OTS_1', status: 'Online', statusColor: '#8AE98A' },
      { id: 'Gen_OTS_2', status: 'Standby', statusColor: '#5B7EC2' },
      { id: 'Gen_OTS_3', status: 'Warning', statusColor: '#EDA566' }
    ]
  };

  // Location names mapping
  const locationNames = {
    'SLT-HQ': 'HQ - Data Center 3F',
    'SLT-OTS': 'OTS Facility'
  };

  const generatorStatusColors = {
    'Online': '#8AE98A',
    'Standby': '#5B7EC2',
    'Warning': '#EDA566',
    'Offline': '#FF6B6B'
  };

  useEffect(() => {
    // Fetch data using the DataService
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Basic location data
        const timeframeData = await DataService.fetchTimeframeData(timeframeFilter);
        
        // Charts data for the active tab
        let chartData = {};
        let energyDistribution = [];
        let carbonAndTariff = {};
        
        // Fetch specific data based on active tab
        if (activeTab === 'LiveData' || activeTab === 'OperationalMetrics') {
          chartData = await DataService.fetchChartData(timeframeFilter);
        }
        
        // Always fetch energy distribution for any tab since it's used in multiple tabs
        try {
          const energyDistResponse = await DataService.fetchEnergyDistribution(timeframeFilter);
          console.log("Energy distribution response:", energyDistResponse);
          energyDistribution = energyDistResponse.energyDistribution || [];
        } catch (distError) {
          console.error("Error fetching energy distribution:", distError);
          energyDistribution = [
            { name: "IT Load", value: 50 },
            { name: "AC Load", value: 30 },
            { name: "Other Systems", value: 20 }
          ];
        }
        
        // Fetch carbon and tariff data for the Tariff&Emissions tab
        if (activeTab === 'Tariff&Emissions' || activeTab === 'LiveData') {
          carbonAndTariff = await DataService.fetchCarbonAndTariff(timeframeFilter);
        }
        
        // Process and combine all data
        const processedData = processApiData(timeframeData.data);
        
        // Combine data from different sources
        setLocationData({
          name: locationNames[id] || 'HQ - Data Center 3F',
          generators: generatorData[id] || generatorData['SLT-HQ'],
          ...processedData,
          charts: {
            ...processedData.charts,
            ...chartData,
            ...carbonAndTariff,
            energyDistribution: energyDistribution
          }
        });
  
        // Debug log to verify energy distribution data is correctly set
        console.log("Final energyDistribution data:", energyDistribution);
      } catch (err) {
        console.error(`Error fetching data:`, err);
        setError(`Failed to fetch data. Please check your connection or try again later.`);
        
        // Create empty data structure as fallback with mock energy distribution
        setLocationData({
          name: locationNames[id] || 'HQ - Data Center 3F',
          generators: generatorData[id] || generatorData['SLT-HQ'],
          metrics: {
            pue: '0.00',
            carbonEmission: '0.00 MT/Year',
            electricalCost: '0.00 LKR/Year',
            itLoad: '0.00 KW',
            acLoad: '0.00 KW',
            totalLoad: '0.00 KW'
          },
          charts: {
            pue: [],
            totalLoad: [],
            carbonEmission: [],
            electricityTariff: [],
            tariff: [],
            energyConsumption: [],
            energyDistribution: [
              { name: 'IT Load', value: 50 },
              { name: 'AC Load', value: 30 },
              { name: 'Other Systems', value: 20 }
            ]
          }
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Set up data refresh interval (only for Live data)
    let refreshInterval;
    if (timeframeFilter === 'Live') {
      refreshInterval = setInterval(() => {
        fetchData();
      }, 30000); // 30 seconds refresh for Live data
    }
    
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [id, timeframeFilter, activeTab]); // Re-fetch when tab or timeframe changes

  const toggleExpand = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Handle fullscreen chart rendering
  const handleFullscreenChart = (chartData) => {
    setFullscreenChart(chartData);
  };

  // Close fullscreen chart
  const closeFullscreenChart = () => {
    setFullscreenChart(null);
  };

  // Handle date change 
  const handleDateChange = (date) => {
    setCurrentDate(date);
    // Optionally, you could fetch data for the specific date here
  };

  if (isLoading) {
    return <div className="loading-container">Loading {timeframeFilter} data...</div>;
  }

  if (!locationData) {
    return <div className="error-container">No data available</div>;
  }

  return (
    <div className="location-detail-container">
      <div className="location-detail-header">
        <h1 className="overview-title">
          <div className="overview-title-icon">
            <Database size={24} />
          </div>
          Location Overview
        </h1>
        <div className="header-controls">
          <div className="tabs-container">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-button-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="right-controls">
            <div className="timeframe-filter">
              {['Live', 'Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly'].map(filter => (
                <span 
                  key={filter}
                  className={timeframeFilter === filter ? 'active' : ''} 
                  onClick={() => setTimeframeFilter(filter)}
                >
                  {filter}
                </span>
              ))}
            </div>
            <div className="date-picker">
              <Calendar size={16} />
              <input 
                type="date" 
                value={currentDate}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>
            <button className="fullscreen-button">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="location-detail-content">
        {activeTab === 'LiveData' && (
          <LiveDataTab 
            locationData={locationData}
            expandedSection={expandedSection}
            toggleExpand={toggleExpand}
            generatorStatusColors={generatorStatusColors}
            error={error}
            timeframeFilter={timeframeFilter}
          />
        )}
        {activeTab === 'Tariff&Emissions' && (
          <TariffEmissionsTab 
            locationData={locationData}
            setFullscreenChart={handleFullscreenChart}
            timeframeFilter={timeframeFilter}
          />
        )}
        {activeTab === 'OperationalMetrics' && (
          <OperationalMetricsTab 
            locationData={locationData}
            expandedSection={expandedSection}
            toggleExpand={toggleExpand}
            setFullscreenChart={handleFullscreenChart}
            timeframeFilter={timeframeFilter}
          />
        )}
      </div>
      
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      {fullscreenChart && (
        <FullScreenModal 
          chartData={fullscreenChart}
          onClose={closeFullscreenChart}
        />
      )}
    </div>
  );
};

export default LocationDetail;