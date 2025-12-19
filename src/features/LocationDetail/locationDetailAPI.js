// utils/dataService.js

/**
 * Service to fetch data from the FastAPI backend
 */
class DataService {
  constructor() {
    // Update to port 8001 to match the FastAPI server port
    this.apiBaseUrl = "http://localhost:8001/energy";
  }

  /**
   * Fetch time series data based on timeframe
   * @param {string} timeframe - Live, Hourly, Daily, Weekly, Monthly, or Yearly
   */
  async fetchTimeframeData(timeframe) {
    const endpoints = {
      Live: "LiveData",
      Hourly: "HourlyData",
      Daily: "DailyData",
      Weekly: "Weekly",
      Monthly: "Monthly",
      Yearly: "Yearly",
    };

    try {
      const endpoint = endpoints[timeframe] || "LiveData";
      console.log(`Fetching data from: ${this.apiBaseUrl}/${endpoint}`);

      const response = await fetch(`${this.apiBaseUrl}/${endpoint}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${timeframe} data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`Received ${timeframe} data:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching ${timeframe} data:`, error);
      throw error;
    }
  }

  /**
   * Fetch chart-specific data (PUE, loads)
   * @param {string} timeframe - Live, Hourly, Daily, Weekly, Monthly, or Yearly
   * @param {string} location - Location measurement name
   */
  async fetchChartData(timeframe, location = "HQ-HQ-A-3-Data Center 3F") {
    try {
      const url = `${
        this.apiBaseUrl
      }/ChartData/${timeframe}?measurement=${encodeURIComponent(location)}`;
      console.log(`Fetching chart data from: ${url}`);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch chart data for ${timeframe}: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`Received chart data for ${timeframe}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching chart data:`, error);
      throw error;
    }
  }

  /**
   * Fetch carbon emission and tariff data
   * @param {string} timeframe - Live, Hourly, Daily, Weekly, Monthly, or Yearly
   * @param {string} location - Location measurement name
   */
  async fetchCarbonAndTariff(timeframe, location = "HQ-HQ-A-3-Data Center 3F") {
    try {
      const url = `${
        this.apiBaseUrl
      }/CarbonAndTariff/${timeframe}?measurement=${encodeURIComponent(
        location
      )}`;
      console.log(`Fetching carbon and tariff data from: ${url}`);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch carbon and tariff data for ${timeframe}: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`Received carbon and tariff data for ${timeframe}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching carbon and tariff data:`, error);
      throw error;
    }
  }

  /**
   * Fetch energy distribution data for pie charts
   * @param {string} timeframe - Live, Hourly, Daily, Weekly, Monthly, or Yearly
   * @param {string} location - Location measurement name
   */
  async fetchEnergyDistribution(
    timeframe,
    location = "HQ-HQ-A-3-Data Center 3F"
  ) {
    try {
      const url = `${
        this.apiBaseUrl
      }/EnergyDistribution/${timeframe}?measurement=${encodeURIComponent(
        location
      )}`;
      console.log(`Fetching energy distribution data from: ${url}`);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch energy distribution data for ${timeframe}: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`Received energy distribution data for ${timeframe}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching energy distribution data:`, error);
      throw error;
    }
  }

  /**
   * Check API health
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/health`);

      if (!response.ok) {
        throw new Error(
          `Health check failed: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API health check failed:", error);
      throw error;
    }
  }

  async fetchYearlyDailyExport(location = "HQ-HQ-A-3-Data Center 3F") {
    try {
      const url = `${
        this.apiBaseUrl
      }/YearlyDailyExport?measurement=${encodeURIComponent(location)}`;
      console.log(`Fetching yearly daily export data from: ${url}`);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch yearly daily export data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Received yearly daily export data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching yearly daily export data:", error);
      throw error;
    }
  }
}

export default new DataService();
