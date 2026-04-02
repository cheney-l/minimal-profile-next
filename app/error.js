"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Error</p>
        <h1 className="mt-2 text-xl font-semibold text-slate-800">页面暂时出了点问题</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {error?.message || "发生了未知错误。"}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] px-4 py-2 text-sm font-medium text-white"
        >
          重新加载
        </button>
      </div>
    </main>
  );
}
