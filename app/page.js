import { siteContent } from "./site-content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function withBasePath(path) {
  if (!path || !path.startsWith("/")) {
    return path;
  }

  return `${basePath}${path}`;
}

function normalizeHref(href) {
  if (!href) {
    return "#";
  }

  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  if (href.includes("@")) {
    return `mailto:${href}`;
  }

  return href;
}

function renderTextWithLinks(text) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const isUrl = (value) => /^https?:\/\/[^\s]+$/.test(value);

  return text.split("\n").map((line, lineIndex) => {
    const parts = line.split(urlPattern);

    return (
      <p
        key={`${line}-${lineIndex}`}
        className="text-[15px] leading-8 text-[var(--text-muted)] md:text-[17px] md:leading-9"
      >
        {parts.map((part, partIndex) => {
          if (isUrl(part)) {
            return (
              <a
                key={`${part}-${partIndex}`}
                href={part}
                target="_blank"
                rel="noreferrer"
                className="break-all text-[var(--primary)] underline decoration-[rgba(184,107,69,0.45)] underline-offset-4 transition hover:text-[var(--secondary)]"
              >
                {part}
              </a>
            );
          }

          return <span key={`${part}-${partIndex}`}>{part}</span>;
        })}
      </p>
    );
  });
}

export default function Home() {
  const { leftColumn, rightColumn } = siteContent;
  const hasAvatar = Boolean(leftColumn.avatar?.src);
  const avatarFallback = leftColumn.name?.trim()?.charAt(0) || leftColumn.avatar?.placeholder || "人";
  const sectionDelays = ["delay-1", "delay-2", "delay-3", "delay-4"];
  const contentSections = [
    {
      indexLabel: rightColumn.belief.indexLabel,
      title: rightColumn.belief.title,
      body: rightColumn.belief.quote,
      type: "text"
    },
    {
      indexLabel: rightColumn.coordinates.indexLabel,
      title: rightColumn.coordinates.title,
      lines: rightColumn.coordinates.lines,
      note: rightColumn.coordinates.note,
      type: "coordinates"
    },
    {
      indexLabel: rightColumn.intro.indexLabel,
      title: rightColumn.intro.title,
      body: rightColumn.intro.body,
      type: "text"
    },
    {
      indexLabel: rightColumn.lab.indexLabel,
      title: rightColumn.lab.title,
      body: rightColumn.lab.body,
      type: "text"
    }
  ];

  return (
    <main className="relative overflow-x-clip text-[var(--text-primary)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(63,44,28,0.05)_1px,transparent_1px)] bg-[size:clamp(72px,9vw,120px)_100%] opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(63,44,28,0.05)_1px,transparent_1px)] bg-[size:100%_clamp(72px,9vw,120px)] opacity-20" />
      <div className="pointer-events-none absolute left-[12%] top-16 h-48 w-48 rounded-full bg-[var(--accent-glow)] blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-[28%] h-72 w-72 rounded-full bg-[rgba(255,255,255,0.4)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--accent-glow)] blur-3xl" />

      <section className="relative border-b border-[color:var(--line)] px-5 py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
          <aside className="section-fade space-y-8 lg:sticky lg:top-10 lg:self-start lg:space-y-10">
            <div className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-[var(--text-soft)]">
              <span className="h-px w-10 bg-[var(--primary)]" />
              {leftColumn.city}
            </div>

            <div className="space-y-5">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[rgba(255,252,246,0.55)] text-[2rem] text-[var(--secondary)] shadow-[0_20px_40px_-28px_rgba(28,24,21,0.45)] backdrop-blur">
                <div className="absolute inset-[6px] rounded-full border border-[rgba(184,107,69,0.35)]" />
                {hasAvatar ? (
                  <img
                    src={withBasePath(leftColumn.avatar.src)}
                    alt={leftColumn.avatar.alt || "头像"}
                    className="relative z-10 h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span className="font-display relative z-10">{avatarFallback}</span>
                )}
              </div>

              <div className="max-w-sm space-y-3">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--text-soft)]">{siteContent.meta.description}</p>
                <h1 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.04] tracking-[-0.04em] text-[var(--secondary)]">
                  {leftColumn.name}
                </h1>
              </div>
            </div>

            <div className="section-fade delay-1 space-y-2 border-t border-[color:var(--line)] pt-6">
              {leftColumn.links.map((link) => {
                const resolvedHref = normalizeHref(link.href);

                return (
                  <a
                    key={link.label}
                    className="group flex items-center justify-between border-b border-[rgba(63,44,28,0.08)] py-3 text-sm text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--secondary)]"
                    href={resolvedHref}
                    target={resolvedHref.startsWith("http") ? "_blank" : undefined}
                    rel={resolvedHref.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <span>{link.label}</span>
                    <span className="text-base text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </a>
                );
              })}
            </div>

            <a
              href={leftColumn.cta.href}
              target="_blank"
              rel="noreferrer"
              className="section-fade delay-2 inline-flex min-h-12 w-full items-center justify-between border border-[color:var(--line-strong)] bg-[rgba(255,252,246,0.72)] px-5 py-3 text-sm font-semibold text-[var(--secondary)] shadow-[0_18px_32px_-28px_rgba(28,24,21,0.75)] transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--primary)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            >
              <span>{leftColumn.cta.label}</span>
              <span className="font-display text-lg text-[var(--primary)]">&rarr;</span>
            </a>

            <div className="section-fade delay-3 grid grid-cols-2 gap-4 border-t border-[color:var(--line)] pt-8 sm:grid-cols-2 md:max-w-[420px]">
              {leftColumn.qrItems.map((item) => (
                <div key={item.label} className="group space-y-3">
                  <div className="aspect-square overflow-hidden border border-[rgba(63,44,28,0.16)] bg-[rgba(255,252,246,0.8)] transition duration-300 group-hover:-translate-y-1 group-hover:border-[color:var(--primary)] group-hover:shadow-[0_18px_32px_-28px_rgba(28,24,21,0.7)]">
                    <div className="flex h-full items-center justify-center px-3 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--text-soft)]">
                      {item.src ? (
                        <img src={withBasePath(item.src)} alt={item.alt || item.label} className="h-full w-full object-cover bg-white" />
                      ) : (
                        item.label
                      )}
                    </div>
                  </div>
                  <p className="text-xs tracking-[0.18em] text-[var(--text-soft)]">{item.label}</p>
                </div>
              ))}
            </div>

          </aside>

          <div className="min-w-0 space-y-8 lg:space-y-10">
            {contentSections.map((section, index) => (
              <article
                key={section.indexLabel}
                className={`section-fade ${sectionDelays[index] || "delay-4"} grid gap-5 ${index === 0 ? "" : "border-t border-[color:var(--line)] pt-8 lg:pt-10"} lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-8`}
              >
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--text-soft)]">{section.indexLabel}</p>
                  <h2 className="font-display text-[clamp(1.55rem,2.6vw,2.35rem)] leading-[1.08] tracking-[-0.035em] text-[var(--secondary)]">
                    {section.title}
                  </h2>
                </div>

                <div className="max-w-3xl space-y-4">
                  {section.type === "coordinates" ? (
                    <>
                      <div className="space-y-2 text-[15px] leading-8 text-[var(--text-primary)] md:text-[17px] md:leading-9">
                        {section.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                      {section.note ? (
                        <p className="border-l border-[color:var(--line)] pl-5 text-[15px] leading-8 text-[var(--text-muted)] md:text-[17px] md:leading-9">
                          {section.note}
                        </p>
                      ) : null}
                    </>
                  ) : (
                    renderTextWithLinks(section.body)
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
