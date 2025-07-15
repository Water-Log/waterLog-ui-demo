export const countries = [
  { value: "tr", label: "Turkey", code: "TR", phoneCode: "+90" },
  { value: "us", label: "United States", code: "US", phoneCode: "+1" },
  { value: "gb", label: "United Kingdom", code: "GB", phoneCode: "+44" },
  { value: "de", label: "Germany", code: "DE", phoneCode: "+49" },
  { value: "fr", label: "France", code: "FR", phoneCode: "+33" },
  { value: "it", label: "Italy", code: "IT", phoneCode: "+39" },
  { value: "es", label: "Spain", code: "ES", phoneCode: "+34" },
  { value: "nl", label: "Netherlands", code: "NL", phoneCode: "+31" },
  { value: "be", label: "Belgium", code: "BE", phoneCode: "+32" },
  { value: "ch", label: "Switzerland", code: "CH", phoneCode: "+41" },
  { value: "at", label: "Austria", code: "AT", phoneCode: "+43" },
  { value: "pl", label: "Poland", code: "PL", phoneCode: "+48" },
  { value: "se", label: "Sweden", code: "SE", phoneCode: "+46" },
  { value: "no", label: "Norway", code: "NO", phoneCode: "+47" },
  { value: "dk", label: "Denmark", code: "DK", phoneCode: "+45" },
  { value: "fi", label: "Finland", code: "FI", phoneCode: "+358" },
  { value: "pt", label: "Portugal", code: "PT", phoneCode: "+351" },
  { value: "gr", label: "Greece", code: "GR", phoneCode: "+30" },
  { value: "ie", label: "Ireland", code: "IE", phoneCode: "+353" },
  { value: "ca", label: "Canada", code: "CA", phoneCode: "+1" },
  { value: "au", label: "Australia", code: "AU", phoneCode: "+61" },
  { value: "jp", label: "Japan", code: "JP", phoneCode: "+81" },
  { value: "kr", label: "South Korea", code: "KR", phoneCode: "+82" },
  { value: "sg", label: "Singapore", code: "SG", phoneCode: "+65" },
  { value: "nz", label: "New Zealand", code: "NZ", phoneCode: "+64" },
]

// Note: Fleet data is defined below with the correct structure

export const ships = [
  {
    id: "1",
    name: "MV Atlantic Pioneer",
    type: "Container Ship",
    imo: "9234567",
    flag: "Panama",
    status: "Active",
    location: "Port of Rotterdam",
    capacity: "18,000 TEU",
    captain: "Captain James Morrison",
    yearBuilt: 2019,
    lastInspection: "2024-01-15",
    nextMaintenance: "2024-03-20",
    image: "/cargo-ship.jpg",
    fleetId: "1"
  },
  {
    id: "2",
    name: "MV Mediterranean Star",
    type: "Bulk Carrier",
    imo: "9345678",
    flag: "Liberia",
    status: "In Transit",
    location: "Mediterranean Sea",
    capacity: "75,000 DWT",
    captain: "Captain Maria Rodriguez",
    yearBuilt: 2020,
    lastInspection: "2024-02-10",
    nextMaintenance: "2024-04-15",
    image: "/cargo-ship.jpg",
    fleetId: "2"
  },
  {
    id: "3",
    name: "MV Baltic Explorer",
    type: "Tanker",
    imo: "9456789",
    flag: "Marshall Islands",
    status: "Maintenance",
    location: "Hamburg Shipyard",
    capacity: "115,000 DWT",
    captain: "Captain Erik Hansen",
    yearBuilt: 2018,
    lastInspection: "2024-01-20",
    nextMaintenance: "2024-02-28",
    image: "/cargo-ship.jpg",
    fleetId: "2"
  },
  {
    id: "4",
    name: "MV Pacific Voyager",
    type: "Container Ship",
    imo: "9567890",
    flag: "Singapore",
    status: "Active",
    location: "Port of Singapore",
    capacity: "14,500 TEU",
    captain: "Captain Li Wei",
    yearBuilt: 2021,
    lastInspection: "2024-02-05",
    nextMaintenance: "2024-05-10",
    image: "/cargo-ship.jpg",
    fleetId: "1"
  },
  {
    id: "5",
    name: "MV Arctic Breaker",
    type: "Ice Breaker",
    imo: "9678901",
    flag: "Norway",
    status: "Active",
    location: "Arctic Ocean",
    capacity: "15,000 HP",
    captain: "Captain Olaf Andersen",
    yearBuilt: 2017,
    lastInspection: "2024-01-30",
    nextMaintenance: "2024-04-01",
    image: "/cargo-ship.jpg",
    fleetId: "3"
  },
  {
    id: "6",
    name: "MV Indian Ocean",
    type: "Bulk Carrier",
    imo: "9789012",
    flag: "India",
    status: "In Transit",
    location: "Indian Ocean",
    capacity: "82,000 DWT",
    captain: "Captain Raj Patel",
    yearBuilt: 2022,
    lastInspection: "2024-02-12",
    nextMaintenance: "2024-06-01",
    image: "/cargo-ship.jpg",
    fleetId: "4"
  }
]

