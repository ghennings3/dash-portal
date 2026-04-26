"use client";

import { useState } from "react";
import { Modal } from "./ui/Modal";
import { authClient } from "@/lib/auth-client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { z } from "zod";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // clear error when typing
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (activeTab === "login") {
        loginSchema.parse(formData);
        const { error: signInError } = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });
        if (signInError) throw new Error(signInError.message || "Credenciais inválidas");
      } else {
        signupSchema.parse(formData);
        const { error: signUpError } = await authClient.signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });
        if (signUpError) throw new Error(signUpError.message || "Erro ao criar conta");
      }
      
      // Sucesso
      onClose();
      window.location.reload();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else {
        setError(err.message || "Ocorreu um erro inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "github" | "google") => {
    setIsLoading(true);
    await authClient.signIn.social({ provider });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Autenticação">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
          <button
            onClick={() => {
              setActiveTab("login");
              setError("");
            }}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
              activeTab === "login"
                ? "bg-white text-black shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => {
              setActiveTab("signup");
              setError("");
            }}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
              activeTab === "signup"
                ? "bg-white text-black shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Criar Conta
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2 p-3 text-xs font-medium text-red-400 bg-red-950/50 border border-red-900/50 rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {activeTab === "signup" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400">Nome</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
                disabled={isLoading}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400">E-mail</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400">Senha</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder={activeTab === "signup" ? "Mínimo 8 caracteres" : "Sua senha"}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pr-12 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:bg-zinc-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : activeTab === "login" ? (
              "Entrar"
            ) : (
              "Cadastrar"
            )}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-zinc-900 px-2 text-zinc-500">ou continuar com</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialAuth("github")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all text-sm font-semibold text-zinc-300 disabled:opacity-50"
          >
            <FaGithub className="w-4 h-4" />
            <span>GitHub</span>
          </button>
          <button
            type="button"
            onClick={() => handleSocialAuth("google")}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all text-sm font-semibold text-zinc-300 disabled:opacity-50"
          >
            <FcGoogle className="w-4 h-4" />
            <span>Google</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
