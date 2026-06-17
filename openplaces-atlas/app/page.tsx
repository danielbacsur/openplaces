"use client";

import { useState } from "react";

import { Aside } from "./_components/aside";
import { Checkbox } from "./_components/checkbox";
import { Collapse } from "./_components/collapse";
import { NoResults } from "./_components/no-results";
import { Search } from "./_components/search";
import { Separator } from "./_components/separator";

export default function Page() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <main className="relative flex h-dvh w-dvw overflow-hidden bg-[rgb(232,234,237)]">
      {!collapsed && <Aside />}

      {!collapsed && (
        <div className="flex w-[408px] flex-col bg-white">
          <Search />

          <NoResults />

          <div className="flex-1"></div>

          <Separator />

          <Checkbox />
        </div>
      )}

      <div className="relative flex-1 overflow-hidden">
        <Collapse
          collapsed={collapsed}
          onClick={() => setCollapsed((c) => !c)}
        />
      </div>
    </main>
  );
}