export const fleets = [
  {
    id: "1",
    name: "Pacific Fleet",
    company: "Maritime Global Corp",
    region: "Pacific Ocean",
    status: "Active",
    createdDate: "2023-01-15",
    shipOwners: ["owner-1", "owner-2"],
    shipIds: ["1", "4"],
    description: "Primary fleet operations in Pacific region",
    headquarters: "Singapore",
    totalShips: 2,
    activeVoyages: 8
  },
  {
    id: "2",
    name: "Atlantic Fleet",
    company: "Maritime Global Corp",
    region: "Atlantic Ocean",
    status: "Active",
    createdDate: "2022-08-20",
    shipOwners: ["owner-3", "owner-4"],
    shipIds: ["2", "3"],
    description: "Atlantic operations and European routes",
    headquarters: "Rotterdam",
    totalShips: 2,
    activeVoyages: 12
  },
  {
    id: "3",
    name: "Mediterranean Fleet",
    company: "Maritime Global Corp",
    region: "Mediterranean Sea",
    status: "Setup",
    createdDate: "2024-01-10",
    shipOwners: ["owner-5"],
    shipIds: ["5"],
    description: "New fleet for Mediterranean trade routes",
    headquarters: "Piraeus",
    totalShips: 1,
    activeVoyages: 3
  },
  {
    id: "4",
    name: "Indian Ocean Fleet",
    company: "Maritime Global Corp",
    region: "Indian Ocean",
    status: "Active",
    createdDate: "2023-06-05",
    shipOwners: ["owner-6"],
    shipIds: ["6"],
    description: "Operations covering India, Middle East, and Africa",
    headquarters: "Mumbai",
    totalShips: 1,
    activeVoyages: 5
  }
]

