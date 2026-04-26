"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Play, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type Provider = {
  name: string;
  url: string;
  placeholder: string;
  icon: React.ReactNode;
};

const providers: Provider[] = [
  {
    name: "Google",
    url: "https://www.google.com/search?q=",
    placeholder: "Pesquisar no Google...",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/results?search_query=",
    placeholder: "Pesquisar no YouTube...",
    icon: <Play className="w-4 h-4" />,
  },
  {
    name: "GitHub",
    url: "https://github.com/search?q=",
    placeholder: "Pesquisar no GitHub...",
    icon: <FaGithub className="w-4 h-4" />,
  },
];

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [providerIndex, setProviderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const provider = providers[providerIndex];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setProviderIndex((prev) => (prev + 1) % providers.length);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(`${provider.url}${encodeURIComponent(query)}`, "_blank");
      setQuery("");
    }
  };

  return (
    <div className="w-full max-w-3xl px-4 mx-auto flex flex-col items-center animate-in fade-in duration-1000">
      {/* Provider Pill */}
      <button 
        type="button"
        onClick={() => setProviderIndex((prev) => (prev + 1) % providers.length)}
        className="flex items-center gap-2 mb-4 px-3 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center justify-center text-emerald-500">
          {provider.icon}
        </div>
        <span className="text-xs font-medium text-zinc-300">{provider.name}</span>
      </button>

      <form
        onSubmit={handleSearch}
        className="relative flex items-center group w-full"
      >
        <div className="absolute left-6 text-zinc-500 group-focus-within:text-white transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pesquisar..."
          className="w-full h-14 pl-14 pr-14 bg-zinc-900/30 border border-zinc-800/80 rounded-full outline-none focus:border-zinc-600 focus:bg-zinc-900/60 transition-all text-base placeholder:text-zinc-500 text-zinc-200 shadow-inner"
          autoFocus
        />
        <button type="submit" className="absolute right-6 text-zinc-600 hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Helper text */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-zinc-600 font-medium">
        <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">Tab</kbd>
        <span>ou clique no provedor para trocar ·</span>
        <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">Enter</kbd>
        <span>para pesquisar</span>
      </div>
    </div>
  );
}
