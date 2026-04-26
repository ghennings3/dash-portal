"use client";

import { useState } from "react";
import { Filter, Plus } from "lucide-react";
import { AddSiteModal } from "./AddSiteModal";
import { AddCategoryModal } from "./AddCategoryModal";
import { useDashStore } from "@/store/useDashStore";

export function CategoryFilters() {
  const categories = useDashStore((state) => state.categories);
  const activeId = useDashStore((state) => state.activeCategoryId);
  const setActiveId = useDashStore((state) => state.setActiveCategoryId);
  const addCategory = useDashStore((state) => state.addCategory);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryTitle.trim()) {
      addCategory({
        id: crypto.randomUUID(),
        title: newCategoryTitle.trim(),
        links: [],
      });
      setNewCategoryTitle("");
      setIsCategoryModalOpen(false);
    }
  };

  if (categories.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto flex items-center justify-between px-4 mt-4 animate-in fade-in duration-700">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
        <Filter className="w-4 h-4 text-zinc-500 mr-2 flex-shrink-0" />
        <button
          onClick={() => setActiveId(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
            activeId === null
              ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] border border-white"
              : "bg-zinc-900/50 text-zinc-400 border border-zinc-800/80 hover:border-zinc-600 hover:text-zinc-200"
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveId(category.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeId === category.id
                ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] border border-white"
                : "bg-zinc-900/50 text-zinc-400 border border-zinc-800/80 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => setIsCategoryModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1.5 bg-zinc-900 text-zinc-300 rounded-full text-xs font-bold transition-all hover:bg-zinc-800 hover:text-white border border-zinc-800 shadow-[0_0_15px_rgba(0,0,0,0.5)] active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nova Categoria</span>
        </button>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-full text-xs font-bold transition-all hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Adicionar Site</span>
        </button>
      </div>

      <AddSiteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        initialCategoryId={activeId}
      />

      <AddCategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title={newCategoryTitle}
        setTitle={setNewCategoryTitle}
        onSubmit={handleAddCategory}
      />
    </div>
  );
}
