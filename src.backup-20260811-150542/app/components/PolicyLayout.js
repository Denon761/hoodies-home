export default function PolicyLayout({ title, updated, children }) {
  return (
    <div className="mx-auto w-full max-w-[820px] px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-ink">{title}</h1>
      {updated && <p className="mt-1 text-xs text-zinc-500">Last updated: {updated}</p>}
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-zinc-600 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}
