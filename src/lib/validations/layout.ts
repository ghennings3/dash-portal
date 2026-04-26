import { z } from "zod";

export const linkSchema = z.object({
  id: z.string().uuid("ID inválido"),
  name: z.string().trim().min(1, "O nome do link é obrigatório").max(50, "O nome é muito longo"),
  url: z.string().trim().url("A URL deve ser válida").refine((val) => val.startsWith("http://") || val.startsWith("https://"), {
    message: "URL deve usar HTTP ou HTTPS (proteção contra XSS)",
  }),
  icon: z.string().optional(),
});

export const categorySchema = z.object({
  id: z.string().uuid("ID inválido"),
  title: z.string().trim().min(1, "O título da categoria é obrigatório").max(30, "O título é muito longo"),
  links: z.array(linkSchema).max(100, "Limite máximo de links por categoria atingido"),
});

export const layoutSchema = z.array(categorySchema).max(20, "Limite máximo de categorias atingido");

export type Layout = z.infer<typeof layoutSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Link = z.infer<typeof linkSchema>;
