// Mock data for Energy Track graphs
export const powerData = {
  live: {
    consumption: [
      { time: '00:00', hq: 245, east: 189, west: 167, north: 201 },
      { time: '04:00', hq: 198, east: 145, west: 134, north: 156 },
      { time: '08:00', hq: 312, east: 267, west: 234, north: 289 },
      { time: '12:00', hq: 356, east: 298, west: 276, north: 321 },
      { time: '16:00', hq: 389, east: 334, west: 301, north: 345 },
      { time: '20:00', hq: 298, east: 245, west: 223, north: 267 }
    ],
    byLocation: [
      { time: '00:00', hq: 245, east: 189, west: 167, north: 201 },
      { time: '04:00', hq: 198, east: 145, west: 134, north: 156 },
      { time: '08:00', hq: 312, east: 267, west: 234, north: 289 },
      { time: '12:00', hq: 356, east: 298, west: 276, north: 321 },
      { time: '16:00', hq: 389, east: 334, west: 301, north: 345 },
      { time: '20:00', hq: 298, east: 245, west: 223, north: 267 }
    ],
    byAssetType: [
      { time: '00:00', hq: 145, east: 123, west: 98, north: 134 },
      { time: '04:00', hq: 112, east: 89, west: 76, north: 98 },
      { time: '08:00', hq: 234, east: 198, west: 167, north: 201 },
      { time: '12:00', hq: 267, east: 234, west: 201, north: 245 },
      { time: '16:00', hq: 289, east: 256, west: 223, north: 267 },
      { time: '20:00', hq: 201, east: 178, west: 145, north: 189 }
    ]
  },
  day: {
    consumption: [
      { time: 'Mon', hq: 2456, east: 2134, west: 1987, north: 2298 },
      { time: 'Tue', hq: 2389, east: 2067, west: 1923, north: 2201 },
      { time: 'Wed', hq: 2512, east: 2198, west: 2034, north: 2389 },
      { time: 'Thu', hq: 2634, east: 2298, west: 2145, north: 2456 },
      { time: 'Fri', hq: 2798, east: 2434, west: 2267, north: 2578 },
      { time: 'Sat', hq: 2298, east: 2001, west: 1876, north: 2134 },
      { time: 'Sun', hq: 2145, east: 1876, west: 1734, north: 1987 }
    ],
    byLocation: [
      { time: 'Mon', hq: 2456, east: 2134, west: 1987, north: 2298 },
      { time: 'Tue', hq: 2389, east: 2067, west: 1923, north: 2201 },
      { time: 'Wed', hq: 2512, east: 2198, west: 2034, north: 2389 },
      { time: 'Thu', hq: 2634, east: 2298, west: 2145, north: 2456 },
      { time: 'Fri', hq: 2798, east: 2434, west: 2267, north: 2578 },
      { time: 'Sat', hq: 2298, east: 2001, west: 1876, north: 2134 },
      { time: 'Sun', hq: 2145, east: 1876, west: 1734, north: 1987 }
    ],
    byAssetType: [
      { time: 'Mon', hq: 1876, east: 1634, west: 1456, north: 1723 },
      { time: 'Tue', hq: 1823, east: 1578, west: 1398, north: 1667 },
      { time: 'Wed', hq: 1923, east: 1687, west: 1523, north: 1789 },
      { time: 'Thu', hq: 2001, east: 1756, west: 1598, north: 1834 },
      { time: 'Fri', hq: 2134, east: 1876, west: 1723, north: 1945 },
      { time: 'Sat', hq: 1756, east: 1523, west: 1398, north: 1612 },
      { time: 'Sun', hq: 1634, east: 1423, west: 1298, north: 1489 }
    ]
  },
  week: {
    consumption: [
      { time: 'Week 1', hq: 16234, east: 14567, west: 13456, north: 15123 },
      { time: 'Week 2', hq: 17456, east: 15234, west: 14123, north: 16345 },
      { time: 'Week 3', hq: 18123, east: 15876, west: 14789, north: 16987 },
      { time: 'Week 4', hq: 17789, east: 15567, west: 14456, north: 16654 }
    ],
    byLocation: [
      { time: 'Week 1', hq: 16234, east: 14567, west: 13456, north: 15123 },
      { time: 'Week 2', hq: 17456, east: 15234, west: 14123, north: 16345 },
      { time: 'Week 3', hq: 18123, east: 15876, west: 14789, north: 16987 },
      { time: 'Week 4', hq: 17789, east: 15567, west: 14456, north: 16654 }
    ],
    byAssetType: [
      { time: 'Week 1', hq: 12345, east: 11234, west: 10123, north: 11456 },
      { time: 'Week 2', hq: 13234, east: 12123, west: 11045, north: 12267 },
      { time: 'Week 3', hq: 13756, east: 12567, west: 11345, north: 12678 },
      { time: 'Week 4', hq: 13456, east: 12345, west: 11123, north: 12456 }
    ]
  },
  month: {
    consumption: [
      { time: 'Jan', hq: 67234, east: 58456, west: 52123, north: 61345 },
      { time: 'Feb', hq: 64123, east: 55678, west: 49876, north: 58234 },
      { time: 'Mar', hq: 71456, east: 62345, west: 56789, north: 65123 },
      { time: 'Apr', hq: 68789, east: 59876, west: 54321, north: 62678 },
      { time: 'May', hq: 73234, east: 64567, west: 58123, north: 66789 },
      { time: 'Jun', hq: 75678, east: 66234, west: 59876, north: 68345 }
    ],
    byLocation: [
      { time: 'Jan', hq: 67234, east: 58456, west: 52123, north: 61345 },
      { time: 'Feb', hq: 64123, east: 55678, west: 49876, north: 58234 },
      { time: 'Mar', hq: 71456, east: 62345, west: 56789, north: 65123 },
      { time: 'Apr', hq: 68789, east: 59876, west: 54321, north: 62678 },
      { time: 'May', hq: 73234, east: 64567, west: 58123, north: 66789 },
      { time: 'Jun', hq: 75678, east: 66234, west: 59876, north: 68345 }
    ],
    byAssetType: [
      { time: 'Jan', hq: 51234, east: 44567, west: 39123, north: 46234 },
      { time: 'Feb', hq: 48876, east: 42345, west: 37456, north: 43789 },
      { time: 'Mar', hq: 54567, east: 47234, west: 42789, north: 49123 },
      { time: 'Apr', hq: 52345, east: 45678, west: 40456, north: 47567 },
      { time: 'May', hq: 55789, east: 48456, west: 43234, north: 50345 },
      { time: 'Jun', hq: 57234, east: 49789, west: 44567, north: 51678 }
    ]
  },
  year: {
    consumption: [
      { time: '2020', hq: 756234, east: 678456, west: 612345, north: 698765 },
      { time: '2021', hq: 789456, east: 701234, west: 645678, north: 723456 },
      { time: '2022', hq: 823567, east: 734567, west: 678234, north: 756789 },
      { time: '2023', hq: 856789, east: 767234, west: 701456, north: 789123 },
      { time: '2024', hq: 891234, east: 798567, west: 734789, north: 823456 }
    ],
    byLocation: [
      { time: '2020', hq: 756234, east: 678456, west: 612345, north: 698765 },
      { time: '2021', hq: 789456, east: 701234, west: 645678, north: 723456 },
      { time: '2022', hq: 823567, east: 734567, west: 678234, north: 756789 },
      { time: '2023', hq: 856789, east: 767234, west: 701456, north: 789123 },
      { time: '2024', hq: 891234, east: 798567, west: 734789, north: 823456 }
    ],
    byAssetType: [
      { time: '2020', hq: 567234, east: 512456, west: 459123, north: 523789 },
      { time: '2021', hq: 592345, east: 534567, west: 481234, north: 547123 },
      { time: '2022', hq: 617456, east: 556789, west: 503456, north: 570234 },
      { time: '2023', hq: 642567, east: 578234, west: 525678, north: 593456 },
      { time: '2024', hq: 668234, east: 599567, west: 547234, north: 616789 }
    ]
  }
};

