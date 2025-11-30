import React from 'react';
import { 
  Database, 
  BarChart2, 
  Zap, 
  Wind,
  PieChart as PieChartIcon 
} from 'lucide-react';
import LineChart from './../charts/LineChart';
import BarChart from './../charts/BarChart';

const OperationalMetricsTab = ({ 
  locationData, 
  expandedSection, 
  toggleExpand,
  loading = false
}) => {
  return (
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
            <LineChart data={locationData.charts.pue} loading={loading} />
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <div className="flex items-center gap-2">
                <Wind size={20} />
                <h3>Total Load</h3>
              </div>
            </div>
            <BarChart 
              data={locationData.charts.totalLoad} 
              color="#8AE98A" 
              yAxisLabel="KW" 
              loading={loading}
            />
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
                icon: <PieChartIcon size={20} /> 
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
};

export default OperationalMetricsTab;