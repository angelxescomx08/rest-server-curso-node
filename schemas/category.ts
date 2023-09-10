import z from "zod";

//obtener categorías
export const schemaGetCategories = z.object({
  page: z.string().optional(),
  per_page: z.string().optional(),
  populate: z.string().optional(),
});

export type typeGetCategories = z.infer<typeof schemaGetCategories>;

//crear categoría
export const schemaCreateCategory = z.object({
  name: z.string(),
});

export type typeCreateCategory = z.infer<typeof schemaCreateCategory>;
