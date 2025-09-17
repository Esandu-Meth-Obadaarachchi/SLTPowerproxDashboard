import React from "react";
import StatusCard from "../upsDetailComponent/StatusCard";
import {
  Info,
  MapPin,
  Calendar,
  Zap,
  Building,
  Tag,
  User,
  Clock,
} from "lucide-react";
import "../UPSDetails.css";

const UPSInfoTab = () => {
  return (
    <div className="ups-container">
      {/* Basic UPS Information Row */}
      <div className="ups-row">
        <div className="ups-row-header">
          <Info
            size={24}
            className="ups-row-icon"
            style={{ color: "#3B82F6" }}
          />
          <span className="ups-row-title" style={{ color: "#3B82F6" }}>
            Basic UPS Information
          </span>
        </div>

        <div className="ups-info-grid">
          <div className="ups-metric-card">
            <StatusCard
              icon={Tag}
              value="UPS-DC-001"
              label="UPS Name / ID"
              color="blue"
            />
          </div>

          <div className="ups-metric-card">
            <StatusCard
              icon={Building}
              value="Schneider APC"
              label="Manufacturer"
              color="green"
            />
          </div>

          <div className="ups-metric-card">
            <StatusCard
              icon={Zap}
              value="Smart-UPS 3000"
              label="Model"
              color="purple"
            />
          </div>

          <div className="ups-metric-card">
            <StatusCard
              icon={MapPin}
              value="Data Center - Floor 2"
              label="Location"
              color="orange"
            />
          </div>

          <div className="ups-metric-card">
            <StatusCard
              icon={Calendar}
              value="2022-03-15"
              label="Installation Date"
              color="cyan"
            />
          </div>

          <div className="ups-metric-card">
            <StatusCard
              icon={Zap}
              value="3000"
              label="Rated Capacity"
              color="yellow"
              unit="VA"
            />
          </div>

          <div className="ups-metric-card">
            <StatusCard
              icon={Zap}
              value="2700"
              label="Rated Power"
              color="indigo"
              unit="W"
            />
          </div>

          <div className="ups-metric-card">
            <StatusCard
              icon={User}
              value="Active"
              label="Operational Status"
              color="green"
            />
          </div>

          <div className="ups-metric-card">
            <StatusCard
              icon={Clock}
              value="24/7"
              label="Operating Mode"
              color="blue"
            />
          </div>

          <div className="ups-metric-card">
            <StatusCard
              icon={MapPin}
              value="Room A1-DC"
              label="Room Location"
              color="purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UPSInfoTab;
