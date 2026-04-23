import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category, Link } from "@/lib/validations/layout";

interface DashState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addLink: (categoryId: string, link: Link) => void;
  removeLink: (linkId: string) => void;
  reorderCategories: (categories: Category[]) => void;
}

export const useDashStore = create<DashState>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
      addLink: (categoryId, link) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? { ...cat, links: [...cat.links, link] }
              : cat
          ),
        })),
      removeLink: (linkId) =>
        set((state) => ({
          categories: state.categories.map((cat) => ({
            ...cat,
            links: cat.links.filter((l) => l.id !== linkId),
          })),
        })),
      reorderCategories: (categories) => set({ categories }),
    }),
    {
      name: "dash-storage",
    }
  )
);
