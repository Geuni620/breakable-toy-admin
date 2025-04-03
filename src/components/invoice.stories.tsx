import type { Meta, StoryObj } from "@storybook/react";
import { InvoiceMockup } from "./invoice";
import { INVOICE_DATA } from "./constant";

type Invoice = typeof INVOICE_DATA;

interface InvoiceStoryProps {
  invoiceData: Invoice;
  invoiceNumber?: string;
  company?: string;
}

const meta: Meta<InvoiceStoryProps> = {
  title: "common/invoice",
  component: InvoiceMockup,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    invoiceData: {
      description: "청구서 정보를 포함하는 객체",
      control: "object",
    },
    invoiceNumber: {
      description: "청구서 고유 식별자",
      defaultValue: { summary: INVOICE_DATA.invoiceNumber },
      control: {
        type: "text",
        disable: true,
      },
      table: {
        type: { summary: "string" },
        category: "송장 정보",
      },
    },

    company: {
      description: "회사명",
      defaultValue: { summary: INVOICE_DATA.company.name },
      control: {
        type: "text",
      },
      table: {
        type: { summary: INVOICE_DATA.company.name },
        category: "회사명",
      },
    },
  },

  args: {
    invoiceData: INVOICE_DATA,
    company: INVOICE_DATA.company.name,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    console.log("args", args);

    const customArgs = {
      ...args,
      invoiceData: {
        ...args.invoiceData,
        company: {
          ...args.invoiceData.company,
          name: args.company ?? args.invoiceData.company.name,
        },
      },
    };

    console.log("customArgs", customArgs);

    return <InvoiceMockup invoiceData={customArgs.invoiceData} />;
  },
};
