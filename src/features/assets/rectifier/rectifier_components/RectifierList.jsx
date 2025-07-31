import React from "react";
import { useNavigate } from "react-router-dom";
import { BatteryCharging, AlertTriangle } from "lucide-react";
import "./RectifierList.css";
import rectifiers from "./rectifiersdetailsdoc.js"; // your rectifier array

const RectifierList = ({ onRectifierClick }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (onRectifierClick) {
      onRectifierClick(id);
    } else {
      navigate(`/app/rectifier/${id}`); // Navigate to details page
    }
  };

  return (
    <div className="rectifier-units-list-section">
      <h3 className="section-title">Rectifier Systems</h3>
      <div className="units-list">
        {rectifiers.map((unit) => (
          <div
            key={unit.id}
            className={`unit-item ${unit.status.toLowerCase()}`}
            onClick={() => handleClick(unit.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="unit-info">
              <h4>{unit.id}</h4>
              <p>
                {unit.location} – {unit.voltage}V / {unit.current}A –{" "}
                {unit.status}
                {unit.issue ? ` (${unit.issue})` : ""}
              </p>
            </div>
            <div className={`unit-status ${unit.status.toLowerCase()}`}>
              {unit.status === "Normal" ? (
                <BatteryCharging size={16} />
              ) : (
                <AlertTriangle size={16} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RectifierList;
