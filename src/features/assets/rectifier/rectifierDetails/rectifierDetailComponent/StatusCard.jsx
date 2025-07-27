
import React from "react";

const StatusCard = ({ icon: Icon, value, label, color = "blue" }) => (
  <div className="status-card-gen ">
    <div className="status-card-content-gen">
      <div className={`status-icon-gen ${color}`}>
        <Icon size={32} />
      </div>
      <div className="status-info-gen">
        <div className="status-value-gen">{value}</div>
        <div className="status-label-gen">{label}</div>
      </div>
    </div>
  </div>
);

export default StatusCard;