export const shipOwners = [
  {
    id: "owner-1",
    name: "John Smith",
    email: "john.smith@maritime.com",
    phone: "+1-555-0123",
    nationality: "US",
    licenseNumber: "SO-001-2023",
    experience: "15 years",
    specialization: "Container Ships",
    assignedFleets: ["1"],
    status: "Active",
    joinDate: "2023-01-20"
  },
  {
    id: "owner-2",
    name: "Sarah Johnson",
    email: "sarah.johnson@maritime.com",
    phone: "+1-555-0124",
    nationality: "CA",
    licenseNumber: "SO-002-2023",
    experience: "12 years",
    specialization: "Bulk Carriers",
    assignedFleets: ["1"],
    status: "Active",
    joinDate: "2023-02-15"
  },
  {
    id: "owner-3",
    name: "Hans Mueller",
    email: "hans.mueller@maritime.com",
    phone: "+49-555-0125",
    nationality: "DE",
    licenseNumber: "SO-003-2022",
    experience: "20 years",
    specialization: "Tankers",
    assignedFleets: ["2"],
    status: "Active",
    joinDate: "2022-08-25"
  },
  {
    id: "owner-4",
    name: "Marie Dubois",
    email: "marie.dubois@maritime.com",
    phone: "+33-555-0126",
    nationality: "FR",
    licenseNumber: "SO-004-2022",
    experience: "18 years",
    specialization: "Container Ships",
    assignedFleets: ["2"],
    status: "Active",
    joinDate: "2022-09-10"
  },
  {
    id: "owner-5",
    name: "Giuseppe Romano",
    email: "giuseppe.romano@maritime.com",
    phone: "+39-555-0127",
    nationality: "IT",
    licenseNumber: "SO-005-2024",
    experience: "8 years",
    specialization: "Passenger Ferries",
    assignedFleets: ["3"],
    status: "Active",
    joinDate: "2024-01-15"
  },
  {
    id: "owner-6",
    name: "Raj Patel",
    email: "raj.patel@maritime.com",
    phone: "+91-555-0128",
    nationality: "IN",
    licenseNumber: "SO-006-2023",
    experience: "14 years",
    specialization: "Bulk Carriers",
    assignedFleets: ["4"],
    status: "Active",
    joinDate: "2023-06-10"
  }
]

// Updated ships data to include fleetId
export const shipsUpdated = [
  {
    ...ships[0],
    fleetId: "1",
    ownerId: "owner-1"
  },
  {
    ...ships[1],
    fleetId: "2",
    ownerId: "owner-3"
  },
  {
    ...ships[2],
    fleetId: "2",
    ownerId: "owner-4"
  },
  {
    ...ships[3],
    fleetId: "1",
    ownerId: "owner-2"
  },
  {
    ...ships[4],
    fleetId: "3",
    ownerId: "owner-5"
  },
  {
    ...ships[5],
    fleetId: "4",
    ownerId: "owner-6"
  }
]

