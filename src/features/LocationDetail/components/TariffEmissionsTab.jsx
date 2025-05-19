import React, { useEffect } from 'react';
import { 
  Wind, 
  CloudLightning, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Download, 
  Maximize2 
} from 'lucide-react';
import BarChart from './../charts/BarChart';
import PieChart from './../charts/PieChart';

const TariffEmissionsTab = ({ 
  locationData, 
  setFullscreenChart 
}) => {
  useEffect(() => {
    // Debug logging
    console.log("TariffEmissionsTab locationData:", locationData);
    console.log("Energy Distribution Data:", locationData?.charts?.energyDistribution);
  }, [locationData]);

  // Guard clause for missing data
  if (!locationData || !locationData.charts) {
    return <div className="loading">Loading chart data...</div>;
  }

  return (
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
                onClick={() => setFullscreenChart({
                  type: 'bar', 
                  data: locationData.charts.carbonEmission, 
                  color: '#00f7ff',
                  yAxisLabel: 'Metric Tons'
                })}
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
          <BarChart 
            data={locationData.charts.carbonEmission} 
            color='#00f7ff' 
            yAxisLabel="Metric Tons" 
          />
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
                onClick={() => setFullscreenChart({
                  type: 'bar', 
                  data: locationData.charts.electricityTariff || locationData.charts.tariff, 
                  color: '#ff6b6b',
                  yAxisLabel: 'LKR'
                })}
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
          <BarChart 
            data={locationData.charts.electricityTariff || locationData.charts.tariff} 
            color="#ff6b6b" 
            yAxisLabel="LKR" 
          />
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
                onClick={() => setFullscreenChart({
                  type: 'bar', 
                  data: locationData.charts.energyConsumption, 
                  color: '#8AE98A',
                  yAxisLabel: 'KWh'
                })}
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
          <BarChart 
            data={locationData.charts.energyConsumption} 
            color="#8AE98A" 
            yAxisLabel="KWh" 
          />
        </div>
  
        <div className="chart-card">
          <div className="chart-header">
            <div className="flex items-center gap-2">
              <PieChartIcon size={20} />
              <h3>Energy Distribution</h3>
            </div>
            <div className="chart-actions">
              <button className="export-button">
                <Download size={16} className="mr-2" />
                Export
              </button>
              <button 
                className="fullscreen-button" 
                onClick={() => setFullscreenChart({
                  type: 'pie', 
                  data: locationData.charts.energyDistribution
                })}
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
          {locationData.charts.energyDistribution ? (
            <PieChart data={locationData.charts.energyDistribution} />
          ) : (
            <div className="empty-chart">No energy distribution data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TariffEmissionsTab;