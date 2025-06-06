import { z } from "zod/v4";

export const paymentSchema = z.object({
  id: z.uuid(),
  amount: z.number(),
  status: z.union([
    z.literal("pending"),
    z.literal("processing"),
    z.literal("success"),
    z.literal("failed"),
  ]),
  email: z.email(),
});

export type Payment = z.infer<typeof paymentSchema>;
