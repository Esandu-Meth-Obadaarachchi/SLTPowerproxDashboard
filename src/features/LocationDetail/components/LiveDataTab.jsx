import React from 'react';
import { Activity } from 'lucide-react';

const LiveDataTab = ({ 
  locationData, 
  expandedSection, 
  toggleExpand, 
  generatorStatusColors, 
  error 
}) => {
  return (
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
                      <td>0.00</td>
                      <td>Unknown</td>
                    </tr>
                    <tr>
                      <td>Rack B2</td>
                      <td>0.00</td>
                      <td>Unknown</td>
                    </tr>
                  </tbody>
                </table>
                {error && <div className="error-message">{error}</div>}
              </div>
            </div>
            <div className="load-table-card">
              <div className="load-table-header">
                <h3>AC Load Table</h3>
                <button className="load-button">Load Details</button>
              </div>
              <div className="load-table-content">
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
                      <td>0.00</td>
                      <td>Unknown</td>
                    </tr>
                    <tr>
                      <td>AC Unit 2</td>
                      <td>0.00</td>
                      <td>Unknown</td>
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
};

export default LiveDataTab;