"use client";

import { useEffect, useRef, useState } from "react";

import { Aside } from "./_components/aside";
import { Checkbox } from "./_components/checkbox";
import { Canvas, type CanvasHandle } from "./_components/canvas";
import { Collapse } from "./_components/collapse";
import { Controls, Layers } from "./_components/controls";
import { Filters } from "./_components/filters";
import { NoResults } from "./_components/no-results";
import { ResultCard } from "./_components/result-card";
import { Search } from "./_components/search";
import { useAtlas } from "./_hooks/use-atlas";

export default function Page() {
  const [collapsed, setCollapsed] = useState(false);
  const canvasRef = useRef<CanvasHandle | null>(null);

  const { query, places } = useAtlas();

  useEffect(() => canvasRef.current?.setMarkers(places), [places]);

  return (
    <main className="relative flex h-dvh w-dvw overflow-hidden bg-[rgb(232,234,237)]">
      <Canvas ref={canvasRef} />

      {!collapsed && (
        <div className="relative z-10 flex w-[488px] rounded-r-[32px] bg-[#f4fbfc]">
          <Aside />

          <div className="my-2 mr-2 flex w-[408px] flex-col overflow-hidden rounded-3xl bg-white">
            <Search query={query ?? undefined} />

            <div className="flex-1 overflow-y-auto">
              {places.length === 0 ? (
                <NoResults />
              ) : (
                <>
                  <div className="flex h-12 items-center gap-1 px-6 pb-1 text-[#1f1f1f]">
                    <span className="font-sans text-[20px] leading-6">
                      Results
                    </span>
                    <span
                      className="material-symbols-outlined text-[#5e5e5e]"
                      style={{ fontSize: "18px" }}
                    >
                      info
                    </span>
                  </div>

                  <div className="divide-y divide-[#e3e3e3]">
                    {places.map((place) => (
                      <ResultCard key={place.id} place={place} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-[#e3e3e3]">
              <Checkbox />
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none relative flex-1 *:pointer-events-auto">
        {!collapsed && <Filters />}

        <Collapse
          collapsed={collapsed}
          onClick={() => setCollapsed((c) => !c)}
        />

        <Controls
          onLocate={() => canvasRef.current?.locate()}
          onZoomIn={() => canvasRef.current?.zoomIn()}
          onZoomOut={() => canvasRef.current?.zoomOut()}
        />

        <Layers />
      </div>
    </main>
  );
}
