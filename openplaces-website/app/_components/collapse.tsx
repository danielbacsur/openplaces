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
        className="grid h-12 w-5.75 cursor-pointer place-items-center rounded-r-lg bg-[#f4fbfc] text-[#5e5e5e]"
      >
        <span className="material-symbols-outlined">
          {collapsed ? "keyboard_arrow_right" : "keyboard_arrow_left"}
        </span>
      </button>
    </div>
  );
}
