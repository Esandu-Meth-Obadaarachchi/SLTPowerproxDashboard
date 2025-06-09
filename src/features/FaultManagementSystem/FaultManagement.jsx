import React, { useState, useEffect } from 'react';
import './FaultManagement.css';
import { faultData } from './FmsMockData';

// Import icons (you can use any icon library or create SVGs)
const ErrorIcon = () => <span className="icon error">⚠</span>;
const WarningIcon = () => <span className="icon warning">⚠</span>;
const InfoIcon = () => <span className="icon info">ℹ</span>;
const CheckCircleIcon = () => <span className="icon success">✓</span>;
const EngineeringIcon = () => <span className="icon">🔧</span>;
const AssignmentIcon = () => <span className="icon">📋</span>;
const SearchIcon = () => <span className="icon">🔍</span>;
const FilterIcon = () => <span className="icon">⚙</span>;
const NotificationIcon = () => <span className="icon">🔔</span>;
const LocationIcon = () => <span className="icon">📍</span>;
const DeviceIcon = () => <span className="icon">🖥</span>;
const TimeIcon = () => <span className="icon">⏰</span>;
const StarIcon = ({ filled }) => <span className={`icon star ${filled ? 'filled' : ''}`}>★</span>;

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case 'Critical':
      return <ErrorIcon />;
    case 'Major':
      return <WarningIcon />;
    case 'Minor':
      return <InfoIcon />;
    default:
      return <InfoIcon />;
  }
};

