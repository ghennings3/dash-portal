import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category, Link } from "@/lib/validations/layout";

interface DashState {
  categories: Category[];
  activeCategoryId: string | null;
  setActiveCategoryId: (id: string | null) => void;
  setCategories: (categories: Category[]) => void;
  addLink: (categoryId: string, link: Link) => void;
  removeLink: (linkId: string) => void;
  addCategory: (category: Category) => void;
  removeCategory: (categoryId: string) => void;
  reorderLinks: (categoryId: string, links: Link[]) => void;
  reorderCategories: (categories: Category[]) => void;
}

export const useDashStore = create<DashState>()(
  persist(
    (set) => ({
      categories: [],
      activeCategoryId: null,
      setActiveCategoryId: (id) => set({ activeCategoryId: id }),
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
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
      removeCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== categoryId),
          activeCategoryId:
            state.activeCategoryId === categoryId ? null : state.activeCategoryId,
        })),
      reorderLinks: (categoryId, links) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId ? { ...cat, links } : cat
          ),
        })),
      reorderCategories: (categories) => set({ categories }),
    }),
    {
      name: "dash-storage",
    }
  )
);
