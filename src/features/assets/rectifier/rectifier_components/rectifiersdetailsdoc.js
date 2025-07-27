const rectifiers = [
  {
    id: 'RECT-01',
    location: 'HQ Data Center',
    status: 'Normal',
    batterySetCount: 12,
    chartData: [
      {
        time: '10:00',
        L1_voltage: 230, L2_voltage: 231, L3_voltage: 229,
        L1_current: 10.1, L2_current: 9.9, L3_current: 10.3,
        dc_voltage: 54.6, dc_current: 12.2,
        battery_charging_current: 4.6,
        battery_voltage: 52.1, battery_current: 5.1,
        temperature: 36.2,
        brk1: 4.5, brk2: 3.2, brk3: 6.1
      },
      {
        time: '10:05',
        L1_voltage: 231, L2_voltage: 230, L3_voltage: 228,
        L1_current: 10.2, L2_current: 10.0, L3_current: 10.1,
        dc_voltage: 54.4, dc_current: 12.3,
        battery_charging_current: 4.7,
        battery_voltage: 52.3, battery_current: 5.2,
        temperature: 36.4,
        brk1: 4.7, brk2: 3.1, brk3: 6.0
      }
    ]
  },
  {
    id: 'RECT-02',
    location: 'HQ Data Center',
    status: 'Warning',
    issue: 'Low Voltage',
    batterySetCount: 10,
    chartData: [
      {
        time: '10:00',
        L1_voltage: 225, L2_voltage: 226, L3_voltage: 224,
        L1_current: 11.2, L2_current: 11.0, L3_current: 10.8,
        dc_voltage: 52.1, dc_current: 13.0,
        battery_charging_current: 5.0,
        battery_voltage: 50.5, battery_current: 5.6,
        temperature: 37.1,
        brk1: 5.1, brk2: 4.0, brk3: 6.3
      },
      {
        time: '10:05',
        L1_voltage: 224, L2_voltage: 225, L3_voltage: 223,
        L1_current: 11.0, L2_current: 10.9, L3_current: 10.7,
        dc_voltage: 52.3, dc_current: 12.8,
        battery_charging_current: 5.2,
        battery_voltage: 50.6, battery_current: 5.5,
        temperature: 37.3,
        brk1: 5.3, brk2: 4.2, brk3: 6.1
      }
    ]
  },
  {
    id: 'RECT-03',
    location: 'East Data Center',
    status: 'Normal',
    batterySetCount: 8,
    chartData: [
      {
        time: '10:00',
        L1_voltage: 229, L2_voltage: 230, L3_voltage: 229,
        L1_current: 9.8, L2_current: 9.6, L3_current: 10.0,
        dc_voltage: 54.8, dc_current: 11.9,
        battery_charging_current: 4.4,
        battery_voltage: 52.7, battery_current: 5.0,
        temperature: 35.9,
        brk1: 4.3, brk2: 3.4, brk3: 5.8
      },
      {
        time: '10:05',
        L1_voltage: 230, L2_voltage: 229, L3_voltage: 228,
        L1_current: 9.7, L2_current: 9.9, L3_current: 10.2,
        dc_voltage: 54.7, dc_current: 12.0,
        battery_charging_current: 4.5,
        battery_voltage: 52.6, battery_current: 5.1,
        temperature: 36.1,
        brk1: 4.4, brk2: 3.5, brk3: 5.9
      }
    ]
  },
  {
    id: 'RECT-04',
    location: 'North Data Center',
    status: 'Critical',
    issue: 'Overcurrent',
    batterySetCount: 14,
    chartData: [
      {
        time: '10:00',
        L1_voltage: 227, L2_voltage: 226, L3_voltage: 225,
        L1_current: 12.5, L2_current: 12.3, L3_current: 12.7,
        dc_voltage: 53.0, dc_current: 13.5,
        battery_charging_current: 5.8,
        battery_voltage: 51.2, battery_current: 6.0,
        temperature: 38.4,
        brk1: 6.1, brk2: 4.8, brk3: 6.9
      },
      {
        time: '10:05',
        L1_voltage: 226, L2_voltage: 227, L3_voltage: 226,
        L1_current: 12.6, L2_current: 12.4, L3_current: 12.8,
        dc_voltage: 52.9, dc_current: 13.6,
        battery_charging_current: 5.9,
        battery_voltage: 51.3, battery_current: 6.1,
        temperature: 38.6,
        brk1: 6.2, brk2: 4.9, brk3: 7.0
      }
    ]
  },
  {
    id: 'RECT-05',
    location: 'West Data Center',
    status: 'Normal',
    batterySetCount: 11,
    chartData: [
      {
        time: '10:00',
        L1_voltage: 231, L2_voltage: 232, L3_voltage: 230,
        L1_current: 10.0, L2_current: 9.9, L3_current: 9.8,
        dc_voltage: 54.9, dc_current: 11.8,
        battery_charging_current: 4.3,
        battery_voltage: 52.8, battery_current: 4.9,
        temperature: 35.7,
        brk1: 4.1, brk2: 3.0, brk3: 5.5
      },
      {
        time: '10:05',
        L1_voltage: 230, L2_voltage: 231, L3_voltage: 229,
        L1_current: 10.1, L2_current: 9.8, L3_current: 9.9,
        dc_voltage: 55.0, dc_current: 11.9,
        battery_charging_current: 4.2,
        battery_voltage: 52.9, battery_current: 5.0,
        temperature: 35.8,
        brk1: 4.2, brk2: 3.1, brk3: 5.6
      }
    ]
  }
];

export default rectifiers;