// Water analysis data for ships
export const waterAnalysisData = {
  "1": { // MV Atlantic Pioneer
    shipId: "1",
    shipName: "MV Atlantic Pioneer",
    fleetId: "1",
    lastAnalysisDate: "2024-07-14",
    currentStatus: "Good",
    analyses: {
      nitrite: { value: 1200, target: "1000-2400", status: "optimal", unit: "ppm" },
      chloride: { value: 40, target: "Max: 50", status: "normal", unit: "ppm" },
      pH: { value: 9.2, target: "8.3-10", status: "good", unit: "" },
      totalHardness: { value: 120, target: "Max: 180", status: "acceptable", unit: "ppm CaCO3" }
    },
    alerts: [],
    lastChemicalAddition: "2024-07-12",
    nextAnalysisDate: "2024-07-16"
  },
  "2": { // MV Mediterranean Star
    shipId: "2",
    shipName: "MV Mediterranean Star",
    fleetId: "2",
    lastAnalysisDate: "2024-07-14",
    currentStatus: "Attention",
    analyses: {
      nitrite: { value: 2800, target: "1000-2400", status: "high", unit: "ppm" },
      chloride: { value: 85, target: "Max: 50", status: "high", unit: "ppm" },
      pH: { value: 11.2, target: "8.3-10", status: "high", unit: "" },
      totalHardness: { value: 190, target: "Max: 180", status: "high", unit: "ppm CaCO3" }
    },
    alerts: [
      "pH high - Scaling risk due to excess alkalinity",
      "Chloride elevated - Potential seawater ingress",
      "Hardness above limits - Immediate attention required"
    ],
    lastChemicalAddition: "2024-07-10",
    nextAnalysisDate: "2024-07-15"
  },
  "3": { // MV Baltic Explorer
    shipId: "3",
    shipName: "MV Baltic Explorer",
    fleetId: "2",
    lastAnalysisDate: "2024-07-13",
    currentStatus: "Critical",
    analyses: {
      nitrite: { value: 800, target: "1000-2400", status: "low", unit: "ppm" },
      chloride: { value: 120, target: "Max: 50", status: "critical", unit: "ppm" },
      pH: { value: 7.8, target: "8.3-10", status: "low", unit: "" },
      totalHardness: { value: 220, target: "Max: 180", status: "critical", unit: "ppm CaCO3" }
    },
    alerts: [
      "Nitrite below optimal range - Corrosion risk",
      "Chloride critical - Seawater contamination detected",
      "pH low - Corrosion accelerated",
      "Hardness critical - Scale formation risk"
    ],
    lastChemicalAddition: "2024-07-08",
    nextAnalysisDate: "2024-07-14"
  },
  "4": { // MV Pacific Voyager
    shipId: "4",
    shipName: "MV Pacific Voyager",
    fleetId: "1",
    lastAnalysisDate: "2024-07-14",
    currentStatus: "Good",
    analyses: {
      nitrite: { value: 1800, target: "1000-2400", status: "optimal", unit: "ppm" },
      chloride: { value: 35, target: "Max: 50", status: "normal", unit: "ppm" },
      pH: { value: 9.5, target: "8.3-10", status: "good", unit: "" },
      totalHardness: { value: 140, target: "Max: 180", status: "acceptable", unit: "ppm CaCO3" }
    },
    alerts: [],
    lastChemicalAddition: "2024-07-13",
    nextAnalysisDate: "2024-07-16"
  },
  "5": { // MV Arctic Breaker
    shipId: "5",
    shipName: "MV Arctic Breaker",
    fleetId: "3",
    lastAnalysisDate: "2024-07-14",
    currentStatus: "Attention",
    analyses: {
      nitrite: { value: 2200, target: "1000-2400", status: "optimal", unit: "ppm" },
      chloride: { value: 65, target: "Max: 50", status: "high", unit: "ppm" },
      pH: { value: 10.5, target: "8.3-10", status: "high", unit: "" },
      totalHardness: { value: 175, target: "Max: 180", status: "acceptable", unit: "ppm CaCO3" }
    },
    alerts: [
      "Chloride elevated - Monitor for seawater ingress",
      "pH slightly high - Consider dilution"
    ],
    lastChemicalAddition: "2024-07-12",
    nextAnalysisDate: "2024-07-16"
  },
  "6": { // MV Indian Ocean
    shipId: "6",
    shipName: "MV Indian Ocean",
    fleetId: "4",
    lastAnalysisDate: "2024-07-14",
    currentStatus: "Good",
    analyses: {
      nitrite: { value: 1500, target: "1000-2400", status: "optimal", unit: "ppm" },
      chloride: { value: 42, target: "Max: 50", status: "normal", unit: "ppm" },
      pH: { value: 9.0, target: "8.3-10", status: "good", unit: "" },
      totalHardness: { value: 155, target: "Max: 180", status: "acceptable", unit: "ppm CaCO3" }
    },
    alerts: [],
    lastChemicalAddition: "2024-07-13",
    nextAnalysisDate: "2024-07-16"
  }
}

