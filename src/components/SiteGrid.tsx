"use client";

import { useDashStore } from "@/store/useDashStore";
import { SiteCard } from "./SiteCard";
import { Plus, Trash2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import { AddSiteModal } from "./AddSiteModal";

import { AddCategoryModal } from "./AddCategoryModal";

export function SiteGrid() {
  const categories = useDashStore((state) => state.categories);
  const activeCategoryId = useDashStore((state) => state.activeCategoryId);
  const removeLink = useDashStore((state) => state.removeLink);
  const removeCategory = useDashStore((state) => state.removeCategory);
  const reorderLinks = useDashStore((state) => state.reorderLinks);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [targetCategoryId, setTargetCategoryId] = useState<string | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const addCategory = useDashStore((state) => state.addCategory);

  const filteredCategories = activeCategoryId
    ? categories.filter((c) => c.id === activeCategoryId)
    : categories;

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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const categoryId = source.droppableId;
    const category = categories.find((c) => c.id === categoryId);
    
    if (!category) return;

    const newLinks = Array.from(category.links);
    const [removed] = newLinks.splice(source.index, 1);
    newLinks.splice(destination.index, 0, removed);

    reorderLinks(categoryId, newLinks);
  };

  const handleOpenAddModal = (catId: string) => {
    setTargetCategoryId(catId);
    setIsAddModalOpen(true);
  };

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 text-zinc-600 animate-in fade-in duration-1000">
        <p className="text-sm font-medium mb-6 text-zinc-500">Sua dashboard está vazia.</p>
        <button 
          onClick={() => setIsCategoryModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-500 hover:text-white transition-all text-xs font-bold uppercase tracking-[0.2em]"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Primeira Categoria</span>
        </button>

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

  const allLinks = categories.flatMap((c) => c.links);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-8 py-4 animate-in fade-in duration-1000">
      {!activeCategoryId ? (
        <div className="flex flex-wrap gap-4 sm:gap-8 justify-center sm:justify-start">
          {allLinks.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-800/50 rounded-3xl bg-zinc-900/10 mt-8">
              <p className="text-zinc-500 text-sm mb-6 text-center max-w-sm">
                Nenhum site cadastrado. Comece adicionando seus sites favoritos para montar o seu portal perfeito.
              </p>
            </div>
          )}
          {allLinks.map((link) => (
            <SiteCard
              key={link.id}
              link={link}
              onRemove={() => removeLink(link.id)}
            />
          ))}
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          {filteredCategories.map((category) => (
            <section key={category.id} className="group/section">
              <div className="flex items-center gap-8 mb-10">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 whitespace-nowrap">
                  {category.title}
                </h2>
                <div className="h-[1px] w-full bg-zinc-900" />
                <button
                  onClick={() => removeCategory(category.id)}
                  className="opacity-0 group-hover/section:opacity-100 p-2 text-zinc-700 hover:text-red-500 transition-all active:scale-95"
                  title="Excluir Categoria"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <Droppable droppableId={category.id} direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-wrap gap-4 sm:gap-8 justify-center sm:justify-start mb-8"
                  >
                    {category.links.length === 0 && (
                      <div className="w-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-800/50 rounded-3xl bg-zinc-900/10 mb-4">
                        <p className="text-zinc-500 text-sm mb-6 text-center max-w-sm">
                          Esta categoria está vazia.
                        </p>
                        <button
                          onClick={() => handleOpenAddModal(category.id)}
                          className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-xl hover:bg-zinc-200 transition-all text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar Primeiro Site</span>
                        </button>
                      </div>
                    )}

                    {category.links.length > 0 && (
                      <>
                        {category.links.map((link, index) => (
                          <Draggable key={link.id} draggableId={link.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="outline-none"
                              >
                                <SiteCard
                                  link={link}
                                  onRemove={() => removeLink(link.id)}
                                  isDragging={snapshot.isDragging}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}

                        <button
                          onClick={() => handleOpenAddModal(category.id)}
                          className="group relative flex flex-col items-center gap-3 w-20 sm:w-24 transition-all duration-300"
                        >
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-transparent border border-dashed border-zinc-700/50 rounded-3xl transition-all duration-300 group-hover:bg-zinc-900/50 group-hover:border-zinc-500">
                            <Plus className="w-6 h-6 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                          </div>
                          <span className="text-xs font-semibold text-zinc-600 group-hover:text-zinc-400 transition-colors">
                            Add Site
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </section>
          ))}
        </DragDropContext>
      )}



      <AddSiteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        initialCategoryId={targetCategoryId}
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
