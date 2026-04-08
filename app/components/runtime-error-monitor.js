"use client";

import { useEffect } from "react";
import { buildErrorReport, saveErrorReport } from "../lib/error-report";

export default function RuntimeErrorMonitor() {
  useEffect(() => {
    const handleError = (event) => {
      saveErrorReport(
        buildErrorReport({
          error: event?.error || new Error(event?.message || "Window error"),
          source: "window-error",
          extra: {
            filename: event?.filename || "",
            lineno: event?.lineno || 0,
            colno: event?.colno || 0
          }
        })
      );
    };

    const handleRejection = (event) => {
      const reason = event?.reason;
      const error =
        reason instanceof Error
          ? reason
          : new Error(typeof reason === "string" ? reason : "Unhandled promise rejection");

      saveErrorReport(
        buildErrorReport({
          error,
          source: "unhandled-rejection",
          extra: {
            reason: typeof reason === "string" ? reason : String(reason)
          }
        })
      );
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}
