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