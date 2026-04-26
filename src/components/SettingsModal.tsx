"use client";

import { Modal } from "./ui/Modal";
import { useTheme } from "next-themes";
import { Palette, User, Settings as SettingsIcon, Database, Zap, Terminal, Moon, Sun, Loader2, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const THEMES = [
  { id: "dark", name: "Dark (Default)" },
  { id: "light", name: "Light" },
  { id: "sunset", name: "Sunset" },
  { id: "cyberpunk", name: "Cyberpunk" },
  { id: "hacker", name: "Hacker" },
  { id: "dracula", name: "Dracula" },
];

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  
  const [activeTab, setActiveTab] = useState<"theme" | "profile" | "general" | "data">("theme");

  // Profile Form State
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  if (!mounted) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    
    setIsSavingProfile(true);
    setProfileSuccess(false);
    try {
      let formattedImage = image;
      if (formattedImage && !formattedImage.startsWith('http://') && !formattedImage.startsWith('https://')) {
        formattedImage = `https://${formattedImage}`;
        setImage(formattedImage);
      }

      await authClient.updateUser({
        name: name,
        image: formattedImage || undefined,
      });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configurações" maxWidth="max-w-2xl">
      <div className="flex flex-col h-full -mx-6 -mt-2">
        {/* Horizontal Tabs */}
        <div className="flex overflow-x-auto border-b border-zinc-800 px-6 scrollbar-hide">
          <button
            onClick={() => setActiveTab("theme")}
            className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "theme"
                ? "border-white text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Palette className="w-4 h-4" />
            Tema
          </button>
          
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "profile"
                ? "border-white text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <User className="w-4 h-4" />
            Perfil
          </button>

          <button
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "general"
                ? "border-white text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            Geral
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "theme" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-sm font-semibold text-zinc-500">Selecione um Tema</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {THEMES.map((t) => {
                  const isActive = theme === t.id;

                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                        isActive
                          ? "bg-zinc-950 border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                          : "bg-zinc-950 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-850"
                      }`}
                    >
                      <span
                        className={`text-sm font-bold ${
                          isActive ? "text-white" : "text-zinc-300"
                        }`}
                      >
                        {t.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-sm font-semibold text-zinc-500">Seu Perfil</h3>
              
              {!session ? (
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-center text-zinc-400 text-sm">
                  Faça login para editar o perfil.
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-sm">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400">Nome</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Como você quer ser chamado?"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
                      disabled={isSavingProfile}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400">URL do Avatar (Opcional)</label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Ex: github.com/seuusuario.png"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
                      disabled={isSavingProfile}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:bg-zinc-200 active:scale-95 disabled:opacity-50 mt-2"
                  >
                    {isSavingProfile ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : profileSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Salvo!
                      </>
                    ) : (
                      "Salvar Alterações"
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === "general" && (
            <div className="p-8 text-center text-zinc-500 animate-in fade-in slide-in-from-right-4 duration-300">
              <SettingsIcon className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Mais configurações em breve.</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
