export const INVOICE_DATA = {
  invoiceNumber: "INV-2023-0042",
  date: "2023-04-01",
  company: {
    name: "ABC Company",
    address: "123 Business St.",
    city: "Seoul, 04532",
  },
  customer: {
    name: "Customer Name",
    address: "456 Client Ave.",
    city: "Busan, 48059",
  },
  items: [
    { description: "Product A", quantity: 2, price: 25000, total: 50000 },
    { description: "Service B", quantity: 1, price: 35000, total: 35000 },
  ],
  subtotal: 85000,
  tax: 8500,
  total: 93500,
};
