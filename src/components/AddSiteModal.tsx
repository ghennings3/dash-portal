"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { X, Link as LinkIcon, Globe, Type } from "lucide-react";
import { useDashStore } from "@/store/useDashStore";

interface AddSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategoryId: string | null;
}

export function AddSiteModal({ isOpen, onClose, initialCategoryId }: AddSiteModalProps) {
  const categories = useDashStore((state) => state.categories);
  const addLink = useDashStore((state) => state.addLink);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialCategoryId) setCategoryId(initialCategoryId);
    else if (categories.length > 0) setCategoryId(categories[0].id);
  }, [initialCategoryId, categories]);

  const validateUrl = (string: string) => {
    try {
      new URL(string.startsWith("http") ? string : `https://${string}`);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("O nome é obrigatório");
      return;
    }

    if (!validateUrl(url)) {
      setError("URL inválida");
      return;
    }

    if (!categoryId) {
      setError("Selecione uma categoria");
      return;
    }

    const formattedUrl = url.startsWith("http") ? url.trim() : `https://${url.trim()}`;

    addLink(categoryId, {
      id: crypto.randomUUID(),
      name: name.trim(),
      url: formattedUrl,
    });

    setName("");
    setUrl("");
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-zinc-950 border border-zinc-800 p-8 shadow-2xl rounded-3xl animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-8">
            <Dialog.Title className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
              Adicionar Novo Site
            </Dialog.Title>
            <Dialog.Close className="p-2 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-zinc-900">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-1">Nome do Site</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: GitHub, ChatGPT"
                  className="w-full h-14 pl-12 pr-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all text-sm"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-1">Endereço (URL)</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="github.com"
                  className="w-full h-14 pl-12 pr-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-1">Categoria</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full h-14 px-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all text-sm appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 text-center animate-in slide-in-from-top-1">
                {error}
              </p>
            )}

            <button className="w-full h-14 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]">
              Adicionar à Dashboard
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
