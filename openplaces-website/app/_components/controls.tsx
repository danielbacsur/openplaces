export interface ControlsProps {
  onLocate?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

export function Controls({ onLocate, onZoomIn, onZoomOut }: ControlsProps) {
  return (
    <div className="absolute right-5 bottom-5 flex flex-col items-center gap-[3px]">
      <button
        onClick={onLocate}
        className="grid size-[29px] cursor-pointer place-items-center overflow-hidden rounded-lg bg-white text-[#1f1f1f] shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)]"
      >
        <span
          className="material-symbols-outlined block translate-x-px"
          style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}
        >
          my_location
        </span>
      </button>

      <div className="relative flex w-[29px] flex-col overflow-hidden rounded-lg bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.3)]">
        <button
          onClick={onZoomIn}
          className="group grid size-[29px] cursor-pointer place-items-center"
        >
          <span
            className="block size-[15px] bg-no-repeat bg-position-[0px_0px] group-hover:bg-position-[-30px_0px]"
            style={{
              backgroundImage: "url(/icon-sprite-1x.png)",
              backgroundSize: "120px 30px",
            }}
          />
        </button>

        <button
          onClick={onZoomOut}
          className="group -mt-px grid size-[29px] cursor-pointer place-items-center"
        >
          <span
            className="block size-[15px] bg-no-repeat bg-position-[0px_-15px] group-hover:bg-position-[-30px_-15px]"
            style={{
              backgroundImage: "url(/icon-sprite-1x.png)",
              backgroundSize: "120px 30px",
            }}
          />
        </button>

        <div className="pointer-events-none absolute top-7 left-[5px] h-px w-[19px] bg-[#e3e3e3]" />
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

export function Layers() {
  return (
    <div
      className="absolute bottom-5 left-6 flex size-[79px] items-end overflow-hidden rounded-lg border-2 border-white bg-cover shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)]"
      style={{
        backgroundImage: "url(https://mt0.google.com/vt/lyrs=s&z=13&x=4529&y=2864)",
      }}
    >
      <div className="flex w-full items-center gap-1 bg-linear-to-t from-black/60 px-2 pt-3 pb-1.5 font-sans text-[12px] leading-4 font-medium text-white">
        <span
          className="material-symbols-outlined block"
          style={{ fontSize: "16px" }}
        >
          layers
        </span>
        Layers
      </div>
    </div>
  );
}
