import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const PAYMENT_STATUS = ["pending", "processing", "success", "failed"];

const MOCK_PAYMENTS = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  amount: faker.number.int({ min: 100, max: 1000 }),
  status: faker.helpers.arrayElement(PAYMENT_STATUS),
  email: faker.internet.email(),
}));

export const handlers = [
  http.get("http://localhost:3000/payments", () => {
    return HttpResponse.json({
      data: MOCK_PAYMENTS,
      total: MOCK_PAYMENTS.length,
      page: 1,
      limit: 10,
    });
  }),
];