// Efficiency data for all time ranges
export const efficiencyData = {
  live: {
    pueByLocation: [
      { time: '00:00', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 },
      { time: '04:00', hq: 1.1, east: 1.2, west: 1.0, north: 1.3 },
      { time: '08:00', hq: 1.3, east: 1.4, west: 1.2, north: 1.5 },
      { time: '12:00', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 },
      { time: '16:00', hq: 1.4, east: 1.5, west: 1.3, north: 1.6 },
      { time: '20:00', hq: 1.3, east: 1.4, west: 1.2, north: 1.5 }
    ],
    upsEfficiency: [
      { time: '00:00', hq: 95, east: 94, west: 96, north: 93 },
      { time: '04:00', hq: 96, east: 95, west: 97, north: 94 },
      { time: '08:00', hq: 94, east: 93, west: 95, north: 92 },
      { time: '12:00', hq: 95, east: 94, west: 96, north: 93 },
      { time: '16:00', hq: 93, east: 92, west: 94, north: 91 },
      { time: '20:00', hq: 94, east: 93, west: 95, north: 92 }
    ],
    coolingEfficiency: [
      { time: '00:00', hq: 85, east: 84, west: 86, north: 83 },
      { time: '04:00', hq: 86, east: 85, west: 87, north: 84 },
      { time: '08:00', hq: 84, east: 83, west: 85, north: 82 },
      { time: '12:00', hq: 85, east: 84, west: 86, north: 83 },
      { time: '16:00', hq: 83, east: 82, west: 84, north: 81 },
      { time: '20:00', hq: 84, east: 83, west: 85, north: 82 }
    ]
  },
  day: {
    pueByLocation: [
      { time: 'Mon', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 },
      { time: 'Tue', hq: 1.1, east: 1.2, west: 1.0, north: 1.3 },
      { time: 'Wed', hq: 1.3, east: 1.4, west: 1.2, north: 1.5 },
      { time: 'Thu', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 },
      { time: 'Fri', hq: 1.4, east: 1.5, west: 1.3, north: 1.6 },
      { time: 'Sat', hq: 1.3, east: 1.4, west: 1.2, north: 1.5 },
      { time: 'Sun', hq: 1.1, east: 1.2, west: 1.0, north: 1.3 }
    ],
    upsEfficiency: [
      { time: 'Mon', hq: 95, east: 94, west: 96, north: 93 },
      { time: 'Tue', hq: 96, east: 95, west: 97, north: 94 },
      { time: 'Wed', hq: 94, east: 93, west: 95, north: 92 },
      { time: 'Thu', hq: 95, east: 94, west: 96, north: 93 },
      { time: 'Fri', hq: 93, east: 92, west: 94, north: 91 },
      { time: 'Sat', hq: 94, east: 93, west: 95, north: 92 },
      { time: 'Sun', hq: 96, east: 95, west: 97, north: 94 }
    ],
    coolingEfficiency: [
      { time: 'Mon', hq: 85, east: 84, west: 86, north: 83 },
      { time: 'Tue', hq: 86, east: 85, west: 87, north: 84 },
      { time: 'Wed', hq: 84, east: 83, west: 85, north: 82 },
      { time: 'Thu', hq: 85, east: 84, west: 86, north: 83 },
      { time: 'Fri', hq: 83, east: 82, west: 84, north: 81 },
      { time: 'Sat', hq: 84, east: 83, west: 85, north: 82 },
      { time: 'Sun', hq: 86, east: 85, west: 87, north: 84 }
    ]
  },
  week: {
    pueByLocation: [
      { time: 'Week 1', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 },
      { time: 'Week 2', hq: 1.1, east: 1.2, west: 1.0, north: 1.3 },
      { time: 'Week 3', hq: 1.3, east: 1.4, west: 1.2, north: 1.5 },
      { time: 'Week 4', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 }
    ],
    upsEfficiency: [
      { time: 'Week 1', hq: 95, east: 94, west: 96, north: 93 },
      { time: 'Week 2', hq: 96, east: 95, west: 97, north: 94 },
      { time: 'Week 3', hq: 94, east: 93, west: 95, north: 92 },
      { time: 'Week 4', hq: 95, east: 94, west: 96, north: 93 }
    ],
    coolingEfficiency: [
      { time: 'Week 1', hq: 85, east: 84, west: 86, north: 83 },
      { time: 'Week 2', hq: 86, east: 85, west: 87, north: 84 },
      { time: 'Week 3', hq: 84, east: 83, west: 85, north: 82 },
      { time: 'Week 4', hq: 85, east: 84, west: 86, north: 83 }
    ]
  },
  month: {
    pueByLocation: [
      { time: 'Jan', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 },
      { time: 'Feb', hq: 1.1, east: 1.2, west: 1.0, north: 1.3 },
      { time: 'Mar', hq: 1.3, east: 1.4, west: 1.2, north: 1.5 },
      { time: 'Apr', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 },
      { time: 'May', hq: 1.4, east: 1.5, west: 1.3, north: 1.6 },
      { time: 'Jun', hq: 1.3, east: 1.4, west: 1.2, north: 1.5 }
    ],
    upsEfficiency: [
      { time: 'Jan', hq: 95, east: 94, west: 96, north: 93 },
      { time: 'Feb', hq: 96, east: 95, west: 97, north: 94 },
      { time: 'Mar', hq: 94, east: 93, west: 95, north: 92 },
      { time: 'Apr', hq: 95, east: 94, west: 96, north: 93 },
      { time: 'May', hq: 93, east: 92, west: 94, north: 91 },
      { time: 'Jun', hq: 94, east: 93, west: 95, north: 92 }
    ],
    coolingEfficiency: [
      { time: 'Jan', hq: 85, east: 84, west: 86, north: 83 },
      { time: 'Feb', hq: 86, east: 85, west: 87, north: 84 },
      { time: 'Mar', hq: 84, east: 83, west: 85, north: 82 },
      { time: 'Apr', hq: 85, east: 84, west: 86, north: 83 },
      { time: 'May', hq: 83, east: 82, west: 84, north: 81 },
      { time: 'Jun', hq: 84, east: 83, west: 85, north: 82 }
    ]
  },
  year: {
    pueByLocation: [
      { time: '2020', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 },
      { time: '2021', hq: 1.1, east: 1.2, west: 1.0, north: 1.3 },
      { time: '2022', hq: 1.3, east: 1.4, west: 1.2, north: 1.5 },
      { time: '2023', hq: 1.2, east: 1.3, west: 1.1, north: 1.4 },
      { time: '2024', hq: 1.4, east: 1.5, west: 1.3, north: 1.6 }
    ],
    upsEfficiency: [
      { time: '2020', hq: 95, east: 94, west: 96, north: 93 },
      { time: '2021', hq: 96, east: 95, west: 97, north: 94 },
      { time: '2022', hq: 94, east: 93, west: 95, north: 92 },
      { time: '2023', hq: 95, east: 94, west: 96, north: 93 },
      { time: '2024', hq: 93, east: 92, west: 94, north: 91 }
    ],
    coolingEfficiency: [
      { time: '2020', hq: 85, east: 84, west: 86, north: 83 },
      { time: '2021', hq: 86, east: 85, west: 87, north: 84 },
      { time: '2022', hq: 84, east: 83, west: 85, north: 82 },
      { time: '2023', hq: 85, east: 84, west: 86, north: 83 },
      { time: '2024', hq: 83, east: 82, west: 84, north: 81 }
    ]
  }
};

