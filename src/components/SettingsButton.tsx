"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { SettingsModal } from "./SettingsModal";

export function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-8 left-8 flex items-center justify-center w-10 h-10 bg-zinc-900/50 border border-zinc-800 rounded-full hover:bg-zinc-800 transition-colors shadow-lg backdrop-blur-sm group"
        title="Configurações"
      >
        <Settings className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors group-hover:rotate-45 duration-300" />
      </button>

      <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