// Historical water analysis data for analytics
export const historicalWaterAnalysisData = {
  "1": { // MV Atlantic Pioneer
    shipId: "1",
    shipName: "MV Atlantic Pioneer",
    fleetId: "1",
    history: [
      {
        date: "2024-07-01",
        nitrite: 1100,
        chloride: 45,
        pH: 9.1,
        totalHardness: 125,
        status: "Good"
      },
      {
        date: "2024-07-03",
        nitrite: 1150,
        chloride: 42,
        pH: 9.0,
        totalHardness: 122,
        status: "Good"
      },
      {
        date: "2024-07-05",
        nitrite: 1180,
        chloride: 38,
        pH: 9.2,
        totalHardness: 118,
        status: "Good"
      },
      {
        date: "2024-07-07",
        nitrite: 1200,
        chloride: 40,
        pH: 9.3,
        totalHardness: 120,
        status: "Good"
      },
      {
        date: "2024-07-10",
        nitrite: 1220,
        chloride: 43,
        pH: 9.1,
        totalHardness: 123,
        status: "Good"
      },
      {
        date: "2024-07-12",
        nitrite: 1190,
        chloride: 41,
        pH: 9.2,
        totalHardness: 119,
        status: "Good"
      },
      {
        date: "2024-07-14",
        nitrite: 1200,
        chloride: 40,
        pH: 9.2,
        totalHardness: 120,
        status: "Good"
      }
    ]
  },
  "2": { // MV Mediterranean Star
    shipId: "2",
    shipName: "MV Mediterranean Star",
    fleetId: "2",
    history: [
      {
        date: "2024-07-01",
        nitrite: 1800,
        chloride: 35,
        pH: 9.5,
        totalHardness: 140,
        status: "Good"
      },
      {
        date: "2024-07-03",
        nitrite: 2100,
        chloride: 48,
        pH: 9.8,
        totalHardness: 155,
        status: "Good"
      },
      {
        date: "2024-07-05",
        nitrite: 2400,
        chloride: 55,
        pH: 10.2,
        totalHardness: 165,
        status: "Attention"
      },
      {
        date: "2024-07-07",
        nitrite: 2600,
        chloride: 68,
        pH: 10.5,
        totalHardness: 175,
        status: "Attention"
      },
      {
        date: "2024-07-10",
        nitrite: 2750,
        chloride: 78,
        pH: 10.8,
        totalHardness: 182,
        status: "Attention"
      },
      {
        date: "2024-07-12",
        nitrite: 2800,
        chloride: 82,
        pH: 11.0,
        totalHardness: 188,
        status: "Attention"
      },
      {
        date: "2024-07-14",
        nitrite: 2800,
        chloride: 85,
        pH: 11.2,
        totalHardness: 190,
        status: "Attention"
      }
    ]
  },
  "3": { // MV Baltic Explorer
    shipId: "3",
    shipName: "MV Baltic Explorer",
    fleetId: "2",
    history: [
      {
        date: "2024-07-01",
        nitrite: 1500,
        chloride: 30,
        pH: 9.0,
        totalHardness: 160,
        status: "Good"
      },
      {
        date: "2024-07-03",
        nitrite: 1200,
        chloride: 45,
        pH: 8.8,
        totalHardness: 170,
        status: "Good"
      },
      {
        date: "2024-07-05",
        nitrite: 1000,
        chloride: 65,
        pH: 8.5,
        totalHardness: 185,
        status: "Attention"
      },
      {
        date: "2024-07-07",
        nitrite: 950,
        chloride: 85,
        pH: 8.2,
        totalHardness: 200,
        status: "Attention"
      },
      {
        date: "2024-07-10",
        nitrite: 850,
        chloride: 105,
        pH: 8.0,
        totalHardness: 210,
        status: "Critical"
      },
      {
        date: "2024-07-12",
        nitrite: 820,
        chloride: 115,
        pH: 7.9,
        totalHardness: 215,
        status: "Critical"
      },
      {
        date: "2024-07-13",
        nitrite: 800,
        chloride: 120,
        pH: 7.8,
        totalHardness: 220,
        status: "Critical"
      }
    ]
  },
  "4": { // MV Pacific Voyager
    shipId: "4",
    shipName: "MV Pacific Voyager",
    fleetId: "1",
    history: [
      {
        date: "2024-07-01",
        nitrite: 1600,
        chloride: 32,
        pH: 9.3,
        totalHardness: 135,
        status: "Good"
      },
      {
        date: "2024-07-03",
        nitrite: 1650,
        chloride: 30,
        pH: 9.4,
        totalHardness: 138,
        status: "Good"
      },
      {
        date: "2024-07-05",
        nitrite: 1700,
        chloride: 33,
        pH: 9.5,
        totalHardness: 142,
        status: "Good"
      },
      {
        date: "2024-07-07",
        nitrite: 1750,
        chloride: 35,
        pH: 9.4,
        totalHardness: 145,
        status: "Good"
      },
      {
        date: "2024-07-10",
        nitrite: 1780,
        chloride: 36,
        pH: 9.5,
        totalHardness: 143,
        status: "Good"
      },
      {
        date: "2024-07-12",
        nitrite: 1790,
        chloride: 34,
        pH: 9.4,
        totalHardness: 141,
        status: "Good"
      },
      {
        date: "2024-07-14",
        nitrite: 1800,
        chloride: 35,
        pH: 9.5,
        totalHardness: 140,
        status: "Good"
      }
    ]
  },
  "5": { // MV Arctic Breaker
    shipId: "5",
    shipName: "MV Arctic Breaker",
    fleetId: "3",
    history: [
      {
        date: "2024-07-01",
        nitrite: 2000,
        chloride: 40,
        pH: 9.8,
        totalHardness: 165,
        status: "Good"
      },
      {
        date: "2024-07-03",
        nitrite: 2100,
        chloride: 45,
        pH: 9.9,
        totalHardness: 168,
        status: "Good"
      },
      {
        date: "2024-07-05",
        nitrite: 2150,
        chloride: 52,
        pH: 10.0,
        totalHardness: 170,
        status: "Attention"
      },
      {
        date: "2024-07-07",
        nitrite: 2180,
        chloride: 58,
        pH: 10.2,
        totalHardness: 172,
        status: "Attention"
      },
      {
        date: "2024-07-10",
        nitrite: 2200,
        chloride: 62,
        pH: 10.3,
        totalHardness: 174,
        status: "Attention"
      },
      {
        date: "2024-07-12",
        nitrite: 2220,
        chloride: 64,
        pH: 10.4,
        totalHardness: 175,
        status: "Attention"
      },
      {
        date: "2024-07-14",
        nitrite: 2200,
        chloride: 65,
        pH: 10.5,
        totalHardness: 175,
        status: "Attention"
      }
    ]
  },
  "6": { // MV Indian Ocean
    shipId: "6",
    shipName: "MV Indian Ocean",
    fleetId: "4",
    history: [
      {
        date: "2024-07-01",
        nitrite: 1400,
        chloride: 38,
        pH: 8.8,
        totalHardness: 150,
        status: "Good"
      },
      {
        date: "2024-07-03",
        nitrite: 1450,
        chloride: 40,
        pH: 8.9,
        totalHardness: 152,
        status: "Good"
      },
      {
        date: "2024-07-05",
        nitrite: 1480,
        chloride: 41,
        pH: 9.0,
        totalHardness: 154,
        status: "Good"
      },
      {
        date: "2024-07-07",
        nitrite: 1490,
        chloride: 42,
        pH: 9.0,
        totalHardness: 155,
        status: "Good"
      },
      {
        date: "2024-07-10",
        nitrite: 1500,
        chloride: 43,
        pH: 9.0,
        totalHardness: 156,
        status: "Good"
      },
      {
        date: "2024-07-12",
        nitrite: 1500,
        chloride: 42,
        pH: 9.0,
        totalHardness: 155,
        status: "Good"
      },
      {
        date: "2024-07-14",
        nitrite: 1500,
        chloride: 42,
        pH: 9.0,
        totalHardness: 155,
        status: "Good"
      }
    ]
  }
}

