import React from "react";
import { useNavigate } from "react-router-dom";
import { Plug, AlertTriangle } from "lucide-react";

const UPSSystems = () => {
  const navigate = useNavigate();

  const upsData = [
    {
      id: "UPS-01",
      model: "Galaxy 7000",
      location: "HQ Data Center",
      load: 85,
      status: "Normal",
    },
    {
      id: "UPS-02",
      model: "Galaxy 7000",
      location: "HQ Data Center",
      load: 92,
      status: "Warning",
    },
    {
      id: "UPS-03",
      model: "Galaxy 7000",
      location: "East Data Center",
      load: 0,
      status: "Critical",
      issue: "Battery Failure",
    },
    {
      id: "UPS-04",
      model: "Galaxy 5000",
      location: "East Data Center",
      load: 65,
      status: "Normal",
    },
    {
      id: "UPS-05",
      model: "Galaxy 5000",
      location: "West Data Center",
      load: 72,
      status: "Normal",
    },
  ];

  const handleUPSClick = (upsId) => {
    navigate(`/app/ups/${upsId}`);
  };

  return (
    <div className="ups-units-list-section">
      <h3 className="ups-section-title">UPS Systems</h3>
      <div className="ups-units-list">
        {upsData.map((unit) => (
          <div
            key={unit.id}
            className={`unit-item ${unit.status.toLowerCase()}`}
            onClick={() => handleUPSClick(unit.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="unit-info">
              <h4>
                {unit.id} ({unit.model})
              </h4>
              <p>
                {unit.location} – {unit.load}% Load – {unit.status}
                {unit.issue ? ` (${unit.issue})` : ""}
              </p>
            </div>
            <div className={`unit-status ${unit.status.toLowerCase()}`}>
              {unit.status === "Normal" ? (
                <Plug size={16} />
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

export default UPSSystems;
