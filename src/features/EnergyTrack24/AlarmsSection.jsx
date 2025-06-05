import React from 'react';
import GraphBuilder from './GraphBuilder';

const AlarmsSection = ({ data, reportType, setReportType, reportTimeRange, setReportTimeRange }) => {
  const reportTypes = [
    'Alarm History',
    'Critical Alarms',
    'Warning Alarms',
    'System Health Report'
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
      title: 'Alarm Frequency (Last 30 Days)',
      data: data.alarmFrequency,
      lines: [
        { dataKey: 'hq', name: 'HQ' },
        { dataKey: 'east', name: 'East' },
        { dataKey: 'west', name: 'West' },
        { dataKey: 'north', name: 'North' }
      ]
    },
    {
      title: 'Alarms by Severity',
      data: data.alarmsBySeverity,
      lines: [
        { dataKey: 'critical', name: 'Critical' },
        { dataKey: 'warning', name: 'Warning' },
        { dataKey: 'info', name: 'Info' }
      ]
    },
    {
      title: 'Alarms by Asset Type',
      data: data.alarmsByAssetType,
      lines: [
        { dataKey: 'hq', name: 'HQ' },
        { dataKey: 'east', name: 'East' },
        { dataKey: 'west', name: 'West' },
        { dataKey: 'north', name: 'North' }
      ]
    }
  ];

  return (
    <div className="alarms-section">
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
        <h3>Generate Alarm Report</h3>
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

export default AlarmsSection;