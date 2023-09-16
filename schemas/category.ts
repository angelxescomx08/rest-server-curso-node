import z from "zod";

//obtener categorías
export const schemaGetCategories = z.object({
  page: z.string().optional(),
  per_page: z.string().optional(),
  populate: z.string().optional(),
});

export type typeGetCategories = z.infer<typeof schemaGetCategories>;

//obtener categoría por id
export const schemaGetCategoryByIdParams = z.object({
  id: z.string(),
});

export type typeGetCategoryByIdParams = z.infer<
  typeof schemaGetCategoryByIdParams
>;

export const schemaGetCategoryByIdQuery = z.object({
  populate: z.string().optional(),
});

export type typeGetCategoryByIdQuery = z.infer<
  typeof schemaGetCategoryByIdQuery
>;

//crear categoría
export const schemaCreateCategory = z.object({
  name: z.string(),
});

export type typeCreateCategory = z.infer<typeof schemaCreateCategory>;
