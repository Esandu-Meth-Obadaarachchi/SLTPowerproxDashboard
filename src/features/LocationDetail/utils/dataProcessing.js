// utils/dataProcessing.js

// ===================================
// CONFIGURATION
// ===================================
const CARBON_EMISSION_FACTOR = 0.25;
const TARIFF_RATE_LKR = 30;
const HOURS_PER_YEAR = 24 * 365;

// ===================================
// MAIN PROCESSING FUNCTION
// ===================================

/**
 * Processes API data and formats it for the UI.
 * Now accepts 'timeframe' to determine how to format X-axis labels.
 */
export const processApiData = (apiData, timeframe = 'Live') => {
  // 1. Extract Metrics
  const latestMetrics = calculateLatestMetricsFromApi(apiData);
  
  // 2. Format Charts (Pass timeframe down for correct date formatting)
  const pueChartData = formatChartData(apiData, 'pue', timeframe);
  const totalLoadChartData = formatChartData(apiData, 'Total_load', timeframe);
  
  // 3. Derived Charts
  const carbonEmissionData = generateDerivedData(totalLoadChartData, CARBON_EMISSION_FACTOR);
  const tariffData = generateDerivedData(totalLoadChartData, TARIFF_RATE_LKR);
  const energyConsumptionData = generateDerivedData(totalLoadChartData, 1); // 1:1 ratio for Load->Consumption in this view

  // 4. Energy Distribution
  const energyDistributionData = calculateEnergyDistribution(latestMetrics);
  
  // 5. Calculate Annual Totals
  const carbonEmissionTotal = latestMetrics.totalLoad * HOURS_PER_YEAR * CARBON_EMISSION_FACTOR;
  const electricalCostTotal = latestMetrics.totalLoad * HOURS_PER_YEAR * TARIFF_RATE_LKR;
  
  return {
    metrics: {
      pue: latestMetrics.pue.toFixed(2) || '0.00',
      carbonEmission: `${Math.round(carbonEmissionTotal)} MT/Year` || '0.00 MT/Year',
      electricalCost: `${new Intl.NumberFormat('en-US').format(Math.round(electricalCostTotal))} LKR/Year` || '0.00 LKR/Year',
      itLoad: `${latestMetrics.itLoad.toFixed(2)} KW` || '0.00 KW',
      acLoad: `${latestMetrics.acLoad.toFixed(2)} KW` || '0.00 KW',
      totalLoad: `${latestMetrics.totalLoad.toFixed(2)} KW` || '0.00 KW'
    },
    charts: {
      pue: pueChartData,
      totalLoad: totalLoadChartData,
      carbonEmission: carbonEmissionData,
      electricityTariff: tariffData,
      energyConsumption: energyConsumptionData,
      energyDistribution: energyDistributionData
    }
  };
};

// ===================================
// SMART FORMATTING LOGIC
// ===================================

const formatChartData = (data, field, timeframe) => {
  if (!data || data.length === 0) return [];
  
  return data
    .filter(entry => field in entry && entry[field] !== null)
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .map(entry => ({
      time: formatTimestampByTimeframe(entry.time, timeframe), // ✅ The Fix
      value: entry[field]
    }));
};

/**
 * Formats the X-Axis label based on the selected Timeframe
 */
const formatTimestampByTimeframe = (timestamp, timeframe) => {
  const date = new Date(timestamp);
  
  switch (timeframe) {
    case 'Live':
    case 'Hourly':
      // Show Time (e.g., "10:30 AM")
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });
      
    case 'Daily':
      // Show Time with Day if needed, or just 24h hour (e.g., "14:00")
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      });

    case 'Weekly':
      // Show Day Name (e.g., "Mon", "Tue")
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric'
      });

    case 'Monthly':
      // Show Date (e.g., "Jan 15")
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });

    case 'Yearly':
      // Show Month (e.g., "Jan", "Feb")
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit'
      });

    default:
      return date.toLocaleString();
  }
};

// ===================================
// HELPER CALCULATIONS
// ===================================

const generateDerivedData = (sourceData, factor) => 
  sourceData.map(item => ({ time: item.time, value: item.value * factor }));

const calculateEnergyDistribution = (metrics) => {
  if (!metrics || typeof metrics !== 'object') return getDefaultEnergyDistribution();
  const { itLoad = 0, acLoad = 0, totalLoad = 0 } = metrics;
  if (totalLoad <= 0) return getDefaultEnergyDistribution();
  
  const otherLoad = Math.max(0, totalLoad - (itLoad + acLoad));
  
  return [
    { name: 'IT Load', value: Math.max(0, itLoad) },
    { name: 'AC Load', value: Math.max(0, acLoad) },
    { name: 'Other Systems', value: otherLoad }
  ];
};

const getDefaultEnergyDistribution = () => [
  { name: 'IT Load', value: 0 },
  { name: 'AC Load', value: 0 },
  { name: 'Other Systems', value: 0 }
];

const calculateLatestMetricsFromApi = (data) => {
  const metrics = { pue: 0, itLoad: 0, acLoad: 0, totalLoad: 0 };
  if (!data || data.length === 0) return metrics;
  
  // Sort descending to get newest first
  const sorted = [...data].sort((a, b) => new Date(b.time) - new Date(a.time));
  
  for (const entry of sorted) {
    if ('pue' in entry && metrics.pue === 0) metrics.pue = entry.pue;
    if ('IT_load' in entry && metrics.itLoad === 0) metrics.itLoad = entry.IT_load;
    if ('AC_load' in entry && metrics.acLoad === 0) metrics.acLoad = entry.AC_load;
    if ('Total_load' in entry && metrics.totalLoad === 0) metrics.totalLoad = entry.Total_load;
  }
  return metrics;
};