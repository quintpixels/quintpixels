interface StatsCardProps {
  label: string;
  value: number | string;
  sub?: string;
  accent?: boolean;
}

export function StatsCard({ label, value, sub, accent }: StatsCardProps) {
  return (
    <div className="bg-black/3 border border-black/6 rounded-sm p-4 hover:bg-black/5 transition-colors">
      <div className="font-pixel text-[8px] tracking-[0.3em] text-[#0b0b0a]/50 uppercase mb-2">
        {label}
      </div>
      <div
        className={`font-pixel text-[28px] leading-none ${accent ? "text-[#0b0b0a]" : "text-[#0b0b0a]/85"}`}
      >
        {value}
      </div>
      {sub && (
        <div className="font-mono text-[9px] text-[#0b0b0a]/45 mt-1 uppercase tracking-wider">
          {sub}
        </div>
      )}
    </div>
  );
}
