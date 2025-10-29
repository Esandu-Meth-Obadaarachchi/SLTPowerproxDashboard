

// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import "./CanteensPage.css";

// // Mock data for each canteen
// const mockData = {
//   "Rajabojun Canteen": {
//     chart: [
//       { time: "10:00", Voltage: 229, Current: 14, ActivePower: 3.1, ReactivePower: 1.0, ApparentPower: 3.3, PowerFactor: 0.95, Frequency: 50, TotalEnergy: 1200, TotalReactiveEnergy: 450 },
//       { time: "11:00", Voltage: 231, Current: 15, ActivePower: 3.2, ReactivePower: 1.1, ApparentPower: 3.4, PowerFactor: 0.96, Frequency: 50.1, TotalEnergy: 1210, TotalReactiveEnergy: 455 },
//       { time: "12:00", Voltage: 230, Current: 16, ActivePower: 3.3, ReactivePower: 1.2, ApparentPower: 3.5, PowerFactor: 0.95, Frequency: 50, TotalEnergy: 1220, TotalReactiveEnergy: 460 },
//       { time: "13:00", Voltage: 228, Current: 14, ActivePower: 3.1, ReactivePower: 1.0, ApparentPower: 3.3, PowerFactor: 0.94, Frequency: 49.9, TotalEnergy: 1230, TotalReactiveEnergy: 465 },
//     ],
//   },
//   "Fruit Juice Bar": {
//     chart: [
//       { time: "10:00", Voltage: 227, Current: 9, ActivePower: 2.0, ReactivePower: 0.8, ApparentPower: 2.2, PowerFactor: 0.92, Frequency: 50, TotalEnergy: 980, TotalReactiveEnergy: 380 },
//       { time: "11:00", Voltage: 229, Current: 10, ActivePower: 2.1, ReactivePower: 0.8, ApparentPower: 2.3, PowerFactor: 0.92, Frequency: 50, TotalEnergy: 985, TotalReactiveEnergy: 382 },
//       { time: "12:00", Voltage: 228, Current: 11, ActivePower: 2.2, ReactivePower: 0.9, ApparentPower: 2.4, PowerFactor: 0.93, Frequency: 50, TotalEnergy: 990, TotalReactiveEnergy: 384 },
//       { time: "13:00", Voltage: 226, Current: 9, ActivePower: 2.0, ReactivePower: 0.8, ApparentPower: 2.2, PowerFactor: 0.91, Frequency: 49.9, TotalEnergy: 995, TotalReactiveEnergy: 386 },
//     ],
//   },
//   "1st Floor": {
//     chart: [
//       { time: "10:00", Voltage: 231, Current: 17, ActivePower: 4.4, ReactivePower: 1.5, ApparentPower: 4.7, PowerFactor: 0.93, Frequency: 50, TotalEnergy: 1500, TotalReactiveEnergy: 500 },
//       { time: "11:00", Voltage: 233, Current: 18, ActivePower: 4.5, ReactivePower: 1.6, ApparentPower: 4.8, PowerFactor: 0.94, Frequency: 50, TotalEnergy: 1505, TotalReactiveEnergy: 505 },
//       { time: "12:00", Voltage: 232, Current: 19, ActivePower: 4.6, ReactivePower: 1.7, ApparentPower: 4.9, PowerFactor: 0.94, Frequency: 50.1, TotalEnergy: 1510, TotalReactiveEnergy: 510 },
//       { time: "13:00", Voltage: 230, Current: 18, ActivePower: 4.5, ReactivePower: 1.6, ApparentPower: 4.8, PowerFactor: 0.93, Frequency: 50, TotalEnergy: 1515, TotalReactiveEnergy: 515 },
//     ],
//   },
//   "2nd Floor": {
//     chart: [
//       { time: "10:00", Voltage: 228, Current: 11, ActivePower: 2.7, ReactivePower: 0.9, ApparentPower: 3.0, PowerFactor: 0.94, Frequency: 50, TotalEnergy: 1100, TotalReactiveEnergy: 420 },
//       { time: "11:00", Voltage: 230, Current: 12, ActivePower: 2.8, ReactivePower: 0.9, ApparentPower: 3.1, PowerFactor: 0.94, Frequency: 50, TotalEnergy: 1105, TotalReactiveEnergy: 422 },
//       { time: "12:00", Voltage: 229, Current: 13, ActivePower: 2.9, ReactivePower: 1.0, ApparentPower: 3.2, PowerFactor: 0.95, Frequency: 50.1, TotalEnergy: 1110, TotalReactiveEnergy: 424 },
//       { time: "13:00", Voltage: 227, Current: 12, ActivePower: 2.8, ReactivePower: 0.9, ApparentPower: 3.0, PowerFactor: 0.94, Frequency: 50, TotalEnergy: 1115, TotalReactiveEnergy: 426 },
//     ],
//   },
// };

