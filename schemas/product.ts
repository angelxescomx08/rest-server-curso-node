import z from "zod";

//obtener productos
export const schemaGetProducts = z.object({
  per_page: z.string().optional(),
  page: z.string().optional(),
});

export type typeGetProducts = z.infer<typeof schemaGetProducts>;

//obtener producto por id
export const schemaGetProductByIdParams = z.object({
  id: z.string(),
});

export type typeGetProductByIdParams = z.infer<
  typeof schemaGetProductByIdParams
>;

//crear producto
export const schemaCreateProduct = z.object({
  name: z.string(),
  price: z.number(),
  category: z.string(),
  description: z.string(),
  available: z.boolean(),
});

export type typeCreateProduct = z.infer<typeof schemaCreateProduct>;

//actualizar producto
export const schemaUpdateProduct = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  available: z.boolean().optional(),
  user: z.string().optional(),
});

export type typeUpdateProduct = z.infer<typeof schemaUpdateProduct>;
