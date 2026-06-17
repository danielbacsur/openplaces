export function Filters() {
  return (
    <button className="absolute top-5 left-5 flex cursor-pointer items-center">
      <div className="flex h-8 items-center rounded-lg bg-white px-3 text-[#1f1f1f] shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)]">
        <span
          className="material-symbols-outlined mr-1 -ml-1 block"
          style={{ fontSize: "18px" }}
        >
          tune
        </span>
        <span className="font-sans text-[14px] font-medium leading-5 tracking-[0.1px]">
          All filters
        </span>
      </div>
    </button>
  );
}