// // Chart card component
// const ChartCard = ({ title, data, dataKey, color }) => (
//   <div className="chart-card">
//     <h4>{title}</h4>
//     <ResponsiveContainer width="100%" height={150}>
//       <LineChart data={data}>
//         <CartesianGrid stroke="#333" strokeDasharray="3 3" />
//         <XAxis dataKey="time" stroke="#aaa" />
//         <YAxis stroke="#aaa" />
//         <Tooltip />
//         <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 3 }} />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// );

// const CanteensPage = () => {
//   const [activeTab, setActiveTab] = useState("Rajabojun Canteen");
//   const data = mockData[activeTab].chart;

//   const parameters = [
//     { key: "Voltage", color: "#00e676" },
//     { key: "Current", color: "#ffd54f" },
//     { key: "ActivePower", color: "#00bcd4" },
//     { key: "ReactivePower", color: "#ff9800" },
//     { key: "ApparentPower", color: "#9c27b0" },
//     { key: "PowerFactor", color: "#ff5722" },
//     { key: "Frequency", color: "#03a9f4" },
//     { key: "TotalEnergy", color: "#cddc39" },
//     { key: "TotalReactiveEnergy", color: "#e91e63" },
//   ];

//   return (
//     <div className="dashboard-page">
//       {/* Tabs */}
//       <div className="tabs">
//         {Object.keys(mockData).map((canteen) => (
//           <button
//             key={canteen}
//             className={`tab-button ${activeTab === canteen ? "active-tab" : ""}`}
//             onClick={() => setActiveTab(canteen)}
//           >
//             {canteen}
//           </button>
//         ))}
//       </div>

//       {/* Page Header */}
//       <div className="page-header">
//         <h1 className="page-title">{activeTab}</h1>
//         <p className="page-subtitle">Monitoring key electrical parameters</p>
//       </div>

//       {/* Charts Grid */}
//       <div className="charts-grid">
//         {parameters.map((param) => (
//           <ChartCard
//             key={param.key}
//             title={param.key}
//             data={data}
//             dataKey={param.key}
//             color={param.color}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CanteensPage;


import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./CanteensPage.css";
import { MapPin, AlertTriangle, Zap, Activity } from 'lucide-react';


const ChartCard = ({ title, data, dataKey, color }) => (
  <div className="chart-card">
    <h4>{title}</h4>
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data}>
        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
        <XAxis dataKey="time" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const CanteensPage = () => {
  const [canteensData, setCanteensData] = useState({});
  const [activeTab, setActiveTab] = useState("");

  const parameters = [
    { key: "Voltage", color: "#00e676" },
    { key: "Current", color: "#ffd54f" },
    { key: "ActivePower", color: "#00bcd4" },
    { key: "ReactivePower", color: "#ff9800" },
    { key: "ApparentPower", color: "#9c27b0" },
    { key: "PowerFactor", color: "#ff5722" },
    { key: "Frequency", color: "#03a9f4" },
    { key: "TotalEnergy", color: "#cddc39" },
    { key: "TotalReactiveEnergy", color: "#e91e63" },
  ];

  // Fetch data from FastAPI backend
  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        const response = await fetch("http://localhost:8000/canteens");
        const data = await response.json();
        setCanteensData(data);
        const firstCanteen = Object.keys(data)[0];
        setActiveTab(firstCanteen);
      } catch (error) {
        console.error("Error fetching canteens:", error);
      }
    };

    fetchCanteens();
  }, []);

  if (!activeTab || !canteensData[activeTab]) return <p>Loading...</p>;

  const data = canteensData[activeTab].chart;

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Canteens Dashboard</h1>
        <p className="page-subtitle">Monitoring Electrical Power Data From Canteens</p>
      </div>

            {/* Canteens Overview Summary */}
      <div className="overview-grid mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="overview-card">
          <Zap size={24} className="text-blue-400" />
          <div>
            <h4>Total Canteens</h4>
            <p>4</p> {/* Example static value */}
          </div>
        </div>
        <div className="overview-card">
          <Activity size={24} className="text-green-400" />
          <div>
            <h4>Total Energy</h4>
            <p>12,450 kWh</p> {/* Example static value */}
          </div>
        </div>
        <div className="overview-card">
          <Activity size={24} className="text-green-400" />
          <div>
            <h4>Total Reactive Energy</h4>
            <p>3,210 kvarh</p> {/* Example static value */}
          </div>
        </div>
      </div>


      {/* Tabs */}
      <div className="tabs">
        {Object.keys(canteensData).map((canteen) => (
          <button
            key={canteen}
            className={`tab-button ${activeTab === canteen ? "active-tab" : ""}`}
            onClick={() => setActiveTab(canteen)}
          >
            {canteen}
          </button>
        ))}
      </div>

      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">{activeTab}</h1>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {parameters.map((param) => (
          <ChartCard
            key={param.key}
            title={param.key}
            data={data}
            dataKey={param.key}
            color={param.color}
          />
        ))}
      </div>
    </div>
  );
};

export default CanteensPage;
