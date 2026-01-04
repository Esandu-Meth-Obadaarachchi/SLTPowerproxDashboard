import * as XLSX from "xlsx";

export const exportYearlyReport = ({ type, locationName, data }) => {
  const workbook = XLSX.utils.book_new();
  let sheetData = [];

  if (type === "operational") {
    sheetData = data.map(d => ({
      Date: d.date,
      PUE: d.pue ?? 0,
      "Total Load (kW)": d.Total_load ?? 0
    }));
  }

  if (type === "tariff") {
    sheetData = data.map(d => ({
      Date: d.date,
      "Energy Consumption (kW)": d.Total_load ?? 0,
      "Tariff (LKR)": d.tariff ?? 0,
      "Carbon Emission (CO₂)": ((d.Total_load ?? 0) * 0.25).toFixed(2)
    }));
  }

  if (type === "live") {
    sheetData = data.map(d => ({
      Date: d.date,
      "IT Load (kW)": d.IT_load ?? 0,
      "AC Load (kW)": d.AC_load ?? 0,
      "Total Load (kW)": d.Total_load ?? 0
    }));
  }

  const worksheet = XLSX.utils.json_to_sheet(sheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Yearly Report");

  XLSX.writeFile(
    workbook,
    `Yearly_Report_${locationName.replace(/\s+/g, "_")}.xlsx`
  );
};