import React from 'react';
import GraphBuilder from './GraphBuilder';

const PowerUsageSection = ({ data, reportType, setReportType, reportTimeRange, setReportTimeRange }) => {
  const reportTypes = [
    'Power Usage',
    'Efficiency Report',
    'Maintenance Log',
    'Alarm History'
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
      title: 'Power Consumption ',
      data: data.consumption,
      lines: [
        { dataKey: 'hq', name: 'HQ' },
        { dataKey: 'east', name: 'East' },
        { dataKey: 'west', name: 'West' },
        { dataKey: 'north', name: 'North' }
      ]
    },
    {
      title: 'Power Consumption by Location',
      data: data.byLocation,
      lines: [
        { dataKey: 'hq', name: 'HQ' },
        { dataKey: 'east', name: 'East' },
        { dataKey: 'west', name: 'West' },
        { dataKey: 'north', name: 'North' }
      ]
    },
    {
      title: 'Power Consumption by Asset Type',
      data: data.byAssetType,
      lines: [
        { dataKey: 'hq', name: 'HQ' },
        { dataKey: 'east', name: 'East' },
        { dataKey: 'west', name: 'West' },
        { dataKey: 'north', name: 'North' }
      ]
    }
  ];

  return (
    <div className="power-usage-section">
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
        <h3>Generate A Report</h3>
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

export default PowerUsageSection;