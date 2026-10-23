"use client";

export function Collapse({
  collapsed = false,
  onClick,
}: {
  collapsed?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className="absolute top-1/2 left-0 -translate-y-1/2">
      <button
        onClick={onClick}
        className={`grid h-12 w-5.75 cursor-pointer place-items-center rounded-r-lg bg-[#f4fbfc] text-[#5e5e5e] ${collapsed ? "shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]" : ""}`}
      >
        <span className="material-symbols-outlined">
          {collapsed ? "keyboard_arrow_right" : "keyboard_arrow_left"}
        </span>
      </button>
    </div>
  );
}
