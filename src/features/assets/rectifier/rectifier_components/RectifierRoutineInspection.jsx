import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import '../../../../styles/assets/rectifier/RectifierRoutineInspection.css';

const StatusBadge = ({ status }) => {
  const color =
    status.toLowerCase() === 'ok'
      ? 'green'
      : status.toLowerCase().includes('cleaning') || status === 'Warning'
      ? 'orange'
      : 'red';
  return <span className={`status-badge ${color}`}>{status}</span>;
};

const InspectionItem = ({ label, value }) => (
  <div className="inspection-item">
    <span>{label}</span>
    <span className="value">
      <StatusBadge status={value} />
      {(value === 'Ok' || value === 'Normal') && <CheckCircle size={16} color="green" />}
    </span>
  </div>
);

const generateDefaultData = () => ({
  routine: [
    { label: 'Cleanliness of Room', value: 'Ok' },
    { label: 'Cleanliness of Cubicles', value: 'Ok' },
    { label: 'Measure Room Temperature', value: 'Normal' },
    { label: 'Measure Hydrogen Gas Emission', value: 'No' },
    { label: 'Check Main Circuit', value: 'Ok' },
    { label: 'DC PDB', value: 'Ok' },
    { label: 'Test Remote Alarm', value: 'Ok' },
    { label: 'No. of Working Lines', value: '5' },
    { label: 'Capacity', value: '5' },
  ],
  readings: {
    voltage: [
      { label: 'Phase 1', value: '402 V' },
      { label: 'Phase 2', value: '401 V' },
      { label: 'Phase 3', value: '401 V' },
    ],
    current: [
      { label: 'Phase 1', value: '12.7 A' },
      { label: 'Phase 2', value: '12.7 A' },
      { label: 'Phase 3', value: '12.7 A' },
    ],
    dcOutput: [
      { label: 'Voltage', value: '53.6 V' },
      { label: 'Current', value: '168.8 A' },
      { label: 'Capacity', value: '1000' },
    ],
    alarmStatus: 'Ok',
    indicatorStatus: 'Ok',
  },
});

const RectifierRoutineInspection = () => {
  const [activeTab, setActiveTab] = useState('routine');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dataStore, setDataStore] = useState({
    [new Date().toISOString().split('T')[0]]: generateDefaultData(),
  });

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setDataStore((prev) => {
      if (!prev[date]) {
        return { ...prev, [date]: generateDefaultData() };
      }
      return prev;
    });
  };

  const currentData = dataStore[selectedDate] || generateDefaultData();

  return (
    <div className="inspection-section">
      <div className="tabs">
        <button
          className={activeTab === 'routine' ? 'active' : ''}
          onClick={() => setActiveTab('routine')}
        >
          Routine Inspections
        </button>
        <button
          className={activeTab === 'readings' ? 'active' : ''}
          onClick={() => setActiveTab('readings')}
        >
          Rectifier Reading
        </button>
      </div>

      <div className="date-selector">
        <label>Select Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>

      {activeTab === 'routine' && (
        <>
          <h2 className="section-title">Inspection Detail</h2>
          <div className="inspection-box">
            {currentData.routine.map((item, idx) => (
              <InspectionItem key={idx} label={item.label} value={item.value} />
            ))}
          </div>
        </>
      )}

      {activeTab === 'readings' && (
        <>
          <h2 className="section-title">Rectifier Reading</h2>
          <div className="inspection-box readings-grid">
            <div>
              <strong>Voltage Reading</strong>
              <table>
                <tbody>
                  {currentData.readings.voltage.map((v, idx) => (
                    <tr key={idx}>
                      <td>{v.label}</td>
                      <td>{v.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <strong>Current Reading</strong>
              <table>
                <tbody>
                  {currentData.readings.current.map((v, idx) => (
                    <tr key={idx}>
                      <td>{v.label}</td>
                      <td>{v.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <strong>DC Output</strong>
              <table>
                <tbody>
                  {currentData.readings.dcOutput.map((v, idx) => (
                    <tr key={idx}>
                      <td>{v.label}</td>
                      <td>{v.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <InspectionItem label="Alarm Status" value={currentData.readings.alarmStatus} />
            <InspectionItem label="Indicator Status" value={currentData.readings.indicatorStatus} />
          </div>
        </>
      )}
    </div>
  );
};

export default RectifierRoutineInspection;
