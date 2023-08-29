import z from "zod";

export const googleLoginSchema = z.object({
  id_token: z.string(),
});

export type googleLoginType = z.infer<typeof googleLoginSchema>;
