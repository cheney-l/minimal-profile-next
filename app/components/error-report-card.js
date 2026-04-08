"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildErrorReport,
  formatErrorReport,
  readErrorReport,
  saveErrorReport
} from "../lib/error-report";

export default function ErrorReportCard({
  error,
  reset,
  scopeLabel
}) {
  const [copied, setCopied] = useState(false);
  const report = useMemo(
    () =>
      buildErrorReport({
        error,
        source: scopeLabel
      }),
    [error, scopeLabel]
  );

  useEffect(() => {
    saveErrorReport(report);
  }, [report]);

  const latestReport = readErrorReport() || report;
  const formattedReport = formatErrorReport(latestReport);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedReport);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{scopeLabel}</p>
        <h1 className="mt-2 text-xl font-semibold text-slate-800">页面暂时出了点问题</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {error?.message || "发生了未知错误。"}
        </p>
        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          <p>错误编号：{latestReport.id}</p>
          <p className="mt-1">时间：{latestReport.timestamp}</p>
          <p className="mt-1">把下面的错误信息复制给我，我就可以继续帮你修。</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] px-4 py-2 text-sm font-medium text-white"
          >
            重试
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            {copied ? "已复制错误信息" : "复制错误信息"}
          </button>
        </div>
        <pre className="mt-5 overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
          {formattedReport}
        </pre>
      </div>
    </main>
  );
}
