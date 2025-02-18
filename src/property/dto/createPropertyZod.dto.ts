import { z } from "zod";

export const CreatePropertySchema = z
  .object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    price: z.number().positive(),
  })
  .required();



  export type CreatePropertyZodDto = z.infer<typeof CreatePropertySchema>;