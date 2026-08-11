import { getIcon } from "../lib/icons";

export default function PolicyLayout({ title, updated, sections }) {
  return (
    <div>
      <div className="bg-ink px-4 py-14 text-center text-white sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">HoodiesHome</p>
        <h1 className="font-display mt-3 text-3xl uppercase tracking-tight sm:text-4xl">{title}</h1>
        {updated && <p className="mt-2 text-xs text-zinc-500">Last updated: {updated}</p>}
      </div>

      <div className="mx-auto w-full max-w-[760px] px-4 py-12 sm:px-6">
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = getIcon(section.icon);
            return (
              <div key={section.title} className="rounded-card border border-line bg-white p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-ink">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">{section.title}</h2>
                </div>
                <div className="mt-3 pl-12 text-sm leading-relaxed text-zinc-600">
                  {section.body && <p>{section.body}</p>}
                  {section.list && (
                    <ul className="list-disc space-y-1.5 pl-5">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
