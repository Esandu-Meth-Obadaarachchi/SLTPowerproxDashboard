export const faultData = {
  summary: {
    total: 23,
    critical: 3,
    major: 8,
    minor: 12,
    pending: 7,
    assigned: 9,
    completed: 7
  },
  
  pendingAssignment: [
    {
      id: "FLT-001",
      description: "Generator failure - No power output",
      assetType: "Generator",
      assetId: "GEN-001",
      location: "HQ Data Center",
      priority: "Critical",
      status: "Open",
      timestamp: "2024-03-15T10:30:00Z"
    },
    {
      id: "FLT-002",
      description: "UPS battery degradation detected",
      assetType: "UPS",
      assetId: "UPS-003",
      location: "East Region DC",
      priority: "Major",
      status: "Open",
      timestamp: "2024-03-15T11:45:00Z"
    },
    {
      id: "FLT-003",
      description: "AC unit temperature fluctuation",
      assetType: "AC Unit",
      assetId: "AC-007",
      location: "West Region DC",
      priority: "Minor",
      status: "Open",
      timestamp: "2024-03-15T12:15:00Z"
    },
    {
      id: "FLT-004",
      description: "PDU overload warning",
      assetType: "PDU",
      assetId: "PDU-012",
      location: "North Region DC",
      priority: "Major",
      status: "Open",
      timestamp: "2024-03-15T13:20:00Z"
    },
    {
      id: "FLT-005",
      description: "Generator maintenance required",
      assetType: "Generator",
      assetId: "GEN-005",
      location: "HQ Data Center",
      priority: "Minor",
      status: "Open",
      timestamp: "2024-03-15T14:10:00Z"
    },
    {
      id: "FLT-006",
      description: "UPS ventilation system fault",
      assetType: "UPS",
      assetId: "UPS-008",
      location: "East Region DC",
      priority: "Major",
      status: "Open",
      timestamp: "2024-03-15T15:30:00Z"
    },
    {
      id: "FLT-007",
      description: "AC unit refrigerant leak detected",
      assetType: "AC Unit",
      assetId: "AC-013",
      location: "West Region DC",
      priority: "Critical",
      status: "Open",
      timestamp: "2024-03-15T16:45:00Z"
    }
  ],
  
  assigned: [
    {
      id: "FLT-008",
      description: "Generator control panel malfunction",
      assetType: "Generator",
      assetId: "GEN-003",
      location: "HQ Data Center",
      priority: "Major",
      status: "In Progress",
      timestamp: "2024-03-14T09:15:00Z",
      assignedTo: "John Smith",
      estimatedCompletion: "2024-03-16T14:00:00Z"
    },
    {
      id: "FLT-009",
      description: "UPS bypass switch issue",
      assetType: "UPS",
      assetId: "UPS-001",
      location: "East Region DC",
      priority: "Critical",
      status: "In Progress",
      timestamp: "2024-03-14T10:30:00Z",
      assignedTo: "Sarah Johnson",
      estimatedCompletion: "2024-03-15T18:00:00Z"
    },
    {
      id: "FLT-010",
      description: "AC unit compressor noise",
      assetType: "AC Unit",
      assetId: "AC-002",
      location: "West Region DC",
      priority: "Minor",
      status: "In Progress",
      timestamp: "2024-03-14T11:20:00Z",
      assignedTo: "Mike Wilson",
      estimatedCompletion: "2024-03-16T10:00:00Z"
    },
    {
      id: "FLT-011",
      description: "PDU circuit breaker tripping",
      assetType: "PDU",
      assetId: "PDU-007",
      location: "North Region DC",
      priority: "Major",
      status: "In Progress",
      timestamp: "2024-03-14T13:45:00Z",
      assignedTo: "Emily Davis",
      estimatedCompletion: "2024-03-15T16:00:00Z"
    },
    {
      id: "FLT-012",
      description: "Generator fuel pump maintenance",
      assetType: "Generator",
      assetId: "GEN-008",
      location: "HQ Data Center",
      priority: "Minor",
      status: "In Progress",
      timestamp: "2024-03-14T14:30:00Z",
      assignedTo: "David Brown",
      estimatedCompletion: "2024-03-16T12:00:00Z"
    },
    {
      id: "FLT-013",
      description: "UPS battery replacement needed",
      assetType: "UPS",
      assetId: "UPS-006",
      location: "East Region DC",
      priority: "Major",
      status: "In Progress",
      timestamp: "2024-03-14T15:15:00Z",
      assignedTo: "Lisa Anderson",
      estimatedCompletion: "2024-03-16T11:00:00Z"
    },
    {
      id: "FLT-014",
      description: "AC unit filter replacement",
      assetType: "AC Unit",
      assetId: "AC-011",
      location: "West Region DC",
      priority: "Minor",
      status: "In Progress",
      timestamp: "2024-03-14T16:00:00Z",
      assignedTo: "Chris Martinez",
      estimatedCompletion: "2024-03-15T17:00:00Z"
    },
    {
      id: "FLT-015",
      description: "PDU display panel error",
      assetType: "PDU",
      assetId: "PDU-003",
      location: "North Region DC",
      priority: "Minor",
      status: "In Progress",
      timestamp: "2024-03-14T17:20:00Z",
      assignedTo: "Jessica Taylor",
      estimatedCompletion: "2024-03-16T09:00:00Z"
    },
    {
      id: "FLT-016",
      description: "Generator coolant system check",
      assetType: "Generator",
      assetId: "GEN-012",
      location: "HQ Data Center",
      priority: "Major",
      status: "In Progress",
      timestamp: "2024-03-14T18:10:00Z",
      assignedTo: "Robert Garcia",
      estimatedCompletion: "2024-03-16T15:00:00Z"
    }
  ],
  
  completed: [
    {
      id: "FLT-017",
      description: "UPS cooling fan replacement",
      assetType: "UPS",
      assetId: "UPS-002",
      location: "HQ Data Center",
      priority: "Major",
      status: "Resolved",
      timestamp: "2024-03-13T08:30:00Z",
      assignedTo: "John Smith",
      completedTime: "2024-03-14T16:45:00Z",
      timeToComplete: 1935, // minutes
      resolution: "Replaced faulty cooling fan and tested system performance. All parameters now within normal range.",
      rating: 5
    },
    {
      id: "FLT-018",
      description: "AC unit thermostat calibration",
      assetType: "AC Unit",
      assetId: "AC-005",
      location: "East Region DC",
      priority: "Minor",
      status: "Resolved",
      timestamp: "2024-03-13T09:15:00Z",
      assignedTo: "Sarah Johnson",
      completedTime: "2024-03-14T11:30:00Z",
      timeToComplete: 1575, // minutes
      resolution: "Calibrated thermostat settings and verified temperature control accuracy.",
      rating: 4
    },
    {
      id: "FLT-019",
      description: "Generator oil change and maintenance",
      assetType: "Generator",
      assetId: "GEN-006",
      location: "West Region DC",
      priority: "Minor",
      status: "Resolved",
      timestamp: "2024-03-13T10:00:00Z",
      assignedTo: "Mike Wilson",
      completedTime: "2024-03-14T14:20:00Z",
      timeToComplete: 1700, // minutes
      resolution: "Performed scheduled oil change and comprehensive maintenance check. Generator running optimally.",
      rating: 5
    },
    {
      id: "FLT-020",
      description: "PDU power monitoring system update",
      assetType: "PDU",
      assetId: "PDU-009",
      location: "North Region DC",
      priority: "Minor",
      status: "Resolved",
      timestamp: "2024-03-13T11:30:00Z",
      assignedTo: "Emily Davis",
      completedTime: "2024-03-14T13:15:00Z",
      timeToComplete: 1545, // minutes
      resolution: "Updated monitoring system firmware and verified all readings are accurate.",
      rating: 4
    },
    {
      id: "FLT-021",
      description: "UPS load balancing adjustment",
      assetType: "UPS",
      assetId: "UPS-004",
      location: "HQ Data Center",
      priority: "Major",
      status: "Resolved",
      timestamp: "2024-03-13T12:45:00Z",
      assignedTo: "David Brown",
      completedTime: "2024-03-14T17:30:00Z",
      timeToComplete: 1725, // minutes
      resolution: "Adjusted load balancing configuration and tested failover procedures successfully.",
      rating: 5
    },
    {
      id: "FLT-022",
      description: "AC unit condensate drain cleaning",
      assetType: "AC Unit",
      assetId: "AC-009",
      location: "East Region DC",
      priority: "Minor",
      status: "Resolved",
      timestamp: "2024-03-13T14:20:00Z",
      assignedTo: "Lisa Anderson",
      completedTime: "2024-03-14T10:45:00Z",
      timeToComplete: 1225, // minutes
      resolution: "Cleaned condensate drain system and verified proper water drainage.",
      rating: 4
    },
    {
      id: "FLT-023",
      description: "Generator exhaust system inspection",
      assetType: "Generator",
      assetId: "GEN-010",
      location: "West Region DC",
      priority: "Critical",
      status: "Resolved",
      timestamp: "2024-03-13T15:00:00Z",
      assignedTo: "Chris Martinez",
      completedTime: "2024-03-14T12:30:00Z",
      timeToComplete: 1290, // minutes
      resolution: "Inspected and cleaned exhaust system. Replaced damaged exhaust manifold gasket.",
      rating: 5
    }
  ],
  
  technicians: [
    {
      id: "TECH-001",
      name: "John Smith",
      specialization: "Generators",
      location: "HQ Data Center",
      availability: "Available",
      activeTickets: 1
    },
    {
      id: "TECH-002",
      name: "Sarah Johnson",
      specialization: "UPS Systems",
      location: "East Region DC",
      availability: "Busy",
      activeTickets: 2
    },
    {
      id: "TECH-003",
      name: "Mike Wilson",
      specialization: "HVAC",
      location: "West Region DC",
      availability: "Available",
      activeTickets: 1
    },
    {
      id: "TECH-004",
      name: "Emily Davis",
      specialization: "Power Distribution",
      location: "North Region DC",
      availability: "Busy",
      activeTickets: 2
    },
    {
      id: "TECH-005",
      name: "David Brown",
      specialization: "Generators",
      location: "HQ Data Center",
      availability: "Available",
      activeTickets: 1
    },
    {
      id: "TECH-006",
      name: "Lisa Anderson",
      specialization: "UPS Systems",
      location: "East Region DC",
      availability: "Available",
      activeTickets: 1
    },
    {
      id: "TECH-007",
      name: "Chris Martinez",
      specialization: "HVAC",
      location: "West Region DC",
      availability: "Busy",
      activeTickets: 2
    },
    {
      id: "TECH-008",
      name: "Jessica Taylor",
      specialization: "Power Distribution",
      location: "North Region DC",
      availability: "Available",
      activeTickets: 1
    },
    {
      id: "TECH-009",
      name: "Robert Garcia",
      specialization: "Generators",
      location: "HQ Data Center",
      availability: "Busy",
      activeTickets: 1
    }
  ]
};