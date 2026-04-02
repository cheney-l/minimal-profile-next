import { siteContent } from "./site-content";

export default function Home() {
  const { leftColumn, rightColumn } = siteContent;
  const hasAvatar = Boolean(leftColumn.avatar?.src);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[radial-gradient(124%_84%_at_50%_26%,#FDF5FF_0%,#FFFFFF_56%,#FFFFFF_100%)] text-[var(--text-primary)]">
      <div className="pointer-events-none absolute left-1/2 top-[-132px] h-[320px] w-[78vw] max-w-[980px] -translate-x-1/2 bg-[radial-gradient(58%_70%_at_50%_14%,rgba(196,181,253,0.46),rgba(251,207,232,0.3)_46%,rgba(255,255,255,0)_76%)] blur-[56px]" />
      <div className="pointer-events-none absolute left-1/2 top-[34%] h-[360px] w-[70vw] max-w-[760px] -translate-x-[8%] bg-[radial-gradient(54%_62%_at_50%_50%,rgba(196,181,253,0.28),rgba(251,207,232,0.2)_48%,rgba(255,255,255,0)_74%)] blur-[52px]" />
      <div className="pointer-events-none absolute left-1/2 bottom-[-200px] h-[340px] w-[74vw] max-w-[920px] -translate-x-1/2 bg-[radial-gradient(56%_70%_at_50%_100%,rgba(251,207,232,0.28),rgba(196,181,253,0.32)_45%,rgba(255,255,255,0)_76%)] blur-[58px]" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-10 md:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:py-14">
        <aside className="lg:sticky lg:top-8 lg:h-fit">
          <div className="w-full max-w-[220px] space-y-6">
            <div className="flex h-[104px] w-[104px] items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F472B6] p-[2px] shadow-[0_12px_24px_-16px_rgba(139,92,246,0.65)]">
              <div className="flex h-full w-full items-center justify-center rounded-full border border-white/80 bg-[var(--bg-soft)] text-xs text-slate-400">
                {hasAvatar ? (
                  <img
                    src={leftColumn.avatar.src}
                    alt={leftColumn.avatar.alt || "头像"}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  leftColumn.avatar?.placeholder
                )}
              </div>
            </div>

            <div className="w-full space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">{leftColumn.name}</h2>
              <p className="text-sm text-[var(--text-muted)]">{leftColumn.city}</p>
            </div>

            <div className="w-full space-y-2 text-sm text-[var(--text-muted)]">
              {leftColumn.links.map((link) => (
                <a
                  key={link.label}
                  className="block hover:text-[var(--primary)]"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href={leftColumn.cta.href}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_32px_-16px_rgba(139,92,246,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_rgba(244,114,182,0.8)]"
            >
              {leftColumn.cta.label}
            </a>

            <div className="grid w-full grid-cols-2 gap-3 pt-4">
              {leftColumn.qrItems.map((item) => (
                <div key={item.label} className="aspect-square rounded-xl border border-dashed border-slate-300 bg-white/70 text-xs text-slate-400">
                  <div className="flex h-full items-center justify-center px-2 text-center">
                    {item.src ? (
                      <img src={item.src} alt={item.alt || item.label} className="h-full w-full rounded-[10px] object-contain bg-white p-1" />
                    ) : (
                      item.label
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="relative space-y-9 lg:pr-2">
          <div className="pointer-events-none absolute left-2 top-2 hidden h-[calc(100%-12px)] w-px bg-gradient-to-b from-[#E9DFFF] via-slate-200 to-transparent lg:block" />

          <header className="relative border-b border-slate-200 pb-9 lg:ml-auto lg:w-[88%] lg:max-w-[720px]">
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-400">{rightColumn.belief.indexLabel}</p>
            <h1 className="text-[26px] font-semibold tracking-tight text-[var(--secondary)] md:text-[30px]">{rightColumn.belief.title}</h1>
            <blockquote className="mt-5 max-w-3xl border-l-2 border-[var(--primary)] pl-4 text-[16px] leading-8 text-[var(--text-primary)]">
              {rightColumn.belief.quote}
            </blockquote>
          </header>

          <article className="relative rounded-2xl border border-[#E9DFFF] bg-gradient-to-br from-[#FFFFFF] via-[#FDF7FF] to-[#FFF5FB] px-6 py-6 shadow-[0_16px_44px_-32px_rgba(139,92,246,0.42)] lg:ml-auto lg:w-[88%] lg:max-w-[720px]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{rightColumn.coordinates.indexLabel}</p>
            <h3 className="mt-2 text-[21px] font-semibold tracking-tight text-[var(--secondary)]">{rightColumn.coordinates.title}</h3>
            <p className="mt-3 text-[15px] leading-8 text-[var(--text-primary)]">
              {rightColumn.coordinates.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-2 text-[14px] leading-7 text-[var(--text-muted)]">{rightColumn.coordinates.note}</p>
          </article>

          <article className="relative border-b border-slate-200 pb-9 lg:ml-auto lg:w-[88%] lg:max-w-[720px]">
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-400">{rightColumn.intro.indexLabel}</p>
            <h3 className="mb-3 text-[21px] font-semibold tracking-tight text-[var(--secondary)]">{rightColumn.intro.title}</h3>
            <p className="max-w-3xl text-[15px] leading-8 text-[var(--text-muted)]">{rightColumn.intro.body}</p>
          </article>

          <article className="relative min-h-[260px] rounded-2xl border border-slate-200 bg-white/85 px-7 py-7 shadow-[0_14px_40px_-30px_rgba(148,163,184,0.8)] lg:ml-auto lg:w-[88%] lg:max-w-[720px]">
            <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[#C4B5FD] to-transparent" />
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-400">{rightColumn.lab.indexLabel}</p>
            <h3 className="mb-3 text-[21px] font-semibold tracking-tight text-[var(--secondary)]">{rightColumn.lab.title}</h3>
            <p className="max-w-3xl text-[15px] leading-8 text-[var(--text-muted)]">{rightColumn.lab.body}</p>
          </article>
        </section>
      </div>
    </main>
  );
}
