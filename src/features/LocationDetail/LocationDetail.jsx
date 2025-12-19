import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Activity,
  CloudLightning,
  BarChart,
  Database,
  Calendar,
  Maximize2,
  FileText,
} from "lucide-react";
import "./LocationDetail.css";

// Import tab components
import LiveDataTab from "./components/LiveDataTab";
import TariffEmissionsTab from "./components/TariffEmissionsTab";
import OperationalMetricsTab from "./components/OperationalMetricsTab";

// Import utility functions
import { processApiData } from "./utils/dataProcessing";
import { exportYearlyReport } from "./utils/exportToExcel";

// Import data service
import DataService from "./locationDetailAPI";

// Import common components
import FullScreenModal from "./components/FullScreenModal";

const LocationDetail = () => {
  const { id } = useParams();

  // State Management
  const [activeTab, setActiveTab] = useState("LiveData");
  const [timeframeFilter, setTimeframeFilter] = useState("Live"); // Default to Live
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [locationData, setLocationData] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [fullscreenChart, setFullscreenChart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tab Definitions
  const tabs = [
    {
      id: "LiveData",
      label: "Live Data",
      icon: <Activity size={18} />,
    },
    {
      id: "Tariff&Emissions",
      label: "Tariff & Emissions",
      icon: <CloudLightning size={18} />,
    },
    {
      id: "OperationalMetrics",
      label: "Operational Metrics",
      icon: <BarChart size={18} />,
    },
  ];

  // Hardcoded Data & Mappings
  const generatorData = {
    "SLT-HQ": [
      { id: "Gen_HQb_1", status: "Online", statusColor: "#8AE98A" },
      { id: "Gen_HQb_2", status: "Standby", statusColor: "#5B7EC2" },
      { id: "Gen_HQb_3", status: "Online", statusColor: "#8AE98A" },
    ],
    "SLT-OTS": [
      { id: "Gen_OTS_1", status: "Online", statusColor: "#8AE98A" },
      { id: "Gen_OTS_2", status: "Standby", statusColor: "#5B7EC2" },
      { id: "Gen_OTS_3", status: "Warning", statusColor: "#EDA566" },
    ],
  };

  const locationNames = {
    "SLT-HQ": "HQ - Data Center 3F",
    "SLT-OTS": "OTS Facility",
  };

  const generatorStatusColors = {
    Online: "#8AE98A",
    Standby: "#5B7EC2",
    Warning: "#EDA566",
    Offline: "#FF6B6B",
  };

  // Data Fetching Logic
  useEffect(() => {
    const fetchData = async (isBackgroundRefresh = false) => {
      // Only show loading screen on initial load or when switching tabs
      if (!isBackgroundRefresh) {
        setIsLoading(true);
      }

      setError(null);

      try {
        // Basic location data
        const timeframeData = await DataService.fetchTimeframeData(
          timeframeFilter
        );

        //let chartData = {};
        let energyDistribution = [];
        let carbonAndTariff = {};

        // Fetch specific data based on active tab
        //if (activeTab === 'LiveData' || activeTab === 'OperationalMetrics') {
        // chartData = await DataService.fetchChartData(timeframeFilter);
        //}

        // Always fetch energy distribution
        try {
          const energyDistResponse = await DataService.fetchEnergyDistribution(
            timeframeFilter
          );
          energyDistribution = energyDistResponse.energyDistribution || [];
        } catch (distError) {
          console.error("Error fetching energy distribution:", distError);
          energyDistribution = [
            { name: "IT Load", value: 50 },
            { name: "AC Load", value: 30 },
            { name: "Other Systems", value: 20 },
          ];
        }

        // Fetch carbon and tariff data
        if (activeTab === "Tariff&Emissions" || activeTab === "LiveData") {
          carbonAndTariff = await DataService.fetchCarbonAndTariff(
            timeframeFilter
          );
        }

        const processedData = processApiData(timeframeData.data);

        setLocationData({
          name: locationNames[id] || "HQ - Data Center 3F",
          generators: generatorData[id] || generatorData["SLT-HQ"],
          ...processedData,
          charts: {
            ...processedData.charts,
            //...chartData,
            ...carbonAndTariff,
            energyDistribution: energyDistribution,
          },
        });
      } catch (err) {
        console.error(`Error fetching data:`, err);

        // Only show error prominently on initial load
        if (!isBackgroundRefresh) {
          setError(
            `Failed to fetch data. Please check your connection or try again later.`
          );
          // Fallback data structure
          setLocationData({
            name: locationNames[id] || "HQ - Data Center 3F",
            generators: generatorData[id] || generatorData["SLT-HQ"],
            metrics: {
              pue: "0.00",
              carbonEmission: "0.00 MT/Year",
              electricalCost: "0.00 LKR/Year",
              itLoad: "0.00 KW",
              acLoad: "0.00 KW",
              totalLoad: "0.00 KW",
            },
            charts: {
              pue: [],
              totalLoad: [],
              carbonEmission: [],
              electricityTariff: [],
              tariff: [],
              energyConsumption: [],
              energyDistribution: [],
            },
          });
        } else {
          // Silent error handling for background refresh
          console.warn("Background refresh failed - keeping existing data");
        }
      } finally {
        // Only turn off loading on initial load
        if (!isBackgroundRefresh) {
          setIsLoading(false);
        }
      }
    };

    // Initial fetch (with loading screen)
    fetchData(false);

    // Live data refresh interval
    let refreshInterval;
    if (timeframeFilter === "Live") {
      refreshInterval = setInterval(() => {
        // Background refresh (without loading screen)
        fetchData(true);
      }, 30000); // 30 seconds
    }

    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [id, timeframeFilter, activeTab]);

  // Event Handlers
  const toggleExpand = (section) =>
    setExpandedSection(expandedSection === section ? null : section);
  const handleFullscreenChart = (chartData) => setFullscreenChart(chartData);
  const closeFullscreenChart = () => setFullscreenChart(null);
  const handleDateChange = (date) => setCurrentDate(date);

  const handleYearlyExport = async () => {
    try {
      const response = await DataService.fetchYearlyDailyExport(locationData?.name);
      console.log("Yearly export response:", response);
      const dailyData = Array.isArray(response.data) ? response.data : [];

      if (dailyData.length === 0) {
        console.warn("No daily data available for export");
        return;
      }

      exportYearlyReport({
        locationName: locationData?.name || "Location",
        dailyData,
      });
    } catch (error) {
      console.error("Yearly export failed:", error);
    }
  };


  return (
    <div className="location-detail-container">
      <div className="location-detail-header">
        {/* Row 1: Title */}
        <h1 className="overview-title">
          <div className="overview-title-icon">
            <Database size={24} />
          </div>
          Location Overview
        </h1>

        {/* Row 2: Modern Navigation Tabs */}
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-button-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Row 3: Controls (Filter Left, Date/Screen Right) */}
        <div className="header-controls-row">
          <div className="left-controls">
            {/* CONDITIONAL: Hide filters if we are on Live Data tab */}
            {activeTab !== "LiveData" && (
              <div className="timeframe-filter">
                {["Live", "Hourly", "Monthly"].map((filter) => (
                  <span
                    key={filter}
                    className={timeframeFilter === filter ? "active" : ""}
                    onClick={() => setTimeframeFilter(filter)}
                  >
                    {filter}
                  </span>
                ))}
              </div>
            )}

            <button
              className="export-yearly-button"
              onClick={handleYearlyExport}
              title="Export Yearly Report"
            >
              <FileText size={16} />
              <span>Yearly Report</span>
            </button>
          </div>

          <div className="right-controls">
            <div className="date-picker">
              <Calendar size={16} />
              <input
                type="date"
                value={currentDate}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>
            <button className="fullscreen-button">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="location-detail-content">
        {/* CHANGE 3: Pass isLoading to all tab components */}
        {activeTab === "LiveData" && (
          <LiveDataTab
            locationData={locationData}
            expandedSection={expandedSection}
            toggleExpand={toggleExpand}
            generatorStatusColors={generatorStatusColors}
            error={error}
            timeframeFilter={timeframeFilter}
            loading={isLoading} // ADD THIS PROP
          />
        )}
        {activeTab === "Tariff&Emissions" && (
          <TariffEmissionsTab
            locationData={locationData}
            setFullscreenChart={handleFullscreenChart}
            timeframeFilter={timeframeFilter}
            loading={isLoading} // ADD THIS PROP
          />
        )}
        {activeTab === "OperationalMetrics" && (
          <OperationalMetricsTab
            locationData={locationData}
            expandedSection={expandedSection}
            toggleExpand={toggleExpand}
            setFullscreenChart={handleFullscreenChart}
            timeframeFilter={timeframeFilter}
            loading={isLoading} // ADD THIS PROP
          />
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}

      {fullscreenChart && (
        <FullScreenModal
          chartData={fullscreenChart}
          onClose={closeFullscreenChart}
        />
      )}
    </div>
  );
};

export default LocationDetail;
