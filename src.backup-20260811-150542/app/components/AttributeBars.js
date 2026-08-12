export default function AttributeBars({ ratings, max = 5 }) {
  const entries = Object.entries(ratings || {});

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
      {entries.map(([key, value]) => (
        <div key={key} className="flex items-center gap-1.5">
          <span className="w-16 text-[11px] capitalize text-zinc-500">{key}</span>
          <span className="flex gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-3 rounded-full ${i < value ? "bg-primary" : "bg-line"}`}
              />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
