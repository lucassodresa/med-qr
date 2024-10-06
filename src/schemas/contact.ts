import { z } from "zod";

export const contactSchema = z.object({
  parent1Name: z.string(),
  parent1PhoneNumber: z.string(),
  parent2Name: z.string(),
  parent2PhoneNumber: z.string(),
  healthCard: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;
