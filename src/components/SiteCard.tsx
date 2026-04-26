"use client";

import { Link } from "@/lib/validations/layout";
import { Trash2 } from "lucide-react";

interface SiteCardProps {
  link: Link;
  onRemove?: () => void;
  isDragging?: boolean;
}

export function SiteCard({ link, onRemove, isDragging }: SiteCardProps) {
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=128`;

  const handleClick = () => {
    if (!isDragging) {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`group relative flex flex-col items-center gap-3 w-20 sm:w-24 transition-all duration-300 cursor-pointer ${isDragging ? "scale-105" : ""}`}
    >
      <div className={`relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-transparent border border-zinc-600/50 rounded-3xl transition-all duration-300 group-hover:bg-zinc-800/30 group-hover:border-zinc-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] ${isDragging ? "shadow-2xl border-zinc-500 bg-zinc-900" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={faviconUrl}
          alt={link.name}
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${link.name}&background=18181b&color=a1a1aa&bold=true`;
          }}
        />

        {onRemove && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-950 hover:border-red-500 hover:text-red-500 transition-all shadow-xl z-10"
            title="Remover Link"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Glossy overlay effect on hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
      </div>
      
      <span className="text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors truncate w-full text-center px-1">
        {link.name}
      </span>
    </div>
  );
}
