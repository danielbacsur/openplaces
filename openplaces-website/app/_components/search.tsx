export function Search({ query }: { query?: string }) {
  return (
    <form
      className="relative z-15 my-3 ml-4 box-border h-12 w-[376px] rounded-3xl border border-[#e3e3e3] bg-white py-[11px] pr-[106px] pl-6"
      spellCheck={false}
    >
      <input
        className="h-6 w-full bg-transparent font-sans text-[15px] leading-6 tracking-[0.1px] text-[#1f1f1f] outline-none placeholder:text-[#5e5e5e]"
        placeholder="Search OpenPlaces"
        autoComplete="off"
        value={query ?? ""}
        readOnly
      />

      <button className="absolute top-[calc(50%+1px)] right-[54px] -translate-y-1/2 cursor-pointer p-3 text-[#5e5e5e]">
        <span className="material-symbols-outlined block">search</span>
      </button>

      <button className="absolute top-[calc(50%+1px)] right-0 -translate-y-1/2 cursor-pointer px-[15px] py-3 text-[#5e5e5e]">
        <span className="material-symbols-outlined block">close</span>
      </button>
    </form>
  );
}
