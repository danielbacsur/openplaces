export function Checkbox() {
  return (
    <div className="my-1.5 ml-[18px] h-6 w-[390px] text-left font-sans text-[14px] leading-5 tracking-[0.1px]">
      <button className="flex h-6 cursor-pointer flex-row items-center text-[#5e5e5e]">
        <span className="mr-2.5 size-6 material-symbols-outlined">
          check_box_outline_blank
        </span>
        Update results when map moves
      </button>
    </div>
  );
}
