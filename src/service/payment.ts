import { httpClient } from "@/api/http-client";
import { paymentSchema } from "@/model/payment";
import { z } from "zod/v4";

export const GetPaymentsResponseSchema = z.object({
  data: z.array(paymentSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

type GetPaymentsResponse = z.infer<typeof GetPaymentsResponseSchema>;

export const paymentService = {
  getPayments: async (): Promise<GetPaymentsResponse> => {
    const response = await httpClient.get<GetPaymentsResponse>("/payments");

    return GetPaymentsResponseSchema.parse(response);
  },
};
