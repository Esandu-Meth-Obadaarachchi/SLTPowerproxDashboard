import * as XLSX from "xlsx";

export const exportYearlyReport = ({ locationName, dailyData }) => {
  const workbook = XLSX.utils.book_new();

  const operationalSheet = XLSX.utils.json_to_sheet(
    dailyData.map(d => ({
      Date: d.date,
      PUE: d.pue,
      "Total Load (kW)": d.totalLoad
    }))
  );
  XLSX.utils.book_append_sheet(workbook, operationalSheet, "Operational Metrics");

  const tariffEmissionSheet = XLSX.utils.json_to_sheet(
    dailyData.map(d => ({
      Date: d.date,
      "Energy Consumption (kWh)": d.energyConsumption,
      "Carbon Emission (CO₂)": d.carbonEmission
    }))
  );
  XLSX.utils.book_append_sheet(workbook, tariffEmissionSheet, "Tariff & Emission");

  XLSX.writeFile(
    workbook,
    `Yearly_Daily_Report_${locationName.replace(/\s+/g, "_")}.xlsx`
  );
};
