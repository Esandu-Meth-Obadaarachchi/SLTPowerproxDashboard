import React from 'react';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';

const FullScreenModal = ({ chartType, data, color, yAxisLabel, onClose }) => {
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart data={data} color={color} yAxisLabel={yAxisLabel} />;
      case 'line':
        return <LineChart data={data} />;
      case 'pie':
        return <PieChart data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="fullscreen-chart-modal">
      <button className="close-fullscreen-btn" onClick={onClose}>
        Close
      </button>
      {renderChart()}
    </div>
  );
};

export default FullScreenModal;