import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Activity, Clock, MapPin, ArrowLeft } from 'lucide-react';
import '../TemparatureMonitoring/temperatureMonitoring.css';

const TemperatureMonitoring = () => {
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedGenerator, setSelectedGenerator] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    // Generator data with status
    const generatorData = [
        {
            location: "SLT HQ Headquarters Building - Main Power Center",
            generators: [
                { name: "GenHQb_1", status: "running", model: "CAT 3516C", capacity: "2000 kW" },
                { name: "GenHQb_2", status: "standby", model: "CAT 3516C", capacity: "2000 kW" },
                { name: "GenHQb_3", status: "running", model: "CAT 3516C", capacity: "2000 kW" }
            ]
        },
        {
            location: "SLT OTS Off-site Technical Station - Backup Power",
            generators: [
                { name: "GenOTS_1", status: "running", model: "Cummins QSK60", capacity: "1800 kW" },
                { name: "GenOTS_2", status: "running", model: "Cummins QSK60", capacity: "1800 kW" },
                { name: "GenOTS_3", status: "offline", model: "Cummins QSK60", capacity: "1800 kW" }
            ]
        },
        {
            location: "SLT WELIKADA A - Welikada A Power Distribution Station",
            generators: [
                { name: "GenWA_1", status: "standby", model: "Perkins 4016", capacity: "1500 kW" },
                { name: "GenWA_2", status: "running", model: "Perkins 4016", capacity: "1500 kW" },
                { name: "GenWA_3", status: "offline", model: "Perkins 4016", capacity: "1500 kW" }
            ]
        },
        {
            location: "SLT WELIKADA B - Welikada B Power Distribution Station",
            generators: [
                { name: "GenWB_1", status: "running", model: "Perkins 4016", capacity: "1500 kW" },
                { name: "GenWB_2", status: "standby", model: "Perkins 4016", capacity: "1500 kW" },
                { name: "GenWB_3", status: "running", model: "Perkins 4016", capacity: "1500 kW" }
            ]
        },
        {
            location: "SLT Thalawathugoda RSU - Thalawathugoda Remote Service Unit",
            generators: [
                { name: "GenTR_1", status: "offline", model: "Volvo TWD1643GE", capacity: "1600 kW" },
                { name: "GenTR_2", status: "standby", model: "Volvo TWD1643GE", capacity: "1600 kW" },
                { name: "GenTR_3", status: "running", model: "Volvo TWD1643GE", capacity: "1600 kW" }
            ]
        },
        {
            location: "SLT MATTAKKULIYA TELESHOP - Mattakkuliya Teleshop Backup Station",
            generators: [
                { name: "GenMT_1", status: "running", model: "Volvo TWD1643GE", capacity: "1600 kW" },
                { name: "GenMT_2", status: "running", model: "Volvo TWD1643GE", capacity: "1600 kW" },
                { name: "GenMT_3", status: "standby", model: "Volvo TWD1643GE", capacity: "1600 kW" }
            ]
        }
    ];

    // Generate realistic temperature and humidity data for the past week
    const generateWeeklyData = (baseTemp, baseHumidity, status) => {
        const data = [];
        const now = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            
            // Generate 4 data points per day (every 6 hours)
            for (let hour = 0; hour < 24; hour += 6) {
                const timestamp = new Date(date);
                timestamp.setHours(hour, 0, 0, 0);
                
                // Simulate realistic variations based on status
                let tempVariation = 0;
                let humidityVariation = 0;
                
                if (status === 'running') {
                    tempVariation = Math.sin(hour * Math.PI / 12) * 5 + (Math.random() - 0.5) * 8;
                    humidityVariation = Math.cos(hour * Math.PI / 12) * 3 + (Math.random() - 0.5) * 5;
                } else if (status === 'standby') {
                    tempVariation = (Math.random() - 0.5) * 3;
                    humidityVariation = (Math.random() - 0.5) * 2;
                } else {
                    tempVariation = (Math.random() - 0.5) * 2;
                    humidityVariation = (Math.random() - 0.5) * 1;
                }
                
                data.push({
                    time: timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + 
                          ' ' + timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    temperature: Math.round((baseTemp + tempVariation) * 10) / 10,
                    humidity: Math.round((baseHumidity + humidityVariation) * 10) / 10,
                    timestamp: timestamp.getTime()
                });
            }
        }
        
        return data.sort((a, b) => a.timestamp - b.timestamp);
    };

    // Current readings based on generator status
    const getCurrentReadings = (status) => {
        const baseTemp = status === 'running' ? 75 : status === 'standby' ? 45 : 25;
        const baseHumidity = status === 'running' ? 35 : status === 'standby' ? 50 : 65;
        
        const tempVariation = status === 'running' ? (Math.random() - 0.5) * 10 : (Math.random() - 0.5) * 3;
        const humidityVariation = status === 'running' ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 5;
        
        return {
            temperature: Math.round((baseTemp + tempVariation) * 10) / 10,
            humidity: Math.round((baseHumidity + humidityVariation) * 10) / 10
        };
    };

    // Filter generators based on selected status
    const getFilteredLocations = () => {
        if (filterStatus === 'all') {
            return generatorData;
        }
        
        return generatorData.map(location => ({
            ...location,
            generators: location.generators.filter(gen => gen.status === filterStatus)
        })).filter(location => location.generators.length > 0);
    };

    const getStatusCounts = () => {
        const allGenerators = generatorData.flatMap(location => location.generators);
        return {
            running: allGenerators.filter(gen => gen.status === 'running').length,
            standby: allGenerators.filter(gen => gen.status === 'standby').length,
            offline: allGenerators.filter(gen => gen.status === 'offline').length,
            total: allGenerators.length
        };
    };

    // Handle generator click
    const handleGeneratorClick = (generator, location) => {
        const generatorWithLocation = {
            ...generator,
            location: location
        };
        setSelectedGenerator(generatorWithLocation);
    };

    // Handle back to list
    const handleBackToList = () => {
        setSelectedGenerator(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'running': return '#4caf50';
            case 'standby': return '#ffc107';
            case 'offline': return '#f44336';
            default: return '#ffffff';
        }
    };

    const getTemperatureStatus = (temp) => {
        if (temp > 80) return { status: 'High', color: '#f44336' };
        if (temp > 60) return { status: 'Normal', color: '#4caf50' };
        return { status: 'Low', color: '#4fc3f7' };
    };

    const getHumidityStatus = (humidity) => {
        if (humidity > 70) return { status: 'High', color: '#f44336' };
        if (humidity > 30) return { status: 'Normal', color: '#4caf50' };
        return { status: 'Low', color: '#ffc107' };
    };

    const statusCounts = getStatusCounts();
    const filteredLocations = getFilteredLocations();

    // If a generator is selected, show the detail page
    if (selectedGenerator) {
        const currentReadings = getCurrentReadings(selectedGenerator.status);
        const weeklyData = generateWeeklyData(currentReadings.temperature, currentReadings.humidity, selectedGenerator.status);
        const tempStatus = getTemperatureStatus(currentReadings.temperature);
        const humidityStatus = getHumidityStatus(currentReadings.humidity);

        return (
            <div className="container">
                {/* Back Button */}
                <div className="back-button-section">
                    <button className="back-button" onClick={handleBackToList}>
                        <ArrowLeft size={20} />
                        Back to Generator List
                    </button>
                </div>

                {/* Header */}
                <div className="top-header">
                    <h1 className="heading">Generator Monitoring</h1>
                    <p className="description">Real-time temperature and humidity monitoring</p>
                </div>

                {/* Generator Info Card */}
                <div className="location-info generator-detail-card">
                    <div className="generator-header">
                        <Activity size={28} color={getStatusColor(selectedGenerator.status)} />
                        <div className="generator-title-section">
                            <h2 className="generator-name">{selectedGenerator.name}</h2>
                            <div 
                                className="status-badge"
                                style={{
                                    background: `${getStatusColor(selectedGenerator.status)}20`,
                                    border: `1px solid ${getStatusColor(selectedGenerator.status)}`,
                                    color: getStatusColor(selectedGenerator.status)
                                }}
                            >
                                {selectedGenerator.status}
                            </div>
                        </div>
                    </div>
                    
                    <div className="location-details">
                        <MapPin size={16} color="#b0bec5" />
                        <span className="location-text">{selectedGenerator.location}</span>
                    </div>
                    
                    <div className="specs-section">
                        <div className="spec-item">
                            <span className="spec-label">Model: </span>
                            <span className="spec-value">{selectedGenerator.model}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Capacity: </span>
                            <span className="spec-value">{selectedGenerator.capacity}</span>
                        </div>
                    </div>
                </div>

                {/* Current Readings */}
                <div className="readings-grid">
                    {/* Temperature Card */}
                    <div className="reading-card">
                        <div className="reading-icon">
                            <Thermometer size={48} color={tempStatus.color} />
                        </div>
                        <h3 className="reading-title">Current Temperature</h3>
                        <div 
                            className="reading-value"
                            style={{ color: tempStatus.color }}
                        >
                            {currentReadings.temperature}°C
                        </div>
                        <div 
                            className="reading-status"
                            style={{
                                background: `${tempStatus.color}20`,
                                border: `1px solid ${tempStatus.color}`,
                                color: tempStatus.color
                            }}
                        >
                            {tempStatus.status}
                        </div>
                        <div className="last-updated">
                            <Clock size={14} />
                            Last updated: {currentTime.toLocaleTimeString()}
                        </div>
                    </div>

                    {/* Humidity Card */}
                    <div className="reading-card">
                        <div className="reading-icon">
                            <Droplets size={48} color={humidityStatus.color} />
                        </div>
                        <h3 className="reading-title">Current Humidity</h3>
                        <div 
                            className="reading-value"
                            style={{ color: humidityStatus.color }}
                        >
                            {currentReadings.humidity}%
                        </div>
                        <div 
                            className="reading-status"
                            style={{
                                background: `${humidityStatus.color}20`,
                                border: `1px solid ${humidityStatus.color}`,
                                color: humidityStatus.color
                            }}
                        >
                            {humidityStatus.status}
                        </div>
                        <div className="last-updated">
                            <Clock size={14} />
                            Last updated: {currentTime.toLocaleTimeString()}
                        </div>
                    </div>
                </div>

                {/* Weekly Temperature Chart */}
                <div className="chart-card">
                    <h3 className="chart-title">
                        <Thermometer size={24} />
                        Weekly Temperature Trend
                    </h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                                <XAxis 
                                    dataKey="time" 
                                    stroke="#b0bec5"
                                    fontSize={12}
                                    interval="preserveStartEnd"
                                />
                                <YAxis 
                                    stroke="#b0bec5"
                                    fontSize={12}
                                    label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#b0bec5' } }}
                                />
                                <Tooltip 
                                    contentStyle={{
                                        background: 'rgba(26, 35, 50, 0.95)',
                                        border: '1px solid rgba(79, 195, 247, 0.3)',
                                        borderRadius: '8px',
                                        color: '#ffffff'
                                    }}
                                    formatter={(value, name) => [
                                        `${value}°C`,
                                        name === 'temperature' ? 'Temperature' : name
                                    ]}
                                />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="temperature" 
                                    stroke="#ff6b6b" 
                                    strokeWidth={3}
                                    dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: '#ff6b6b', strokeWidth: 2, fill: '#ffffff' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Weekly Humidity Chart */}
                <div className="chart-card">
                    <h3 className="chart-title">
                        <Droplets size={24} />
                        Weekly Humidity Trend
                    </h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                                <XAxis 
                                    dataKey="time" 
                                    stroke="#b0bec5"
                                    fontSize={12}
                                    interval="preserveStartEnd"
                                />
                                <YAxis 
                                    stroke="#b0bec5"
                                    fontSize={12}
                                    label={{ value: 'Humidity (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#b0bec5' } }}
                                />
                                <Tooltip 
                                    contentStyle={{
                                        background: 'rgba(26, 35, 50, 0.95)',
                                        border: '1px solid rgba(79, 195, 247, 0.3)',
                                        borderRadius: '8px',
                                        color: '#ffffff'
                                    }}
                                    formatter={(value, name) => [
                                        `${value}%`,
                                        name === 'humidity' ? 'Humidity' : name
                                    ]}
                                />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="humidity" 
                                    stroke="#4fc3f7" 
                                    strokeWidth={3}
                                    dot={{ fill: '#4fc3f7', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: '#4fc3f7', strokeWidth: 2, fill: '#ffffff' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="stats-card">
                    <h3 className="stats-title">Weekly Summary</h3>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-value" style={{ color: '#ff6b6b' }}>
                                {Math.max(...weeklyData.map(d => d.temperature)).toFixed(1)}°C
                            </div>
                            <div className="stat-label">Max Temperature</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value" style={{ color: '#4fc3f7' }}>
                                {Math.min(...weeklyData.map(d => d.temperature)).toFixed(1)}°C
                            </div>
                            <div className="stat-label">Min Temperature</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value" style={{ color: '#4fc3f7' }}>
                                {Math.max(...weeklyData.map(d => d.humidity)).toFixed(1)}%
                            </div>
                            <div className="stat-label">Max Humidity</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value" style={{ color: '#4fc3f7' }}>
                                {Math.min(...weeklyData.map(d => d.humidity)).toFixed(1)}%
                            </div>
                            <div className="stat-label">Min Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show the main generator list
    return (
        <div className="container">
            <div className="top-header">
                <h1 className="heading">Temperature Monitoring</h1>
                <p className="description">Monitor the temperature and humidity of generators - Click on any generator for detailed view</p>
            </div>

            {/* Filter Section */}
            <div className="filter-section">
                <div className="filter-controls">
                    <button 
                        className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('all')}
                    >
                        All ({statusCounts.total})
                    </button>
                    <button 
                        className={`filter-btn running ${filterStatus === 'running' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('running')}
                    >
                        Running ({statusCounts.running})
                    </button>
                    <button 
                        className={`filter-btn standby ${filterStatus === 'standby' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('standby')}
                    >
                        Standby ({statusCounts.standby})
                    </button>
                    <button 
                        className={`filter-btn offline ${filterStatus === 'offline' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('offline')}
                    >
                        Offline ({statusCounts.offline})
                    </button>
                </div>
            </div>

            {/* Location Cards */}
            {filteredLocations.map((locationData, index) => (
                <div key={index} className="location-info">
                    <h2>{locationData.location}</h2>
                    <div className="generator-info">
                        {locationData.generators.map((generator, genIndex) => (
                            <div 
                                key={genIndex} 
                                className={`generator-item ${generator.status} clickable`}
                                onClick={() => handleGeneratorClick(generator, locationData.location)}
                            >
                                <span className="generator-name">{generator.name}</span>
                                <span className="status-text">{generator.status}</span>
                                <div className="click-hint">Click for details →</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TemperatureMonitoring;