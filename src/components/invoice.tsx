import { Calendar } from "lucide-react";

const invoiceData = {
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

export const InvoiceMockup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-[123mm] h-[100mm] border border-gray-200 p-3 bg-white text-xs shadow-md">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="font-bold text-sm">INVOICE</h1>
            <div className="text-[9px] text-gray-600">
              {invoiceData.invoiceNumber}
            </div>
          </div>
          <div className="text-right text-[9px]">
            <div className="font-semibold">{invoiceData.company.name}</div>
            <div>{invoiceData.company.address}</div>
            <div>{invoiceData.company.city}</div>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1 text-[9px] mb-2">
          <Calendar size={10} />
          <span>{invoiceData.date}</span>
        </div>

        {/* Customer Info */}
        <div className="mb-2 border-t border-b border-gray-200 py-1">
          <div className="text-[9px] font-semibold">Bill To:</div>
          <div className="text-[9px]">{invoiceData.customer.name}</div>
          <div className="text-[9px]">{invoiceData.customer.address}</div>
          <div className="text-[9px]">{invoiceData.customer.city}</div>
        </div>

        {/* Items */}
        <table className="w-full text-[9px] mb-2">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-1 w-1/2">Description</th>
              <th className="text-center py-1">Qty</th>
              <th className="text-right py-1">Price</th>
              <th className="text-right py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-1">{item.description}</td>
                <td className="text-center py-1">{item.quantity}</td>
                <td className="text-right py-1">
                  {item.price.toLocaleString()}
                </td>
                <td className="text-right py-1">
                  {item.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex flex-col items-end text-[9px]">
          <div className="flex justify-between w-1/3 py-0.5">
            <span>Subtotal:</span>
            <span>{invoiceData.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between w-1/3 py-0.5">
            <span>Tax (10%):</span>
            <span>{invoiceData.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between w-1/3 py-0.5 font-bold">
            <span>Total:</span>
            <span>{invoiceData.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-2 text-center text-[8px] text-gray-500">
          Thank you for your business!
        </div>
      </div>
    </div>
  );
};
