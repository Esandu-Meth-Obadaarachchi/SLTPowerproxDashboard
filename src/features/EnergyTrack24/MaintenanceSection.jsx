import React from 'react';
import GraphBuilder from './GraphBuilder';

const MaintenanceSection = ({ data, reportType, setReportType, reportTimeRange, setReportTimeRange }) => {
  const reportTypes = [
    'Maintenance Log',
    'Completion Rate Report',
    'Preventive Maintenance',
    'Asset Maintenance History'
  ];

  const reportTimeRanges = [
    'Last 24 Hours',
    'Last 7 Days',
    'Last 30 Days',
    'Last 3 Months',
    'Last Year'
  ];

  const graphConfigs = [
    {
      title: 'Maintenance Completion Rate',
      data: data.completionRate,
      lines: [
        { dataKey: 'completed', name: 'Completed' },
        { dataKey: 'pending', name: 'Pending' }
      ]
    },
    {
      title: 'Maintenance by Asset Type',
      data: data.maintenanceByAssetType,
      lines: [
        { dataKey: 'hq', name: 'HQ' },
        { dataKey: 'east', name: 'East' },
        { dataKey: 'west', name: 'West' },
        { dataKey: 'north', name: 'North' }
      ]
    },
    {
      title: 'Maintenance by Location',
      data: data.maintenanceByLocation,
      lines: [
        { dataKey: 'hq', name: 'HQ' },
        { dataKey: 'east', name: 'East' },
        { dataKey: 'west', name: 'West' },
        { dataKey: 'north', name: 'North' }
      ]
    }
  ];

  return (
    <div className="maintenance-section">
      {/* Three Graph Containers */}
      <div className="graphs-container">
        {graphConfigs.map((config, index) => (
          <GraphBuilder
            key={index}
            title={config.title}
            data={config.data}
            lines={config.lines}
          />
        ))}
      </div>

      {/* Generate Report Section */}
      <div className="generate-report-section">
        <h3>Generate Maintenance Report</h3>
        <div className="report-controls">
          <div className="report-control">
            <label>Report Type</label>
            <select 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value)}
              className="report-select"
            >
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="report-control">
            <label>Time Range</label>
            <select 
              value={reportTimeRange} 
              onChange={(e) => setReportTimeRange(e.target.value)}
              className="report-select"
            >
              {reportTimeRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          <button className="generate-report-btn">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceSection;