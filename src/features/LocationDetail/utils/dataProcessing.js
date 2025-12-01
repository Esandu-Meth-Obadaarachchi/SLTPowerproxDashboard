// ===================================
// CONSTANTS - Configuration Values
// ===================================

// Carbon emission factor (MT CO2 per kWh)
const CARBON_EMISSION_FACTOR = 0.25;

// Electricity tariff rate (LKR per kWh)
const TARIFF_RATE_LKR = 30;

// Hours in a year for annual calculations
const HOURS_PER_YEAR = 24 * 365;

// Maximum data points to render in charts (for performance)
const MAX_CHART_DATA_POINTS = 20;

// ===================================
// MAIN PROCESSING FUNCTION
// ===================================

export const processApiData = (apiData) => {
  // Extract latest metrics
  const latestMetrics = calculateLatestMetricsFromApi(apiData);
  
  // Format chart data with smart aggregation
  const pueChartData = formatChartData(apiData, 'pue');
  const totalLoadChartData = formatChartData(apiData, 'Total_load');
  const itLoadChartData = formatChartData(apiData, 'IT_load');
  const acLoadChartData = formatChartData(apiData, 'AC_load');
  
  // Calculate energy distribution based on latest values
  const energyDistributionData = calculateEnergyDistribution(latestMetrics);
  
  // Calculate carbon emissions (annual)
  const carbonEmission = latestMetrics.totalLoad * HOURS_PER_YEAR * CARBON_EMISSION_FACTOR;
  
  // Calculate electrical cost (annual)
  const electricalCost = latestMetrics.totalLoad * HOURS_PER_YEAR * TARIFF_RATE_LKR;
  
  return {
    metrics: {
      pue: latestMetrics.pue.toFixed(2) || '0.00',
      carbonEmission: `${Math.round(carbonEmission)} MT/Year` || '0.00 MT/Year',
      electricalCost: `${new Intl.NumberFormat('en-US').format(Math.round(electricalCost))} LKR/Year` || '0.00 LKR/Year',
      itLoad: `${latestMetrics.itLoad.toFixed(2)} KW` || '0.00 KW',
      acLoad: `${latestMetrics.acLoad.toFixed(2)} KW` || '0.00 KW',
      totalLoad: `${latestMetrics.totalLoad.toFixed(2)} KW` || '0.00 KW'
    },
    charts: {
      pue: pueChartData,
      totalLoad: totalLoadChartData,
      carbonEmission: generateCarbonEmissionData(totalLoadChartData),
      electricityTariff: generateTariffData(totalLoadChartData),
      energyConsumption: generateEnergyConsumptionData(totalLoadChartData),
      energyDistribution: energyDistributionData
    }
  };
};

// ===================================
// SMART CHART DATA FORMATTING
// ===================================

/**
 * Format chart data from API response with intelligent downsampling
 * @param {Array} data - Raw API data
 * @param {string} field - Field name to extract
 * @returns {Array} Formatted and optimally aggregated chart data
 */
const formatChartData = (data, field) => {
  if (!data || data.length === 0) {
    return [];
  }
  
  // Filter entries that contain the specified field
  const filteredData = data.filter(entry => field in entry && entry[field] !== null);
  
  if (filteredData.length === 0) {
    return [];
  }
  
  // Sort by time (oldest to newest)
  filteredData.sort((a, b) => new Date(a.time) - new Date(b.time));
  
  // Apply smart aggregation
  const aggregatedData = smartAggregate(filteredData, field);
  
  // Format data for charts
  return aggregatedData.map(entry => {
    // Format time to be more readable
    const time = formatTimestamp(entry.time);
    
    return {
      time,
      value: entry[field]
    };
  });
};

/**
 * Smart aggregation algorithm that downsamples data based on volume
 * @param {Array} data - Sorted array of data points
 * @param {string} field - Field name to aggregate
 * @returns {Array} Aggregated data points
 */
const smartAggregate = (data, field) => {
  const dataLength = data.length;
  
  // If data is already within target resolution, return as-is
  if (dataLength <= MAX_CHART_DATA_POINTS) {
    return data;
  }
  
  // Calculate bucket size for grouping
  const bucketSize = Math.ceil(dataLength / MAX_CHART_DATA_POINTS);
  
  const aggregatedData = [];
  
  // Group data into buckets and calculate averages
  for (let i = 0; i < dataLength; i += bucketSize) {
    const bucket = data.slice(i, i + bucketSize);
    
    // Calculate average value for this bucket
    const avgValue = bucket.reduce((sum, entry) => sum + entry[field], 0) / bucket.length;
    
    // Use the timestamp of the first item in the bucket
    const bucketTimestamp = bucket[0].time;
    
    // Create aggregated entry
    aggregatedData.push({
      time: bucketTimestamp,
      [field]: avgValue
    });
  }
  
  return aggregatedData;
};

