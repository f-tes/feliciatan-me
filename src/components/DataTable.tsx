import type { DataTable as T } from "@/data/research";

export function DataTable({ t }: { t: T }) {
  return (
    <div>
      <h3 className="mb-2 font-mono text-sm text-accent">{t.title}</h3>
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-surface">
              {t.columns.map((c, i) => (
                <th key={c} scope="col" className={`px-3 py-2 font-mono text-xs font-normal text-muted ${i > 0 ? "text-right" : ""}`}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r, ri) => {
              const hi = t.highlight?.includes(ri);
              return (
                <tr key={ri} className={`border-t border-line ${hi ? "bg-accent/10 text-fg" : "text-muted"}`}>
                  {r.map((c, ci) => (
                    <td key={ci} className={`px-3 py-2 ${ci > 0 ? "text-right font-mono tabular-nums" : ""} ${hi ? "font-medium text-accent" : ""}`}>{c}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {t.caption && <p className="mt-2 text-sm text-muted">{t.caption}</p>}
    </div>
  );
}
