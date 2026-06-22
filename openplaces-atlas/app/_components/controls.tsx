export function Controls() {
  return (
    <div className="absolute right-5 bottom-5 flex flex-col items-center gap-[3px]">
      <button className="grid size-[29px] place-items-center overflow-hidden rounded-lg bg-white text-[#1f1f1f] shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)]">
        <span
          className="material-symbols-outlined block"
          style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}
        >
          my_location
        </span>
      </button>

      <div className="flex w-[29px] flex-col overflow-hidden rounded-lg bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.3)]">
        <button className="group grid h-7 cursor-pointer place-items-center">
          <span
            className="block size-[15px] bg-no-repeat bg-position-[0px_0px] group-hover:bg-position-[-30px_0px]"
            style={{
              backgroundImage: "url(/icon-sprite-1x.png)",
              backgroundSize: "120px 30px",
            }}
          />
        </button>

        <div className="h-px bg-[#e3e3e3]" />

        <button className="group grid h-7 cursor-pointer place-items-center">
          <span
            className="block size-[15px] bg-no-repeat bg-position-[0px_-15px] group-hover:bg-position-[-30px_-15px]"
            style={{
              backgroundImage: "url(/icon-sprite-1x.png)",
              backgroundSize: "120px 30px",
            }}
          />
        </button>
      </div>

      <button className="h-[30px] w-[29px] overflow-hidden rounded-lg bg-white shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)]">
        <div
          className="h-[30px] w-[29px] cursor-grab bg-no-repeat bg-position-[0px_-31px] hover:bg-position-[0px_-91px]"
          style={{
            backgroundImage: "url(/runway-1x.png)",
            backgroundSize: "28px 120px",
          }}
        />
      </button>
    </div>
  );
}