// Maintenance data for all time ranges
export const maintenanceData = {
  live: {
    completionRate: [
      { time: '00:00', completed: 85, pending: 15 },
      { time: '04:00', completed: 88, pending: 12 },
      { time: '08:00', completed: 90, pending: 10 },
      { time: '12:00', completed: 87, pending: 13 },
      { time: '16:00', completed: 92, pending: 8 },
      { time: '20:00', completed: 89, pending: 11 }
    ],
    maintenanceByAssetType: [
      { time: '00:00', hq: 12, east: 8, west: 10, north: 6 },
      { time: '04:00', hq: 10, east: 6, west: 8, north: 4 },
      { time: '08:00', hq: 15, east: 11, west: 13, north: 9 },
      { time: '12:00', hq: 18, east: 14, west: 16, north: 12 },
      { time: '16:00', hq: 20, east: 16, west: 18, north: 14 },
      { time: '20:00', hq: 16, east: 12, west: 14, north: 10 }
    ],
    maintenanceByLocation: [
      { time: '00:00', hq: 20, east: 15, west: 18, north: 12 },
      { time: '04:00', hq: 18, east: 13, west: 16, north: 10 },
      { time: '08:00', hq: 25, east: 20, west: 23, north: 17 },
      { time: '12:00', hq: 28, east: 23, west: 26, north: 20 },
      { time: '16:00', hq: 30, east: 25, west: 28, north: 22 },
      { time: '20:00', hq: 24, east: 19, west: 22, north: 16 }
    ]
  },
  day: {
    completionRate: [
      { time: 'Mon', completed: 85, pending: 15 },
      { time: 'Tue', completed: 90, pending: 10 },
      { time: 'Wed', completed: 88, pending: 12 },
      { time: 'Thu', completed: 92, pending: 8 },
      { time: 'Fri', completed: 87, pending: 13 },
      { time: 'Sat', completed: 89, pending: 11 },
      { time: 'Sun', completed: 91, pending: 9 }
    ],
    maintenanceByAssetType: [
      { time: 'Mon', hq: 12, east: 8, west: 10, north: 6 },
      { time: 'Tue', hq: 15, east: 10, west: 12, north: 8 },
      { time: 'Wed', hq: 11, east: 7, west: 9, north: 5 },
      { time: 'Thu', hq: 14, east: 9, west: 11, north: 7 },
      { time: 'Fri', hq: 13, east: 8, west: 10, north: 6 },
      { time: 'Sat', hq: 16, east: 11, west: 13, north: 9 },
      { time: 'Sun', hq: 10, east: 6, west: 8, north: 4 }
    ],
    maintenanceByLocation: [
      { time: 'Mon', hq: 20, east: 15, west: 18, north: 12 },
      { time: 'Tue', hq: 22, east: 17, west: 20, north: 14 },
      { time: 'Wed', hq: 19, east: 14, west: 17, north: 11 },
      { time: 'Thu', hq: 21, east: 16, west: 19, north: 13 },
      { time: 'Fri', hq: 23, east: 18, west: 21, north: 15 },
      { time: 'Sat', hq: 24, east: 19, west: 22, north: 16 },
      { time: 'Sun', hq: 18, east: 13, west: 16, north: 10 }
    ]
  },
  week: {
    completionRate: [
      { time: 'Week 1', completed: 85, pending: 15 },
      { time: 'Week 2', completed: 90, pending: 10 },
      { time: 'Week 3', completed: 88, pending: 12 },
      { time: 'Week 4', completed: 92, pending: 8 }
    ],
    maintenanceByAssetType: [
      { time: 'Week 1', hq: 12, east: 8, west: 10, north: 6 },
      { time: 'Week 2', hq: 15, east: 10, west: 12, north: 8 },
      { time: 'Week 3', hq: 11, east: 7, west: 9, north: 5 },
      { time: 'Week 4', hq: 14, east: 9, west: 11, north: 7 }
    ],
    maintenanceByLocation: [
      { time: 'Week 1', hq: 20, east: 15, west: 18, north: 12 },
      { time: 'Week 2', hq: 22, east: 17, west: 20, north: 14 },
      { time: 'Week 3', hq: 19, east: 14, west: 17, north: 11 },
      { time: 'Week 4', hq: 21, east: 16, west: 19, north: 13 }
    ]
  },
  month: {
    completionRate: [
      { time: 'Jan', completed: 85, pending: 15 },
      { time: 'Feb', completed: 90, pending: 10 },
      { time: 'Mar', completed: 88, pending: 12 },
      { time: 'Apr', completed: 92, pending: 8 },
      { time: 'May', completed: 87, pending: 13 },
      { time: 'Jun', completed: 89, pending: 11 }
    ],
    maintenanceByAssetType: [
      { time: 'Jan', hq: 12, east: 8, west: 10, north: 6 },
      { time: 'Feb', hq: 15, east: 10, west: 12, north: 8 },
      { time: 'Mar', hq: 11, east: 7, west: 9, north: 5 },
      { time: 'Apr', hq: 14, east: 9, west: 11, north: 7 },
      { time: 'May', hq: 13, east: 8, west: 10, north: 6 },
      { time: 'Jun', hq: 16, east: 11, west: 13, north: 9 }
    ],
    maintenanceByLocation: [
      { time: 'Jan', hq: 20, east: 15, west: 18, north: 12 },
      { time: 'Feb', hq: 22, east: 17, west: 20, north: 14 },
      { time: 'Mar', hq: 19, east: 14, west: 17, north: 11 },
      { time: 'Apr', hq: 21, east: 16, west: 19, north: 13 },
      { time: 'May', hq: 23, east: 18, west: 21, north: 15 },
      { time: 'Jun', hq: 24, east: 19, west: 22, north: 16 }
    ]
  },
  year: {
    completionRate: [
      { time: '2020', completed: 85, pending: 15 },
      { time: '2021', completed: 90, pending: 10 },
      { time: '2022', completed: 88, pending: 12 },
      { time: '2023', completed: 92, pending: 8 },
      { time: '2024', completed: 87, pending: 13 }
    ],
    maintenanceByAssetType: [
      { time: '2020', hq: 120, east: 80, west: 100, north: 60 },
      { time: '2021', hq: 150, east: 100, west: 120, north: 80 },
      { time: '2022', hq: 110, east: 70, west: 90, north: 50 },
      { time: '2023', hq: 140, east: 90, west: 110, north: 70 },
      { time: '2024', hq: 130, east: 80, west: 100, north: 60 }
    ],
    maintenanceByLocation: [
      { time: '2020', hq: 200, east: 150, west: 180, north: 120 },
      { time: '2021', hq: 220, east: 170, west: 200, north: 140 },
      { time: '2022', hq: 190, east: 140, west: 170, north: 110 },
      { time: '2023', hq: 210, east: 160, west: 190, north: 130 },
      { time: '2024', hq: 230, east: 180, west: 210, north: 150 }
    ]
  }
};

