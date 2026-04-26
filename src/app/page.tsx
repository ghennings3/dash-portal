"use client";

import { Clock } from "@/components/Clock";
import { SearchBox } from "@/components/SearchBox";
import { CategoryFilters } from "@/components/CategoryFilters";
import { SiteGrid } from "@/components/SiteGrid";
import { useSyncLayout } from "@/hooks/useSyncLayout";

export default function Home() {
  // Ativa a sincronização com o banco de dados
  useSyncLayout();

  return (
    <main className="flex min-h-screen flex-col items-center pt-20 pb-10">
      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* Top: Relógio */}
        <Clock />

        {/* Center: Barra de Busca */}
        <div className="w-full mt-2">
          <SearchBox />
        </div>

        {/* Bottom: Filtros e Futuro Grid */}
        <div className="w-full mt-2">
          <CategoryFilters />
          <SiteGrid />
        </div>
      </div>
    </main>
  );
}