const FaultManagementSystem = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFault, setSelectedFault] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priority: 'all',
    assetType: 'all',
    location: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);

  const tabs = [
    { label: 'Pending Assignment', count: faultData.pendingAssignment.length },
    { label: 'Assigned', count: faultData.assigned.length },
    { label: 'Completed', count: faultData.completed.length },
    { label: 'Analytics', count: 0 }
  ];

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} filled={i < rating} />
    ));
  };

  const getFilteredFaults = (faults) => {
    return faults.filter(fault => {
      const matchesPriority = filters.priority === 'all' || fault.priority === filters.priority;
      const matchesAssetType = filters.assetType === 'all' || fault.assetType === filters.assetType;
      const matchesLocation = filters.location === 'all' || fault.location === filters.location;
      const matchesSearch = searchTerm === '' || 
        fault.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fault.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fault.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (fault.assignedTo && fault.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesPriority && matchesAssetType && matchesLocation && matchesSearch;
    });
  };

  const getCurrentFaults = () => {
    let faults;
    switch (activeTab) {
      case 0:
        faults = getFilteredFaults(faultData.pendingAssignment);
        break;
      case 1:
        faults = getFilteredFaults(faultData.assigned);
        break;
      case 2:
        faults = getFilteredFaults(faultData.completed);
        break;
      default:
        faults = [];
    }
    
    const startIndex = currentPage * itemsPerPage;
    return faults.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalCount = () => {
    switch (activeTab) {
      case 0:
        return getFilteredFaults(faultData.pendingAssignment).length;
      case 1:
        return getFilteredFaults(faultData.assigned).length;
      case 2:
        return getFilteredFaults(faultData.completed).length;
      default:
        return 0;
    }
  };

  const handleFaultClick = (fault) => {
    setSelectedFault(fault);
    setShowDetails(true);
  };

  const handleAssignFault = () => {
    if (selectedTechnician) {
      const techName = faultData.technicians.find(tech => tech.id === selectedTechnician)?.name || '';
      showNotification(`Fault ${selectedFault.id} assigned to ${techName}`);
      setShowAssignDialog(false);
      setShowDetails(false);
      setSelectedTechnician('');
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(0);
  };

  return (
    <div className="fault-management-page">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="floating-particle"></div>
        <div className="floating-particle"></div>
        <div className="floating-particle"></div>
      </div>

      {/* Header */}
      <header className="fault-header">
        <div className="header-content">
          <h1 className="main-title">Fault Management System</h1>
          <button 
            className="notification-btn"
            onClick={() => showNotification('Notifications enabled')}
          >
            <NotificationIcon />
            Enable Notifications
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="summary-section">
        <div className="summary-grid">
          <div className="summary-card total">
            <div className="card-content">
              <h3>Total Faults</h3>
              <div className="main-number">{faultData.summary.total}</div>
              <div className="sub-stats">
                <div className="stat critical">
                  <span>Critical</span>
                  <span>{faultData.summary.critical}</span>
                </div>
                <div className="stat major">
                  <span>Major</span>
                  <span>{faultData.summary.major}</span>
                </div>
                <div className="stat minor">
                  <span>Minor</span>
                  <span>{faultData.summary.minor}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="summary-card pending">
            <div className="card-content">
              <h3>Pending Assignment</h3>
              <div className="main-number">{faultData.summary.pending}</div>
              <button 
                className="card-btn"
                onClick={() => setActiveTab(0)}
              >
                View Pending
              </button>
            </div>
          </div>

          <div className="summary-card assigned">
            <div className="card-content">
              <h3>Assigned</h3>
              <div className="main-number">{faultData.summary.assigned}</div>
              <button 
                className="card-btn"
                onClick={() => setActiveTab(1)}
              >
                View Assigned
              </button>
            </div>
          </div>

          <div className="summary-card completed">
            <div className="card-content">
              <h3>Completed</h3>
              <div className="main-number">{faultData.summary.completed}</div>
              <button 
                className="card-btn"
                onClick={() => setActiveTab(2)}
              >
                View Completed
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-card">
          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`tab ${activeTab === index ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(index);
                    setCurrentPage(0);
                  }}
                >
                  {tab.label}
                  {tab.count > 0 && <span className="tab-badge">{tab.count}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          {activeTab < 3 && (
            <div className="controls-section">
              <div className="search-container">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search faults..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="search-input"
                />
              </div>
              
              <button 
                className="filter-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FilterIcon />
                Filters
              </button>
            </div>
          )}

          {/* Filter Panel */}
          {showFilters && activeTab < 3 && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Priority</label>
                <select 
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="Critical">Critical</option>
                  <option value="Major">Major</option>
                  <option value="Minor">Minor</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Asset Type</label>
                <select 
                  value={filters.assetType}
                  onChange={(e) => handleFilterChange('assetType', e.target.value)}
                >
                  <option value="all">All Asset Types</option>
                  <option value="Generator">Generator</option>
                  <option value="UPS">UPS</option>
                  <option value="AC Unit">AC Unit</option>
                  <option value="PDU">PDU</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Location</label>
                <select 
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option value="all">All Locations</option>
                  <option value="HQ Data Center">HQ Data Center</option>
                  <option value="East Region DC">East Region DC</option>
                  <option value="West Region DC">West Region DC</option>
                  <option value="North Region DC">North Region DC</option>
                </select>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="tab-content">
            {/* Fault Lists (Tabs 0-2) */}
            {activeTab < 3 && (
              <div className="faults-container">
                {getCurrentFaults().length > 0 ? (
                  getCurrentFaults().map((fault) => (
                    <div 
                      key={fault.id}
                      className={`fault-card ${fault.priority.toLowerCase()}`}
                      onClick={() => handleFaultClick(fault)}
                    >
                      <div className="fault-card-header">
                        <div className="fault-info">
                          <PriorityIcon priority={fault.priority} />
                          <div className="fault-title">
                            <h4>{fault.id}: {fault.description}</h4>
                            <p>{fault.assetType} ({fault.assetId}) - {fault.location}</p>
                          </div>
                        </div>
                        <div className="fault-status">
                          <span className={`status-chip ${fault.status.toLowerCase().replace(' ', '-')}`}>
                            {fault.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="fault-card-details">
                        {activeTab === 0 && (
                          <div className="fault-meta">
                            <span>Reported: {formatDateTime(fault.timestamp)}</span>
                          </div>
                        )}
                        
                        {activeTab === 1 && (
                          <div className="fault-meta">
                            <span>Assigned to: {fault.assignedTo}</span>
                            <span>Est. Completion: {formatDateTime(fault.estimatedCompletion)}</span>
                          </div>
                        )}
                        
                        {activeTab === 2 && (
                          <div className="fault-meta">
                            <span>Resolved by: {fault.assignedTo}</span>
                            <span>Completed: {formatDateTime(fault.completedTime)}</span>
                            <div className="rating">
                              {renderStars(fault.rating)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-data">
                    <p>No faults match your current filters</p>
                  </div>
                )}
                
                {/* Pagination */}
                {getTotalCount() > itemsPerPage && (
                  <div className="pagination">
                    <button 
                      disabled={currentPage === 0}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="pagination-btn"
                    >
                      Previous
                    </button>
                    <span className="pagination-info">
                      Page {currentPage + 1} of {Math.ceil(getTotalCount() / itemsPerPage)}
                    </span>
                    <button 
                      disabled={(currentPage + 1) * itemsPerPage >= getTotalCount()}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="pagination-btn"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 3 && (
              <div className="analytics-container">
                <div className="analytics-grid">
                  <div className="analytics-card">
                    <h3>Fault Trends</h3>
                    <div className="chart-placeholder">
                      <p>Fault trend chart would go here</p>
                    </div>
                  </div>
                  
                  <div className="analytics-card">
                    <h3>Priority Distribution</h3>
                    <div className="priority-stats">
                      <div className="priority-item critical">
                        <span>Critical</span>
                        <span>{faultData.summary.critical}</span>
                      </div>
                      <div className="priority-item major">
                        <span>Major</span>
                        <span>{faultData.summary.major}</span>
                      </div>
                      <div className="priority-item minor">
                        <span>Minor</span>
                        <span>{faultData.summary.minor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="analytics-card full-width">
                    <h3>Technician Status</h3>
                    <div className="technician-table">
                      <div className="table-header">
                        <span>Name</span>
                        <span>Specialization</span>
                        <span>Location</span>
                        <span>Status</span>
                        <span>Active Tickets</span>
                      </div>
                      {faultData.technicians.map((tech) => (
                        <div key={tech.id} className="table-row">
                          <span className="tech-name">
                            <div className="avatar">{tech.name.charAt(0)}</div>
                            {tech.name}
                          </span>
                          <span>{tech.specialization}</span>
                          <span>{tech.location}</span>
                          <span className={`availability ${tech.availability.toLowerCase()}`}>
                            {tech.availability}
                          </span>
                          <span>{tech.activeTickets}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Fault Details Modal */}
      {showDetails && selectedFault && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <PriorityIcon priority={selectedFault.priority} />
                Fault {selectedFault.id}
              </h2>
              <span className={`status-chip ${selectedFault.status.toLowerCase().replace(' ', '-')}`}>
                {selectedFault.status}
              </span>
            </div>
            
            <div className="modal-body">
              <div className="fault-description">
                <h3>{selectedFault.description}</h3>
              </div>
              
              <div className="fault-details-grid">
                <div className="detail-section">
                  <h4>Asset Information</h4>
                  <div className="detail-item">
                    <DeviceIcon />
                    <span>Asset Type: {selectedFault.assetType}</span>
                  </div>
                  <div className="detail-item">
                    <AssignmentIcon />
                    <span>Asset ID: {selectedFault.assetId}</span>
                  </div>
                  <div className="detail-item">
                    <LocationIcon />
                    <span>Location: {selectedFault.location}</span>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Fault Information</h4>
                  <div className="detail-item">
                    <PriorityIcon priority={selectedFault.priority} />
                    <span>Priority: {selectedFault.priority}</span>
                  </div>
                  <div className="detail-item">
                    <TimeIcon />
                    <span>Reported: {formatDateTime(selectedFault.timestamp)}</span>
                  </div>
                  {selectedFault.assignedTo && (
                    <div className="detail-item">
                      <EngineeringIcon />
                      <span>Assigned To: {selectedFault.assignedTo}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {activeTab === 2 && selectedFault.resolution && (
                <div className="resolution-section">
                  <h4>Resolution</h4>
                  <p>{selectedFault.resolution}</p>
                  <div className="resolution-details">
                    <span>Time to Complete: {formatDuration(selectedFault.timeToComplete)}</span>
                    <div className="rating">
                      Rating: {renderStars(selectedFault.rating)}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              {activeTab === 0 && (
                <button 
                  className="btn-primary"
                  onClick={() => setShowAssignDialog(true)}
                >
                  <EngineeringIcon />
                  Assign Technician
                </button>
              )}
              {activeTab === 1 && (
                <>
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      showNotification(`Reassigning fault ${selectedFault.id}`);
                      setShowDetails(false);
                    }}
                  >
                    Reassign
                  </button>
                  <button 
                    className="btn-success"
                    onClick={() => {
                      showNotification(`Marked fault ${selectedFault.id} as resolved`);
                      setShowDetails(false);
                    }}
                  >
                    Mark as Resolved
                  </button>
                </>
              )}
              <button className="btn-secondary" onClick={() => setShowDetails(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Technician Modal */}
      {showAssignDialog && (
        <div className="modal-overlay" onClick={() => setShowAssignDialog(false)}>
          <div className="modal-content small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Assign Technician</h2>
            </div>
            
            <div className="modal-body">
              <p>Select a technician for fault {selectedFault?.id}</p>
              
              <div className="form-group">
                <label>Technician</label>
                <select 
                  value={selectedTechnician}
                  onChange={(e) => setSelectedTechnician(e.target.value)}
                >
                  <option value="">Select Technician</option>
                  {faultData.technicians.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name} ({tech.specialization}) - {tech.availability}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Assignment Notes</label>
                <textarea 
                  rows="4"
                  placeholder="Add any special instructions..."
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => setShowAssignDialog(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleAssignFault}
                disabled={!selectedTechnician}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div className="notification">
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default FaultManagementSystem;