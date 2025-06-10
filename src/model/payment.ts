import { z } from "zod/v4";
import { Clock, Loader2, CheckCircle, XCircle } from "lucide-react";

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

export const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  processing: {
    icon: Loader2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  success: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  failed: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
} as const;