// Companies data
export const companies = [
  {
    id: "comp-1",
    name: "Maritime Global Corp",
    type: "Shipping Company",
    headquarters: "Singapore",
    established: "1995",
    employees: 2500,
    description: "Leading international shipping and logistics company"
  },
  {
    id: "comp-2",
    name: "Ocean Tech Solutions",
    type: "Technical Services",
    headquarters: "Rotterdam",
    established: "2008",
    employees: 450,
    description: "Maritime technical services and water analysis specialists"
  },
  {
    id: "comp-3",
    name: "Atlantic Shipping Ltd",
    type: "Fleet Management",
    headquarters: "Hamburg",
    established: "1987",
    employees: 850,
    description: "European fleet management and ship operations"
  }
]

// Users data with roles
export const users = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@maritimeglobal.com",
    role: "Manager",
    companyId: "comp-1",
    avatar: "/placeholder-user.jpg",
    joinDate: "2022-03-15",
    status: "Active"
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah.johnson@maritimeglobal.com",
    role: "Shipowner",
    companyId: "comp-1",
    avatar: "/placeholder-user.jpg",
    joinDate: "2023-02-15",
    status: "Active"
  },
  {
    id: "user-3",
    name: "Mike Anderson",
    email: "mike.anderson@oceantech.com",
    role: "Technician",
    companyId: "comp-2",
    avatar: "/placeholder-user.jpg",
    joinDate: "2023-08-20",
    status: "Active"
  },
  {
    id: "user-4",
    name: "Hans Mueller",
    email: "hans.mueller@atlanticshipping.com",
    role: "Manager",
    companyId: "comp-3",
    avatar: "/placeholder-user.jpg",
    joinDate: "2022-08-25",
    status: "Active"
  },
  {
    id: "user-5",
    name: "Emma Thompson",
    email: "emma.thompson@oceantech.com",
    role: "Technician",
    companyId: "comp-2",
    avatar: "/placeholder-user.jpg",
    joinDate: "2023-11-10",
    status: "Active"
  },
  {
    id: "user-6",
    name: "Giuseppe Romano",
    email: "giuseppe.romano@maritimeglobal.com",
    role: "Shipowner",
    companyId: "comp-1",
    avatar: "/placeholder-user.jpg",
    joinDate: "2024-01-15",
    status: "Active"
  }
]

