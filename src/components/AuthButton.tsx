"use client";

import { useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { LogOut, Loader2, User } from "lucide-react";
import { AuthModal } from "./AuthModal";

export function AuthButton() {
  const { data: session, isPending } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.reload();
  };

  if (isPending) {
    return (
      <div className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center">
        <Loader2 className="w-4 h-4 text-zinc-600 animate-spin" />
      </div>
    );
  }

  if (session) {
    return (
      <div className="absolute top-8 right-8 group flex items-center gap-3">
        {/* Helper popup on hover */}
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
          Sair da Conta
        </span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-1.5 pr-4 bg-zinc-900/50 border border-zinc-800 rounded-full hover:bg-red-950/30 hover:border-red-900/50 transition-all shadow-lg backdrop-blur-sm active:scale-95"
          title="Sair (Logout)"
        >
          {session.user.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={session.user.image}
              alt={session.user.name}
              className="w-7 h-7 rounded-full border border-zinc-700"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
              {session.user.name.charAt(0)}
            </div>
          )}
          <span className="text-xs font-semibold text-zinc-300 group-hover:text-red-400 transition-colors max-w-[100px] truncate">
            {session.user.name.split(" ")[0]}
          </span>
          <LogOut className="w-3.5 h-3.5 text-zinc-600 group-hover:text-red-400 ml-1 transition-colors" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-8 right-8 flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-xs font-bold transition-all hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
      >
        <User className="w-4 h-4" />
        <span>Entrar</span>
      </button>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
