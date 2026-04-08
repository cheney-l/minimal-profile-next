"use client";

import ErrorReportCard from "./components/error-report-card";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="zh-CN">
      <body className="m-0 bg-white font-sans">
        <ErrorReportCard error={error} reset={reset} scopeLabel="Global Error" />
      </body>
    </html>
  );
}