// Current user (this would normally come from authentication)
export const currentUser = users[0] // John Doe - Manager

// Helper functions
export const getUserById = (userId: string) => {
  return users.find(user => user.id === userId)
}

export const getCompanyById = (companyId: string) => {
  return companies.find(company => company.id === companyId)
}

export const getCurrentUserWithCompany = () => {
  const user = currentUser
  const company = getCompanyById(user.companyId)
  return { user, company }
}

export const getUsersByCompany = (companyId: string) => {
  return users.filter(user => user.companyId === companyId)
}

export const getUsersByRole = (role: string) => {
  return users.filter(user => user.role === role)
}

// Helper function to calculate fleet water analysis summary
export const getFleetWaterAnalysisSummary = (fleetId: string) => {
  const fleetShips = Object.values(waterAnalysisData).filter(data => data.fleetId === fleetId)
  
  if (fleetShips.length === 0) {
    return {
      totalShips: 0,
      goodCondition: 0,
      needsAttention: 0,
      critical: 0,
      averageAnalyses: {},
      totalAlerts: 0,
      overallStatus: "No Data"
    }
  }

  const statusCounts = {
    Good: fleetShips.filter(ship => ship.currentStatus === "Good").length,
    Attention: fleetShips.filter(ship => ship.currentStatus === "Attention").length,
    Critical: fleetShips.filter(ship => ship.currentStatus === "Critical").length
  }

  const totalAlerts = fleetShips.reduce((sum, ship) => sum + ship.alerts.length, 0)

  // Calculate average values
  const avgNitrite = fleetShips.reduce((sum, ship) => sum + ship.analyses.nitrite.value, 0) / fleetShips.length
  const avgChloride = fleetShips.reduce((sum, ship) => sum + ship.analyses.chloride.value, 0) / fleetShips.length
  const avgPH = fleetShips.reduce((sum, ship) => sum + ship.analyses.pH.value, 0) / fleetShips.length
  const avgHardness = fleetShips.reduce((sum, ship) => sum + ship.analyses.totalHardness.value, 0) / fleetShips.length

  let overallStatus = "Good"
  if (statusCounts.Critical > 0) overallStatus = "Critical"
  else if (statusCounts.Attention > 0) overallStatus = "Attention"

  return {
    totalShips: fleetShips.length,
    goodCondition: statusCounts.Good,
    needsAttention: statusCounts.Attention,
    critical: statusCounts.Critical,
    averageAnalyses: {
      nitrite: Math.round(avgNitrite),
      chloride: Math.round(avgChloride * 10) / 10,
      pH: Math.round(avgPH * 10) / 10,
      totalHardness: Math.round(avgHardness)
    },
    totalAlerts,
    overallStatus
  }
}