// Alarms data for all time ranges
export const alarmsData = {
  live: {
    alarmFrequency: [
      { time: '00:00', hq: 2, east: 1, west: 3, north: 1 },
      { time: '04:00', hq: 1, east: 0, west: 2, north: 0 },
      { time: '08:00', hq: 4, east: 2, west: 5, north: 2 },
      { time: '12:00', hq: 6, east: 3, west: 4, north: 3 },
      { time: '16:00', hq: 5, east: 4, west: 6, north: 4 },
      { time: '20:00', hq: 3, east: 2, west: 3, north: 2 }
    ],
    alarmsBySeverity: [
      { time: '00:00', critical: 1, warning: 3, info: 5 },
      { time: '04:00', critical: 0, warning: 2, info: 3 },
      { time: '08:00', critical: 2, warning: 5, info: 8 },
      { time: '12:00', critical: 3, warning: 7, info: 10 },
      { time: '16:00', critical: 2, warning: 6, info: 9 },
      { time: '20:00', critical: 1, warning: 4, info: 6 }
    ],
    alarmsByAssetType: [
      { time: '00:00', hq: 3, east: 2, west: 4, north: 1 },
      { time: '04:00', hq: 1, east: 1, west: 2, north: 1 },
      { time: '08:00', hq: 5, east: 3, west: 6, north: 3 },
      { time: '12:00', hq: 7, east: 4, west: 8, north: 5 },
      { time: '16:00', hq: 6, east: 5, west: 7, north: 4 },
      { time: '20:00', hq: 4, east: 3, west: 5, north: 2 }
    ]
  },
  day: {
    alarmFrequency: [
      { time: 'Mon', hq: 5, east: 3, west: 7, north: 2 },
      { time: 'Tue', hq: 8, east: 4, west: 6, north: 3 },
      { time: 'Wed', hq: 6, east: 5, west: 8, north: 4 },
      { time: 'Thu', hq: 7, east: 6, west: 5, north: 5 },
      { time: 'Fri', hq: 4, east: 7, west: 9, north: 3 },
      { time: 'Sat', hq: 9, east: 8, west: 4, north: 6 },
      { time: 'Sun', hq: 3, east: 2, west: 6, north: 1 }
    ],
    alarmsBySeverity: [
      { time: 'Mon', critical: 2, warning: 5, info: 8 },
      { time: 'Tue', critical: 3, warning: 7, info: 11 },
      { time: 'Wed', critical: 4, warning: 6, info: 13 },
      { time: 'Thu', critical: 3, warning: 8, info: 12 },
      { time: 'Fri', critical: 1, warning: 9, info: 13 },
      { time: 'Sat', critical: 5, warning: 7, info: 15 },
      { time: 'Sun', critical: 1, warning: 4, info: 7 }
    ],
    alarmsByAssetType: [
      { time: 'Mon', hq: 8, east: 5, west: 10, north: 4 },
      { time: 'Tue', hq: 11, east: 7, west: 12, north: 6 },
      { time: 'Wed', hq: 12, east: 8, west: 14, north: 7 },
      { time: 'Thu', hq: 13, east: 9, west: 11, north: 8 },
      { time: 'Fri', hq: 10, east: 11, west: 15, north: 7 },
      { time: 'Sat', hq: 15, east: 13, west: 9, north: 10 },
      { time: 'Sun', hq: 6, east: 4, west: 8, north: 3 }
    ]
  },
  week: {
    alarmFrequency: [
      { time: 'Week 1', hq: 5, east: 3, west: 7, north: 2 },
      { time: 'Week 2', hq: 8, east: 4, west: 6, north: 3 },
      { time: 'Week 3', hq: 6, east: 5, west: 8, north: 4 },
      { time: 'Week 4', hq: 7, east: 6, west: 5, north: 5 }
    ],
    alarmsBySeverity: [
      { time: 'Week 1', critical: 3, warning: 8, info: 12 },
      { time: 'Week 2', critical: 4, warning: 9, info: 14 },
      { time: 'Week 3', critical: 5, warning: 7, info: 16 },
      { time: 'Week 4', critical: 4, warning: 10, info: 15 }
    ],
    alarmsByAssetType: [
      { time: 'Week 1', hq: 8, east: 6, west: 12, north: 5 },
      { time: 'Week 2', hq: 12, east: 8, west: 14, north: 7 },
      { time: 'Week 3', hq: 14, east: 10, west: 16, north: 9 },
      { time: 'Week 4', hq: 13, east: 11, west: 13, north: 8 }
    ]
  },
  month: {
    alarmFrequency: [
      { time: 'Jan', hq: 5, east: 3, west: 7, north: 2 },
      { time: 'Feb', hq: 8, east: 4, west: 6, north: 3 },
      { time: 'Mar', hq: 6, east: 5, west: 8, north: 4 },
      { time: 'Apr', hq: 7, east: 6, west: 5, north: 5 },
      { time: 'May', hq: 4, east: 7, west: 9, north: 3 },
      { time: 'Jun', hq: 9, east: 8, west: 4, north: 6 }
    ],
    alarmsBySeverity: [
      { time: 'Jan', critical: 12, warning: 25, info: 45 },
      { time: 'Feb', critical: 8, warning: 30, info: 38 },
      { time: 'Mar', critical: 15, warning: 22, info: 42 },
      { time: 'Apr', critical: 10, warning: 28, info: 40 },
      { time: 'May', critical: 6, warning: 35, info: 48 },
      { time: 'Jun', critical: 11, warning: 27, info: 44 }
    ],
    alarmsByAssetType: [
      { time: 'Jan', hq: 18, east: 12, west: 15, north: 8 },
      { time: 'Feb', hq: 22, east: 14, west: 18, north: 10 },
      { time: 'Mar', hq: 20, east: 13, west: 16, north: 9 },
      { time: 'Apr', hq: 25, east: 16, west: 20, north: 12 },
      { time: 'May', hq: 19, east: 15, west: 17, north: 11 },
      { time: 'Jun', hq: 23, east: 17, west: 19, north: 13 }
    ]
  },
  year: {
    alarmFrequency: [
      { time: '2020', hq: 45, east: 32, west: 58, north: 28 },
      { time: '2021', hq: 52, east: 38, west: 64, north: 34 },
      { time: '2022', hq: 48, east: 41, west: 67, north: 36 },
      { time: '2023', hq: 56, east: 44, west: 52, north: 42 },
      { time: '2024', hq: 61, east: 49, west: 73, north: 38 }
    ],
    alarmsBySeverity: [
      { time: '2020', critical: 82, warning: 165, info: 298 },
      { time: '2021', critical: 76, warning: 184, info: 324 },
      { time: '2022', critical: 94, warning: 156, info: 342 },
      { time: '2023', critical: 68, warning: 198, info: 368 },
      { time: '2024', critical: 89, warning: 203, info: 389 }
    ],
    alarmsByAssetType: [
      { time: '2020', hq: 156, east: 123, west: 189, north: 98 },
      { time: '2021', hq: 178, east: 134, west: 201, north: 112 },
      { time: '2022', hq: 167, east: 145, west: 223, north: 125 },
      { time: '2023', hq: 189, east: 156, west: 198, north: 134 },
      { time: '2024', hq: 201, east: 167, west: 234, north: 145 }
    ]
  }
};

// Static stats for the stat cards
export const statCardsData = {
  totalPower: '2.1 MW',
  averagePUE: '1.41',
  carbonEmissions: '580 tons',
  uptime: '99.98%'
};