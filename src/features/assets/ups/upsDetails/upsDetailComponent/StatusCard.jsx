import React from "react";
import "./StatusCard.css";

const StatusCard = ({
  icon: Icon,
  value,
  label,
  color = "blue",
  className = "",
  onClick,
  ...props
}) => {
  return (
    <div
      className={`status-card-gen ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      <div className="status-card-content-gen stacked-layout">
        <div className="icon-label-row">
          <div className={`status-icon-gen ${color}`}>
            <Icon size={40} />
          </div>
          <div className="status-label-small">{label}</div>
        </div>
        <div className="status-value-gen big-value">{value}</div>
      </div>
    </div>
  );
};

export default StatusCard;