// Helper functions to work with fleet and ship relationships
export const getShipsByFleet = (fleetId: string) => {
  return ships.filter(ship => ship.fleetId === fleetId)
}

export const getFleetByShip = (shipId: string) => {
  const ship = ships.find(s => s.id === shipId)
  if (!ship) return null
  return fleets.find(f => f.id === ship.fleetId) || null
}

// Function to switch current user (for testing different roles)
export const switchCurrentUser = (userId: string) => {
  const user = getUserById(userId)
  if (user) {
    // In a real app, this would update authentication state
    // For now, we'll just export a reference
    return user
  }
  return currentUser
}

// Helper to get users by role for easy testing
export const testUsers = {
  manager: users.find(u => u.role === "Manager"),
  shipowner: users.find(u => u.role === "Shipowner"), 
  technician: users.find(u => u.role === "Technician")
}

// Helper function to get fleet historical data
export const getFleetHistoricalData = (fleetId: string) => {
  const fleetShips = Object.values(historicalWaterAnalysisData).filter(data => data.fleetId === fleetId)
  return fleetShips
}

// Helper function to get aggregated fleet trends
export const getFleetTrends = (fleetId: string) => {
  const fleetShips = getFleetHistoricalData(fleetId)
  
  if (fleetShips.length === 0) return []
  
  // Get all unique dates
  const allDates = [...new Set(fleetShips.flatMap(ship => ship.history.map(h => h.date)))].sort()
  
  // Calculate fleet averages for each date
  return allDates.map(date => {
    const shipDataForDate = fleetShips.map(ship => 
      ship.history.find(h => h.date === date)
    ).filter((data): data is NonNullable<typeof data> => data !== undefined)
    
    if (shipDataForDate.length === 0) return null
    
    const avgNitrite = shipDataForDate.reduce((sum, data) => sum + data.nitrite, 0) / shipDataForDate.length
    const avgChloride = shipDataForDate.reduce((sum, data) => sum + data.chloride, 0) / shipDataForDate.length
    const avgPH = shipDataForDate.reduce((sum, data) => sum + data.pH, 0) / shipDataForDate.length
    const avgHardness = shipDataForDate.reduce((sum, data) => sum + data.totalHardness, 0) / shipDataForDate.length
    
    const statusCounts = {
      Good: shipDataForDate.filter(d => d.status === "Good").length,
      Attention: shipDataForDate.filter(d => d.status === "Attention").length,
      Critical: shipDataForDate.filter(d => d.status === "Critical").length
    }
    
    let overallStatus = "Good"
    if (statusCounts.Critical > 0) overallStatus = "Critical"
    else if (statusCounts.Attention > 0) overallStatus = "Attention"
    
    return {
      date,
      nitrite: Math.round(avgNitrite),
      chloride: Math.round(avgChloride * 10) / 10,
      pH: Math.round(avgPH * 10) / 10,
      totalHardness: Math.round(avgHardness),
      overallStatus,
      shipCount: shipDataForDate.length
    }
  }).filter(Boolean)
}

// Helper function to get parameter trends for a specific ship
export const getShipParameterTrend = (shipId: string, parameter: string) => {
  const shipData = historicalWaterAnalysisData[shipId as keyof typeof historicalWaterAnalysisData]
  if (!shipData) return []
  
  return shipData.history.map(entry => ({
    date: entry.date,
    value: entry[parameter as keyof typeof entry] as number,
    status: entry.status
  })).filter(entry => entry.value !== undefined)
}
