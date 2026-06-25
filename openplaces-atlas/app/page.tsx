"use client";

import { useState } from "react";

import { Aside } from "./_components/aside";
import { Checkbox } from "./_components/checkbox";
import { Collapse } from "./_components/collapse";
import { Controls } from "./_components/controls";
import { Filters } from "./_components/filters";
import { NoResults } from "./_components/no-results";
import { ResultCard } from "./_components/result-card";
import { Search } from "./_components/search";
import { places } from "./_data/places";

export default function Page() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <main className="relative flex h-dvh w-dvw overflow-hidden bg-[rgb(232,234,237)]">
      {!collapsed && <Aside />}

      {!collapsed && (
        <div className="relative z-10 flex w-[408px] flex-col bg-white shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)]">
          <Search />

          <div className="flex-1 divide-y divide-[#e3e3e3] overflow-y-auto">
            {places.length === 0 ? (
              <NoResults />
            ) : (
              places.map((place) => (
                <ResultCard key={place.name} place={place} />
              ))
            )}
          </div>

          <div className="border-t border-[#e3e3e3]">
            <Checkbox />
          </div>
        </div>
      )}

      <div className="relative flex-1 overflow-hidden">
        {!collapsed && <Filters />}

        <Collapse
          collapsed={collapsed}
          onClick={() => setCollapsed((c) => !c)}
        />

        <Controls />
      </div>
    </main>
  );
}
