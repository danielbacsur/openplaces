import { Aside } from "./_components/aside";
import { Search } from "./_components/search";

export default function Page() {
  return (
    <main className="relative flex h-dvh w-dvw overflow-hidden bg-[rgb(232,234,237)]">
      <Aside />

      <div className="w-[408px] bg-white">
        <Search />
      </div>
    </main>
  );
}
