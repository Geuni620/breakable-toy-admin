import { httpClient } from "@/api/http-client";
import { paymentSchema } from "@/model/payment";
import { z } from "zod/v4";

const GetPaymentsResponseSchema = z.object({
  data: z.array(paymentSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

const GetPaymentsParamsSchema = z.object({
  email: z.string().optional(),
});

type GetPaymentsResponse = z.infer<typeof GetPaymentsResponseSchema>;
type GetPaymentsParams = z.infer<typeof GetPaymentsParamsSchema>;

export const paymentService = {
  getPayments: async ({
    email,
  }: GetPaymentsParams): Promise<GetPaymentsResponse> => {
    const params = GetPaymentsParamsSchema.parse({ email });
    const response = await httpClient.get<GetPaymentsResponse>(
      `/payments?email=${params.email}`
    );

    return GetPaymentsResponseSchema.parse(response);
  },
};
