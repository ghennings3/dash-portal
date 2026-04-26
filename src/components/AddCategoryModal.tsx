"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, FolderPlus } from "lucide-react";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddCategoryModal({ isOpen, onClose, title, setTitle, onSubmit }: AddCategoryModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-zinc-950 border border-zinc-800 p-8 shadow-2xl rounded-3xl animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-8">
            <Dialog.Title className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
              Nova Categoria
            </Dialog.Title>
            <Dialog.Close className="p-2 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-zinc-900">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-1">Título da Categoria</label>
              <div className="relative">
                <FolderPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Trabalho, Entretenimento, Dev"
                  className="w-full h-14 pl-12 pr-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all text-sm"
                  autoFocus
                />
              </div>
            </div>

            <button className="w-full h-14 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]">
              Criar Categoria
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
