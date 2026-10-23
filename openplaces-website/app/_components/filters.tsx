function Chip({
  icon,
  label,
  fill = false,
  dropdown = false,
}: {
  icon: string;
  label: string;
  fill?: boolean;
  dropdown?: boolean;
}) {
  return (
    <div
      className={`flex h-8 items-center rounded-lg bg-white pl-3 text-[#1f1f1f] shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] ${dropdown ? "pr-1" : "pr-3"}`}
    >
      <span
        className="material-symbols-outlined mr-1 -ml-1 block"
        style={{
          fontSize: "18px",
          fontVariationSettings: fill ? "'FILL' 1" : undefined,
        }}
      >
        {icon}
      </span>
      <span className="font-sans text-[14px] font-medium leading-5 tracking-[0.1px]">
        {label}
      </span>
      {dropdown && (
        <span className="material-symbols-outlined block">arrow_drop_down</span>
      )}
    </div>
  );
}

export function Filters() {
  return (
    <div className="absolute top-[21px] left-[21px] flex gap-1.5">
      <Chip icon="star" label="Rating" fill dropdown />
      <Chip icon="schedule" label="Hours" dropdown />
      <Chip icon="tune" label="All filters" />
    </div>
  );
}
