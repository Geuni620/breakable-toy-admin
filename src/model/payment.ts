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

export const ApiResponseSchema = z.object({
  data: z.array(paymentSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});
