// import React from "react";
// import Header from "../../components/generatorDashboard/Header";
// import NavigationBar from "../../components/generatorDashboard/NavigationBar";
// import AlarmsTable from "../../components/generatorDashboard/AlarmsTable";
// import Gauge from "../../components/generatorDashboard/Gauge";
// import StatusCard from "../../components/generatorDashboard/StatusCard";
// import FuelGauge from "../../components/generatorDashboard/FuelGauge";
// import BatteryStatus from "../../components/generatorDashboard/BatteryStatus";
// import MetricsCard from "../../components/generatorDashboard/MetricsCard";
// import NumberDisplay from "../../components/generatorDashboard/NumberDisplay";
// import GeneratorStatus from "../../components/generatorDashboard/GeneratorStatus";


// // Import icons from a compatible library
// import { Thermometer, Circle, Zap, Battery, Gauge as GaugeIcon } from "lucide-react";

// const GeneratorDashboard = () => {
//   // Sample data for alarms - matching the screenshot exactly
//   const alarms = [
//     {
//       id: 1,
//       time: "2023-03-27 10:30",
//       originator: "Gen_HOb_2",
//       type: "Overheating",
//       severity: "High",
//       status: "Active",
//       assignee: "Admin"
//     },
//     {
//       id: 2,
//       time: "2023-03-27 09:15",
//       originator: "Gen_DRI2",
//       type: "Disk Failure",
//       severity: "Critical",
//       status: "Acknowledged",
//       assignee: "Admin"
//     },
//     {
//       id: 3,
//       time: "2023-03-27 08:45",
//       originator: "Gen_WPHZ_3",
//       type: "Offline",
//       severity: "Medium",
//       status: "Resolved",
//       assignee: "Tech Team"
//     }
//   ];

//   // Voltage metrics matching the screenshot
//   const voltageMetrics = [
//     { label: "L1-L2", value: "220" },
//     { label: "L2-L3", value: "221" },
//     { label: "L3-L1", value: "219" },
//   ];

//   // Current metrics matching the screenshot
//   const currentMetrics = [
//     { label: "L1", value: "45.00" },
//     { label: "L2", value: "47.00" },
//     { label: "L3", value: "44.00" },
//   ];

//   return (
//     <div className="generator-dashboard">
//       {/* Header */}
//       <Header title="Generator Dashboard" currentGenerator="Dash_Gen_HOb2" />

//       {/* Navigation */}
//       <NavigationBar />

//       {/* Main Content */}
//       <div className="dashboard-content">
//         <div className="dashboard-grid">
//           {/* Left column */}
//           <div className="dashboard-column left-column">
//             <div className="column-content">
//               <GeneratorStatus status="Running" lastUpdate="1w ago" />
              
//               <StatusCard
//                 title="coolant Temperature"
//                 value="200"
//                 unit="°C"
//                 icon={<Thermometer size={32} className="temperature-icon" />}
//               />
              
//               <StatusCard
//                 title="oil pressure"
//                 value="300"
//                 unit="bar"
//                 icon={<div className="pressure-indicators">
//                   <Circle fill="#ff9500" size={8} />
//                   <Circle fill="#ff9500" size={8} />
//                   <Circle fill="#ff9500" size={8} />
//                 </div>}
//               />
              
//               <Gauge
//                 title="RPM"
//                 value={900}
//                 min={0}
//                 max={3000}
//                 unit=""
//                 color="#ff3b30"
//               />
//             </div>
//           </div>

//           {/* Middle column */}
//           <div className="dashboard-column middle-column">
//             <div className="column-content">
//               <div className="card-header">
//                 <div className="header-content">
//                   <div className="card-title">Recent Alarms</div>
//                 </div>
//               </div>
//               <AlarmsTable alarms={alarms} />
              
//               <div className="metrics-row">
//                 <div className="day-tank-card card-base">
//                   <div className="fuel-header">
//                     <div className="fuel-title">Day Tank Fuel Status</div>
//                   </div>
//                   <div className="fuel-content">
//                     <FuelGauge level={50} />
//                   </div>
//                 </div>
//                 <BatteryStatus voltage="12V" level={15} />
//               </div>
              
//               <div className="metrics-section">
//                 <div className="section-header">
//                   <div className="section-title">Voltage & Current Metrics</div>
//                 </div>
//                 <div className="metrics-row two-columns">
//                   <MetricsCard title="Line voltages (V)" metrics={voltageMetrics} />
//                   <MetricsCard title="Phase current (A)" metrics={currentMetrics} />
//                 </div>
//               </div>
              
//               <div className="metrics-row power-gauges three-columns">
//                 <Gauge title="kW" value={706} min={0} max={1800} unit="kW" color="#4cd964" />
//                 <Gauge title="kVA" value={751} min={0} max={1800} unit="kVA" color="#4cd964" />
//                 <Gauge title="kVAr" value={818} min={0} max={1800} unit="kVAr" color="#4cd964" />
//               </div>
//             </div>
//           </div>

//           {/* Right column - adding if needed */}
//           <div className="dashboard-column right-column">
//             <div className="column-content">
//               {/* Additional content can be added here */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GeneratorDashboard;