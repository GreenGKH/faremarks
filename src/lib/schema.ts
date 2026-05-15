import { z } from "zod";

export const CreateBookmarkSchema = z.object({
    url: z.url("URL invalide"),
    title: z.string().min(1, "Titre requis"),
    description: z.string().optional(),
});
export type CreateBookmarkInput = z.infer<typeof CreateBookmarkSchema>;
