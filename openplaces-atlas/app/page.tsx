import { Aside } from "./_components/aside";
import { Checkbox } from "./_components/checkbox";
import { NoResults } from "./_components/no-results";
import { Search } from "./_components/search";
import { Separator } from "./_components/separator";

export default function Page() {
  return (
    <main className="relative flex h-dvh w-dvw overflow-hidden bg-[rgb(232,234,237)]">
      <Aside />

      <div className="flex w-[408px] flex-col bg-white">
        <Search />

        <NoResults />

        <div className="flex-1"></div>

        <Separator />

        <Checkbox />
      </div>
    </main>
  );
}
