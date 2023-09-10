import z from "zod";

export const schemaCreateCategory = z.object({
  name: z.string(),
});

export type typeCreateCategory = z.infer<typeof schemaCreateCategory>;
