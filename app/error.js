"use client";

import ErrorReportCard from "./components/error-report-card";

export default function Error({ error, reset }) {
  return <ErrorReportCard error={error} reset={reset} scopeLabel="Page Error" />;
}
