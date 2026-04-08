const STORAGE_KEY = "minimal-profile-last-error-report";

function safeStringify(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function buildErrorReport({ error, source = "runtime", extra = {} } = {}) {
  const timestamp = new Date().toISOString();
  const message =
    error?.message ||
    (typeof error === "string" ? error : "Unknown error");

  return {
    id: `${source}-${Date.now()}`,
    source,
    message,
    stack: error?.stack || "",
    url: typeof window !== "undefined" ? window.location.href : "",
    path: typeof window !== "undefined" ? window.location.pathname : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    timestamp,
    extra
  };
}

export function saveErrorReport(report) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, safeStringify(report));
}

export function readErrorReport() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {
      id: "parse-failed",
      source: "storage",
      message: raw,
      timestamp: new Date().toISOString()
    };
  }
}

export function formatErrorReport(report) {
  if (!report) {
    return "No error report captured.";
  }

  return [
    `Error ID: ${report.id || "unknown"}`,
    `Source: ${report.source || "unknown"}`,
    `Time: ${report.timestamp || "unknown"}`,
    `URL: ${report.url || "unknown"}`,
    `Path: ${report.path || "unknown"}`,
    `Message: ${report.message || "unknown"}`,
    `Stack: ${report.stack || "n/a"}`,
    `User Agent: ${report.userAgent || "unknown"}`,
    `Extra: ${safeStringify(report.extra || {})}`
  ].join("\n");
}
