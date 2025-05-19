export const processApiData = (apiData) => {
    // Extract latest metrics
    const latestMetrics = calculateLatestMetricsFromApi(apiData);
    // Format chart data for PUE
    const pueChartData = formatChartData(apiData, 'pue');
    // Format chart data for Total Load
    const totalLoadChartData = formatChartData(apiData, 'Total_load');
    // Format chart data for IT Load
    const itLoadChartData = formatChartData(apiData, 'IT_load');
    // Format chart data for AC Load
    const acLoadChartData = formatChartData(apiData, 'AC_load');
    
    // Calculate energy distribution based on latest values
    const energyDistributionData = calculateEnergyDistribution(latestMetrics);
    
    // Calculate carbon emissions (simplified calculation)
    const carbonEmission = latestMetrics.totalLoad * 24 * 365 * 0.25;
    // Calculate electrical cost (simplified calculation)
    const electricalCost = latestMetrics.totalLoad * 24 * 365 * 30;
    
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

  // Format chart data from API response
  const formatChartData = (data, field) => {
    if (!data || data.length === 0) {
      return [];
    }
    
    // Filter entries that contain the specified field
    const filteredData = data.filter(entry => field in entry);
    
    // Sort by time
    filteredData.sort((a, b) => new Date(a.time) - new Date(b.time));
    
    // Take the last 15 entries for better visualization
    const recentData = filteredData.slice(-15);
    
    // Format data for charts
    return recentData.map(entry => {
      // Format time to be more readable
      const time = new Date(entry.time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      return {
        time,
        value: entry[field]
      };
    });
  };
  // /////////////////////////////////////////////////////////////////////
  // Calculate energy distribution for pie chart
  const calculateEnergyDistribution = (metrics) => {
    const itPercentage = metrics.itLoad;
    const acPercentage = metrics.acLoad;
    const otherPercentage = metrics.totalLoad - (metrics.itLoad + metrics.acLoad);
    
    return [
      { name: 'IT Load', value: Math.max(0, itPercentage) },
      { name: 'AC Load', value: Math.max(0, acPercentage) },
      { name: 'Other Systems', value: Math.max(0, otherPercentage) }
    ];
  };
  // /////////////////////////////////////////////////////////////////////
  // Generate carbon emission data based on total load
  const generateCarbonEmissionData = (totalLoadData) => {
    if (!totalLoadData || totalLoadData.length === 0) {
      return [];
    }
    
    return totalLoadData.map(item => ({
      time: item.time,
      value: item.value * 0.25 // Simple conversion factor
    }));
  };
  // /////////////////////////////////////////////////////////////////////
  // Generate tariff data based on total load
  const generateTariffData = (totalLoadData) => {
    if (!totalLoadData || totalLoadData.length === 0) {
      return [];
    }
    
    return totalLoadData.map(item => ({
      time: item.time,
      value: item.value * 30 // Simple conversion factor for tariff
    }));
  };
  // /////////////////////////////////////////////////////////////////////
  // Generate energy consumption data based on total load
  const generateEnergyConsumptionData = (totalLoadData) => {
    if (!totalLoadData || totalLoadData.length === 0) {
      return [];
    }
    
    return totalLoadData.map(item => ({
      time: item.time,
      value: item.value * 1 // Just using the KW value directly for now
    }));
  };
  // Calculate the latest metrics from the API data
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
  