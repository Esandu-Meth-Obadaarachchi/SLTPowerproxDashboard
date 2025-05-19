import { InfluxDB } from '@influxdata/influxdb-client';

// InfluxDB configuration
const INFLUXDB_URL = 'http://124.43.79.120:8086';
const INFLUXDB_TOKEN = '5foIlVThkUQK6wlKmtPaX_VBdRcdw44xTi5aqiO-97VZWyeG78rV7zMpT8L83ksWXWT7VjOZB1ZWWhdZ8D1mog==';
const INFLUXDB_ORG = 'SLT Power track';
const INFLUXDB_BUCKET = 'reactjs_test';

// Create InfluxDB client
const client = new InfluxDB({ 
  url: INFLUXDB_URL, 
  token: INFLUXDB_TOKEN 
});

// Function to fetch overall stats
export const fetchOverallStats = async () => {
  const queryApi = client.getQueryApi(INFLUXDB_ORG);
  
  const fluxQuery = `
    from(bucket:"${INFLUXDB_BUCKET}")
      |> range(start: -30d)
      |> filter(fn: (r) => r._measurement == "OverallStats")
      |> last()
      |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
  `;

  try {
    const result = await queryApi.collectRows(fluxQuery);
    
    // Return the last record
    if (result.length > 0) {
      return {
        numberOfGenerators: result[0]['Number of Generators'],
        numberOfLocations: result[0]['Number of Locations']
      };
    }
    
    // Fallback to default values if no data
    return {
      numberOfGenerators: '0',
      numberOfLocations: '0'
    };
  } catch (error) {
    console.error('Error fetching overall stats:', error);
    return {
      numberOfGenerators: '0',
      numberOfLocations: '0'
    };
  }
};