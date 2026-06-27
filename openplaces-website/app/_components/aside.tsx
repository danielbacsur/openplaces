export function Aside() {
  return (
    <aside className="relative z-20 flex w-[72px] flex-col bg-[#f4fbfc] font-sans text-[#5e5e5e]">
      <button className="mt-4 flex h-9 w-full flex-col items-center justify-center">
        <span className="material-symbols-outlined -mb-1 flex h-10 w-10 items-center justify-center">
          menu
        </span>
      </button>

      <button className="mt-4 flex h-16 w-full flex-col items-center justify-center">
        <span className="material-symbols-outlined mt-2 mb-1 flex h-8 w-12 items-center justify-center">
          bookmark
        </span>
        <span className="mb-1 text-[12px] font-medium leading-4 tracking-[0.2px]">Saved</span>
      </button>

      <button
        disabled
        className="mt-4 flex h-16 w-full flex-col items-center justify-center opacity-[0.38]"
      >
        <span className="material-symbols-outlined mt-2 mb-1 flex h-8 w-12 items-center justify-center">
          history
        </span>
        <span className="mb-1 text-[12px] font-medium leading-4 tracking-[0.2px]">Recents</span>
      </button>

      <div className="mx-[14px] mt-2 mb-1 grow border-b border-[#e3e3e3]" />

      <button className="mb-4 flex h-14 w-full flex-col items-center justify-center">
        <span className="material-symbols-outlined mt-2 mb-1 flex h-6 w-full items-center justify-center">
          mobile
        </span>
        <span className="mb-1 text-[12px] font-medium leading-4 tracking-[0.2px]">Get app</span>
      </button>
    </aside>
  );
}
