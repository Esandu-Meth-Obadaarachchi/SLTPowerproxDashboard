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

// Reusable ChartCard Component
const ChartCard = ({ title, icon: Icon, onExport, onFullscreen, children }) => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="flex items-center gap-2">
          <Icon size={20} />
          <h3>{title}</h3>
        </div>
        <div className="chart-actions">
          <button className="export-button" onClick={onExport}>
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="fullscreen-button" onClick={onFullscreen}>
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

const TariffEmissionsTab = ({ 
  locationData, 
  setFullscreenChart,
  loading = false 
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

  // Export handlers (placeholder for now)
  const handleExportCarbonEmission = () => {
    console.log("Exporting Carbon Emission data...");
  };

  const handleExportTariff = () => {
    console.log("Exporting Electricity Tariff data...");
  };

  const handleExportEnergyConsumption = () => {
    console.log("Exporting Energy Consumption data...");
  };

  const handleExportEnergyDistribution = () => {
    console.log("Exporting Energy Distribution data...");
  };

  return (
    <div className="charts-row">
      <div className="charts-grid">
        
        <ChartCard
          title="Carbon Emission"
          icon={Wind}
          onExport={handleExportCarbonEmission}
          onFullscreen={() => setFullscreenChart({
            type: 'bar', 
            data: locationData.charts.carbonEmission, 
            color: '#00f7ff',
            yAxisLabel: 'Metric Tons'
          })}
        >
          <BarChart 
            data={locationData.charts.carbonEmission} 
            color='#00f7ff' 
            yAxisLabel="Metric Tons" 
            loading={loading}
          />
        </ChartCard>

        <ChartCard
          title="Electricity Tariff"
          icon={CloudLightning}
          onExport={handleExportTariff}
          onFullscreen={() => setFullscreenChart({
            type: 'bar', 
            data: locationData.charts.electricityTariff || locationData.charts.tariff, 
            color: '#ff6b6b',
            yAxisLabel: 'LKR'
          })}
        >
          <BarChart 
            data={locationData.charts.electricityTariff || locationData.charts.tariff} 
            color="#ff6b6b" 
            yAxisLabel="LKR" 
            loading={loading}
          />
        </ChartCard>

        <ChartCard
          title="Energy Consumption"
          icon={TrendingUp}
          onExport={handleExportEnergyConsumption}
          onFullscreen={() => setFullscreenChart({
            type: 'bar', 
            data: locationData.charts.energyConsumption, 
            color: '#8AE98A',
            yAxisLabel: 'KWh'
          })}
        >
          <BarChart 
            data={locationData.charts.energyConsumption} 
            color="#8AE98A" 
            yAxisLabel="KWh" 
            loading={loading}
          />
        </ChartCard>

        <ChartCard
          title="Energy Distribution"
          icon={PieChartIcon}
          onExport={handleExportEnergyDistribution}
          onFullscreen={() => setFullscreenChart({
            type: 'pie', 
            data: locationData.charts.energyDistribution
          })}
        >
          {locationData.charts.energyDistribution ? (
            <PieChart data={locationData.charts.energyDistribution} loading={loading} />
          ) : (
            <div className="empty-chart">No energy distribution data available</div>
          )}
        </ChartCard>

      </div>
    </div>
  );
};

export default TariffEmissionsTab;