import React from 'react';
import GraphBuilder from './GraphBuilder';

const EfficiencySection = ({ data, reportType, setReportType, reportTimeRange, setReportTimeRange }) => {
  const reportTypes = [
    'Efficiency Report',
    'PUE Analysis',
    'Cooling Efficiency',
    'UPS Efficiency'
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
      title: 'PUE Trend by Location (Last 12 Months)',
      data: data.pueByLocation,
      lines: [
        { dataKey: 'hq', name: 'HQ PUE' },
        { dataKey: 'east', name: 'East PUE' },
        { dataKey: 'west', name: 'West PUE' },
        { dataKey: 'north', name: 'North PUE' }
      ]
    },
    {
      title: 'UPS Efficiency by Location',
      data: data.upsEfficiency,
      lines: [
        { dataKey: 'hq', name: 'HQ' },
        { dataKey: 'east', name: 'East' },
        { dataKey: 'west', name: 'West' },
        { dataKey: 'north', name: 'North' }
      ]
    },
    {
      title: 'Cooling Efficiency by Location',
      data: data.coolingEfficiency,
      lines: [
        { dataKey: 'hq', name: 'HQ' },
        { dataKey: 'east', name: 'East' },
        { dataKey: 'west', name: 'West' },
        { dataKey: 'north', name: 'North' }
      ]
    }
  ];

  return (
    <div className="efficiency-section">
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
        <h3>Generate Efficiency Report</h3>
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

export default EfficiencySection;