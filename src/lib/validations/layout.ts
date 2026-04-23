import { z } from "zod";

export const linkSchema = z.object({
  name: z.string().min(1, "O nome do link é obrigatório"),
  url: z.string().url("A URL deve ser válida"),
  icon: z.string().optional(),
});

export const categorySchema = z.object({
  id: z.string().min(1, "O ID é obrigatório"),
  title: z.string().min(1, "O título da categoria é obrigatório"),
  links: z.array(linkSchema),
});

export const layoutSchema = z.array(categorySchema);

export type Layout = z.infer<typeof layoutSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Link = z.infer<typeof linkSchema>;
