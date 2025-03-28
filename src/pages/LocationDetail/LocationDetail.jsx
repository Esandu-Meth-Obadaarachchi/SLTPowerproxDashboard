import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BarChart2, 
  Activity, 
  Wind, 
  Database, 
  Zap, 
  CloudLightning, 
  BarChart, 
  PieChart,
  TrendingUp,
  Download,
  Maximize2,
  Calendar
} from 'lucide-react';
import './LocationDetail.css';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';


const LocationDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('LiveData');
  const [timeframeFilter, setTimeframeFilter] = useState('Daily');
  const [currentDate, setCurrentDate] = useState('2025-02-04');
  const [locationData, setLocationData] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [fullscreenChart, setFullscreenChart] = useState(null);

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

  // Hardcoded data for demo purposes
  useEffect(() => {
    const mockLocations = {
      'SLT-HQ': {
        name: 'HQ - Data Center 3F',
        generators: [
          { id: 'Gen_HQb_1', status: 'Online', statusColor: '#8AE98A' },
          { id: 'Gen_HQb_2', status: 'Standby', statusColor: '#5B7EC2' },
          { id: 'Gen_HQb_3', status: 'Online', statusColor: '#8AE98A' }
        ],
        metrics: {
          pue: 1.84,
          carbonEmission: '1613.61 MT/Year',
          electricalCost: '269,817.60 LKR/Year',
          itLoad: '143.07 KW',
          acLoad: '78.08 KW',
          totalLoad: '268.95 KW'
        },
        charts: {
          pue: generateMockChartData(1.83, 1.92, 25),
          totalLoad: generateMockChartData(250, 280, 25),
          carbonEmission: generateMockBarChartData(1000, 2000, 24),
          electricityTariff: generateMockBarChartData(10000, 20000, 24),
          energyConsumption: generateMockBarChartData(100, 200, 24),
          energyDistribution: generateMockPieChartData()
        }
      },
      'SLT-OTS': {
        name: 'OTS Facility',
        generators: [
          { id: 'Gen_OTS_1', status: 'Online', statusColor: '#8AE98A' },
          { id: 'Gen_OTS_2', status: 'Standby', statusColor: '#5B7EC2' },
          { id: 'Gen_OTS_3', status: 'Warning', statusColor: '#EDA566' }
        ],
        metrics: {
          pue: 1.89,
          carbonEmission: '1532.45 MT/Year',
          electricalCost: '253,982.30 LKR/Year',
          itLoad: '135.22 KW',
          acLoad: '75.41 KW',
          totalLoad: '255.63 KW'
        },
        charts: {
          pue: generateMockChartData(1.82, 1.94, 25),
          totalLoad: generateMockChartData(245, 275, 25),
          carbonEmission: generateMockBarChartData(1000, 2000, 24),
          electricityTariff: generateMockBarChartData(10000, 20000, 24)
        }
      }
    };

    setLocationData(mockLocations[id] || mockLocations['SLT-HQ']);
  }, [id]);

  // Function to generate mock pie chart data for energy distribution
  function generateMockPieChartData() {
    return [
      { name: 'IT Load', value: 53.2 },
      { name: 'AC Load', value: 29.1 },
      { name: 'Other Systems', value: 17.7 }
    ];
  }

  // Render full screen chart modal
  const renderFullscreenChart = (chartType, data, color) => {
    if (!fullscreenChart) return null;

    const chartRenderer = {
      'bar': () => renderBarChart(data, color),
      'line': () => renderPUEChart(data),
      'pie': () => renderPieChart(data)
    };

    return (
      <div className="fullscreen-chart-modal">
        <button 
          className="close-fullscreen-btn" 
          onClick={() => setFullscreenChart(null)}
        >
          Close
        </button>
        {chartRenderer[chartType]()}
      </div>
    );
  };

  const renderPieChart = (data) => (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={['#00f7ff', '#8AE98A', '#ff6b6b'][index % 3]} 
              />
            ))}
          </Pie>
        </RechartsPieChart>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            border: 'none', 
            color: 'white' 
          }}
        />
     </ResponsiveContainer>
  );

  // Enhanced chart rendering functions
  const renderPUEChart = (data) => (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="time" 
          label={{ 
            value: 'Time', 
            position: 'insideBottomRight', 
            offset: -10,
            fill: 'white' 
          }}
          tick={{ fill: 'white', fontSize: 10 }} 
          axisLine={{ stroke: 'white' }}
        />
        <YAxis 
          domain={[1.7, 2.1]} 
          label={{ 
            value: 'PUE', 
            angle: -90, 
            position: 'insideLeft', 
            fill: 'white' 
          }}
          tick={{ fill: 'white', fontSize: 10 }} 
          axisLine={{ stroke: 'white' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            border: 'none', 
            color: 'white' 
          }}
          labelStyle={{ color: 'white' }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#00f7ff" 
          strokeWidth={3} 
          dot={{ r: 5, fill: '#00f7ff', stroke: 'white', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = (data, color = '#00f7ff',value) => (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="time" 
          label={{ 
            value: 'Time', 
            position: 'insideBottomRight', 
            offset: -10,
            fill: 'white' 
          }}
          tick={{ fill: 'white', fontSize: 10 }} 
          axisLine={{ stroke: 'white' }}
        />
        <YAxis 
          label={{ 
            value: value, 
            angle: -90, 
            position: 'insideLeft', 
            fill: 'white' 
          }}
          tick={{ fill: 'white', fontSize: 10 }} 
          axisLine={{ stroke: 'white' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            border: 'none', 
            color: 'white' 
          }}
          labelStyle={{ color: 'white' }}
        />
        <Bar dataKey="value" fill={color} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );

  // Function to generate mock line chart data
  function generateMockChartData(min, max, points) {
    const data = [];
    let currentTime = new Date();
    currentTime.setHours(14, 0, 0, 0);
    
    for (let i = 0; i < points; i++) {
      const value = min + Math.random() * (max - min);
      const timeString = currentTime.toTimeString().substring(0, 5);
      
      data.push({
        time: timeString,
        value: parseFloat(value.toFixed(2))
      });
      
      currentTime = new Date(currentTime.getTime() + 30 * 1000);
    }
    
    return data;
  }
  const generatorStatusColors = {
    'Online': '#8AE98A',
    'Standby': '#5B7EC2',
    'Warning': '#EDA566',
    'Offline': '#FF6B6B'
  };
  // Function to generate mock bar chart data
  function generateMockBarChartData(min, max, points) {
    const data = [];
    let currentTime = new Date();
    currentTime.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < points; i++) {
      const value = min + Math.random() * (max - min);
      const timeString = currentTime.toTimeString().substring(0, 5);
      
      data.push({
        time: timeString,
        value: parseFloat(value.toFixed(2))
      });
      
      currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
    }
    
    return data;
  }

  if (!locationData) {
    return <div>Loading...</div>;
  }

  const toggleExpand = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderLiveDataTab = () => (
    <>
      <div className="generators-section">
        <h2 className="section-title">Generators Status</h2>
        <div className="generators-grid">
          {locationData.generators.map((generator) => (
            <div 
              key={generator.id} 
              className="generator-card" 
              style={{ 
                backgroundColor: generatorStatusColors[generator.status] + '20',
                borderLeft: `4px solid ${generatorStatusColors[generator.status]}`
              }}
            >
              <div className="generator-info">
                <div style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '0.5rem'
                }}>
                  <span 
                    className="generator-status-indicator" 
                    style={{ 
                      backgroundColor: generatorStatusColors[generator.status] 
                    }}
                  ></span>
                  <span className="generator-id">{generator.id}</span>
                </div>
                <span className="generator-status">{generator.status}</span>
              </div>
              <button className="view-button">Details</button>
            </div>
          ))}
        </div>
      </div>

      

      <div className="metrics-section">
        <div className={`metrics-card ${expandedSection === 'facility' ? 'expanded' : ''}`}>
          <div className="metrics-card-header">
            <h2>{locationData.name}</h2>
            <button className="expand-button" onClick={() => toggleExpand('facility')}>
              <i className="fa fa-expand"></i>
            </button>
          </div>
          <div className="load-circles">
            <div className="load-circle it-load">
              <div className="load-value">{locationData.metrics.itLoad}</div>
              <div className="load-label">IT Load</div>
            </div>
            <div className="load-circle ac-load">
              <div className="load-value">{locationData.metrics.acLoad}</div>
              <div className="load-label">AC Load</div>
            </div>
            <div className="load-circle total-load">
              <div className="load-value">{locationData.metrics.totalLoad}</div>
              <div className="load-label">Total Load</div>
            </div>
          </div>
        </div>

        <div className="load-tables-section">
        <div className="load-tables-container">
          <div className="load-table-card">
            <div className="load-table-header">
              <h3>IT Load Table</h3>
              <button className="load-button">Load Details</button>
            </div>
            <div className="load-table-content">
              {/* Add table content here */}
              <table>
                <thead>
                  <tr>
                    <th>Rack</th>
                    <th>Load (KW)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rack A1</td>
                    <td>22.5</td>
                    <td>Normal</td>
                  </tr>
                  <tr>
                    <td>Rack B2</td>
                    <td>18.3</td>
                    <td>Normal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="load-table-card">
            <div className="load-table-header">
              <h3>AC Load Table</h3>
              <button className="load-button">Load Details</button>
            </div>
            <div className="load-table-content">
              {/* Add table content here */}
              <table>
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th>Load (KW)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>AC Unit 1</td>
                    <td>35.2</td>
                    <td>Normal</td>
                  </tr>
                  <tr>
                    <td>AC Unit 2</td>
                    <td>42.8</td>
                    <td>Normal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );

  const renderTariffEmissionsTab = () => (
    <div className="charts-row">
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <div className="flex items-center gap-2">
              <Wind size={20} />
              <h3>Carbon Emission</h3>
            </div>
            <div className="chart-actions">
              <button className="export-button">
                <Download size={16} className="mr-2" />
                Export
              </button>
              <button 
                className="fullscreen-button" 
                onClick={() => setFullscreenChart({type: 'bar', data: locationData.charts.carbonEmission, color: '#00f7ff'})}
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
          {renderBarChart(locationData.charts.carbonEmission, '#00f7ff',"Metric Tons")}
        </div>
  
        <div className="chart-card">
          <div className="chart-header">
            <div className="flex items-center gap-2">
              <CloudLightning size={20} />
              <h3>Electricity Tariff</h3>
            </div>
            <div className="chart-actions">
              <button className="export-button">
                <Download size={16} className="mr-2" />
                Export
              </button>
              <button 
                className="fullscreen-button" 
                onClick={() => setFullscreenChart({type: 'bar', data: locationData.charts.electricityTariff, color: '#ff6b6b'})}
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
          {renderBarChart(locationData.charts.electricityTariff, '#ff6b6b',"LKR")}
        </div>
  
        <div className="chart-card">
          <div className="chart-header">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} />
              <h3>Energy Consumption</h3>
            </div>
            <div className="chart-actions">
              <button className="export-button">
                <Download size={16} className="mr-2" />
                Export
              </button>
              <button 
                className="fullscreen-button" 
                onClick={() => setFullscreenChart({type: 'bar', data: locationData.charts.energyConsumption, color: '#8AE98A'})}
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
          {renderBarChart(locationData.charts.energyConsumption, '#8AE98A', "KWh")}
        </div>
  
        <div className="chart-card">
          <div className="chart-header">
            <div className="flex items-center gap-2">
              <PieChart size={20} />
              <h3>Energy Distribution</h3>
            </div>
            <div className="chart-actions">
              <button className="export-button">
                <Download size={16} className="mr-2" />
                Export
              </button>
              <button 
                className="fullscreen-button" 
                onClick={() => setFullscreenChart({type: 'pie', data: locationData.charts.energyDistribution})}
              >
                <Maximize2 size={10} />
              </button>
            </div>
          </div>
          {renderPieChart(locationData.charts.energyDistribution)}
        </div>
      </div>
  
      {fullscreenChart && renderFullscreenChart(
        fullscreenChart.type, 
        fullscreenChart.data, 
        fullscreenChart.color
      )}
    </div>
  );

  const renderOperationalMetricsTab = () => (
    <div className="metrics-section">
      <div className={`metrics-card full-width ${expandedSection === 'operational-metrics' ? 'expanded' : ''}`}>
        <div className="metrics-card-header">
          <div className="flex items-center gap-2">
            <Database size={24} />
            <h2>Operational Metrics</h2>
          </div>
          <div className="chart-actions">
            <button 
              className="expand-button" 
              onClick={() => toggleExpand('operational-metrics')}
            >
              <BarChart2 size={20} />
            </button>
          </div>
        </div>
        
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <div className="flex items-center gap-2">
                <Zap size={20} />
                <h3>PUE Performance</h3>
              </div>
            </div>
            {renderPUEChart(locationData.charts.pue)}
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <div className="flex items-center gap-2">
                <Wind size={20} />
                <h3>Total Load</h3>
              </div>
            </div>
            {renderBarChart(locationData.charts.totalLoad, '#8AE98A',"KW")}
          </div>

          <div className="metrics-summary">
            {[
              { 
                label: 'PUE', 
                value: locationData.metrics.pue, 
                icon: <Zap size={20} /> 
              },
              { 
                label: 'Carbon Emission', 
                value: locationData.metrics.carbonEmission, 
                icon: <Wind size={20} /> 
              },
              { 
                label: 'Electrical Cost', 
                value: locationData.metrics.electricalCost, 
                icon: <PieChart size={20} /> 
              }
            ].map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="flex items-center gap-2 mb-2">
                  {metric.icon}
                  <label>{metric.label}</label>
                </div>
                <span className="metric-value">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

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
              <span>{currentDate}</span>
            </div>
            <button className="fullscreen-button">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="location-detail-content">
        {activeTab === 'LiveData' && renderLiveDataTab()}
        {activeTab === 'Tariff&Emissions' && renderTariffEmissionsTab()}
        {activeTab === 'OperationalMetrics' && renderOperationalMetricsTab()}
      </div>
    </div>
  );
};

export default LocationDetail;