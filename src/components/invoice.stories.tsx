import type { Meta, StoryObj } from "@storybook/react";
import { InvoiceMockup } from "./invoice";
import { INVOICE_DATA } from "./constant";

type Invoice = typeof INVOICE_DATA;

const FIELD_SELECTOR = {
  none: null,
  all: "all",
  송장번호: '[data-testid="invo-no"]',
  접수일자: '[data-testid="reception-dt"]',
  분류코드: '[data-testid^="classification-cd"]',
};

interface InvoiceStoryProps {
  invoiceData: Invoice;
  invoiceNumber?: string;
  company?: string;

  highlightField: keyof typeof FIELD_SELECTOR;
  highlightColor: string;
  highlightStyle: string;
}

const meta: Meta<InvoiceStoryProps> = {
  title: "common/invoice",
  component: InvoiceMockup,
  parameters: {
    controls: {
      expanded: true,
    },
    actions: { argTypesRegex: "^on.*" },
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

    return <InvoiceMockup invoiceData={customArgs.invoiceData} />;
  },
};
