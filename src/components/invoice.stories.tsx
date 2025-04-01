import type { Meta, StoryObj } from "@storybook/react";
import { InvoiceMockup } from "./invoice";

const meta = {
  title: "common/invoice",
  component: InvoiceMockup,
  argTypes: {
    invoice: {
      description: "청구서 정보를 포함하는 객체",
      control: "object",
    },
    "invoice.id": {
      description: "청구서 고유 식별자",
      control: "text",
    },
    "invoice.createdAt": {
      description: "청구서 생성일",
      control: "date",
    },
    "invoice.dueDate": {
      description: "지불 기한",
      control: "date",
    },
    "invoice.amount": {
      description: "청구 금액",
      control: { type: "number", min: 0 },
    },
    "invoice.status": {
      description: "청구서 상태",
      control: "select",
      options: ["pending", "paid", "overdue", "cancelled"],
    },
  },
} satisfies Meta<typeof InvoiceMockup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <InvoiceMockup />,
};
