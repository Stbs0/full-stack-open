import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../../types";
import MedicationTwoToneIcon from "@mui/icons-material/MedicationTwoTone";const HealthCheckEntries = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div style={{ border: "1px solid black" }}>
      <p>
        <strong>
          {entry.date} <MedicationTwoToneIcon />
          <br />
          <em>{entry.description} </em>
          <br />
          {check(entry)}
          <br />
        </strong>
      </p>
    </div>
  );

    function check(entry: HealthCheckEntry) {
      switch (entry.healthCheckRating) {
        case HealthCheckRating.Healthy:
          return "excellent";
        case HealthCheckRating.LowRisk:
          return "good";

        case HealthCheckRating.HighRisk:
          return "moderated";

        case HealthCheckRating.CriticalRisk:
          return "critical";
      }
    }
};

export default HealthCheckEntries;
