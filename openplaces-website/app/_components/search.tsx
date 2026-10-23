export function Search({ query }: { query?: string }) {
  return (
    <div className="relative mt-2 mb-4 ml-4 box-border flex h-12 w-[376px] shrink-0 items-center rounded-3xl border border-[#e3e3e3] bg-white py-[11px] pr-[106px] pl-6">
      <span className="truncate font-sans text-[15px] leading-6 tracking-[0.1px] text-[#1f1f1f]">
        {query || (
          <span className="text-[#5e5e5e]">Search OpenPlaces</span>
        )}
      </span>

      <span className="material-symbols-outlined absolute top-1/2 right-[54px] -translate-y-1/2 p-3 text-[#5e5e5e]">
        search
      </span>

      <span className="material-symbols-outlined absolute top-1/2 right-0 -translate-y-1/2 px-[15px] py-3 text-[#5e5e5e]">
        close
      </span>
    </div>
  );
}