/**
 * Format timestamp based on data density
 * @param {string} timestamp - ISO timestamp string
 * @returns {string} Formatted time string
 */
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  
  // For now, use hour:minute format
  // Could be enhanced to show date for larger ranges
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// ===================================
// ENERGY DISTRIBUTION CALCULATION
// ===================================

/**
 * Calculate energy distribution for pie chart with safe defaults
 * @param {Object} metrics - Latest metrics object
 * @returns {Array} Energy distribution data
 */
const calculateEnergyDistribution = (metrics) => {
  // Validate input and provide safe defaults
  if (!metrics || typeof metrics !== 'object') {
    return getDefaultEnergyDistribution();
  }
  
  const itLoad = typeof metrics.itLoad === 'number' ? metrics.itLoad : 0;
  const acLoad = typeof metrics.acLoad === 'number' ? metrics.acLoad : 0;
  const totalLoad = typeof metrics.totalLoad === 'number' ? metrics.totalLoad : 0;
  
  // If totalLoad is 0 or invalid, return default distribution
  if (totalLoad <= 0) {
    return getDefaultEnergyDistribution();
  }
  
  // Calculate other systems load (with safety check)
  const combinedLoad = itLoad + acLoad;
  const otherLoad = totalLoad > combinedLoad ? totalLoad - combinedLoad : 0;
  
  // Ensure no negative values
  return [
    { name: 'IT Load', value: Math.max(0, itLoad) },
    { name: 'AC Load', value: Math.max(0, acLoad) },
    { name: 'Other Systems', value: Math.max(0, otherLoad) }
  ];
};

/**
 * Returns default energy distribution when data is unavailable
 * @returns {Array} Default distribution data
 */
const getDefaultEnergyDistribution = () => {
  return [
    { name: 'IT Load', value: 0 },
    { name: 'AC Load', value: 0 },
    { name: 'Other Systems', value: 0 }
  ];
};

// ===================================
// DERIVED DATA GENERATION
// ===================================

/**
 * Generate carbon emission data based on total load
 * @param {Array} totalLoadData - Total load chart data
 * @returns {Array} Carbon emission data
 */
const generateCarbonEmissionData = (totalLoadData) => {
  if (!totalLoadData || totalLoadData.length === 0) {
    return [];
  }
  
  return totalLoadData.map(item => ({
    time: item.time,
    value: item.value * CARBON_EMISSION_FACTOR
  }));
};

/**
 * Generate tariff data based on total load
 * @param {Array} totalLoadData - Total load chart data
 * @returns {Array} Tariff data
 */
const generateTariffData = (totalLoadData) => {
  if (!totalLoadData || totalLoadData.length === 0) {
    return [];
  }
  
  return totalLoadData.map(item => ({
    time: item.time,
    value: item.value * TARIFF_RATE_LKR
  }));
};

/**
 * Generate energy consumption data based on total load
 * @param {Array} totalLoadData - Total load chart data
 * @returns {Array} Energy consumption data
 */
const generateEnergyConsumptionData = (totalLoadData) => {
  if (!totalLoadData || totalLoadData.length === 0) {
    return [];
  }
  
  return totalLoadData.map(item => ({
    time: item.time,
    value: item.value * 1 // Using KW value directly
  }));
};

// ===================================
// METRICS EXTRACTION
// ===================================

/**
 * Calculate the latest metrics from the API data
 * @param {Array} data - Raw API data
 * @returns {Object} Latest metrics with safe defaults
 */
const calculateLatestMetricsFromApi = (data) => {
  // Default values
  const metrics = {
    pue: 0,
    itLoad: 0,
    acLoad: 0,
    totalLoad: 0
  };
  
  if (!data || data.length === 0) {
    return metrics;
  }
  
  // Sort data by time (newest first)
  data.sort((a, b) => new Date(b.time) - new Date(a.time));
  
  // Find the latest entries for each metric
  for (const entry of data) {
    if ('pue' in entry && metrics.pue === 0) {
      metrics.pue = entry.pue;
    }
    if ('IT_load' in entry && metrics.itLoad === 0) {
      metrics.itLoad = entry.IT_load;
    }
    if ('AC_load' in entry && metrics.acLoad === 0) {
      metrics.acLoad = entry.AC_load;
    }
    if ('Total_load' in entry && metrics.totalLoad === 0) {
      metrics.totalLoad = entry.Total_load;
    }
    
    // Break once we've found all metrics
    if (metrics.pue !== 0 && metrics.itLoad !== 0 && metrics.acLoad !== 0 && metrics.totalLoad !== 0) {
      break;
    }
  }
  
  return metrics;
};