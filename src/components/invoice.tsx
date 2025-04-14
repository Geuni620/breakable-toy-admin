import { Calendar } from "lucide-react";
import { INVOICE_DATA } from "./constant";

interface InvoiceData {
  invoiceData: typeof INVOICE_DATA;
}

export const InvoiceMockup = ({ invoiceData }: InvoiceData) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-[123mm] h-[100mm] border border-gray-200 p-3 bg-white text-xs shadow-md">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="font-bold text-sm" data-testid="invoice-title">
              INVOICE
            </h1>
            <div
              className="text-[9px] text-gray-600"
              data-testid="invoice-number"
            >
              {invoiceData.invoiceNumber}
            </div>
          </div>
          <div className="text-right text-[9px]" data-testid="company-info">
            <div className="font-semibold" data-testid="company-name">
              {invoiceData.company.name}
            </div>
            <div data-testid="company-address">
              {invoiceData.company.address}
            </div>
            <div data-testid="company-city">{invoiceData.company.city}</div>
          </div>
        </div>

        {/* Date */}
        <div
          className="flex items-center gap-1 text-[9px] mb-2"
          data-testid="invoice-date"
        >
          <Calendar size={10} />
          <span>{invoiceData.date}</span>
        </div>

        {/* Customer Info */}
        <div
          className="mb-2 border-t border-b border-gray-200 py-1"
          data-testid="customer-info"
        >
          <div className="text-[9px] font-semibold">Bill To:</div>
          <div className="text-[9px]" data-testid="customer-name">
            {invoiceData.customer.name}
          </div>
          <div className="text-[9px]" data-testid="customer-address">
            {invoiceData.customer.address}
          </div>
          <div className="text-[9px]" data-testid="customer-city">
            {invoiceData.customer.city}
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-[9px] mb-2" data-testid="items-table">
          {/* ... thead ... */}
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-100"
                data-testid={`item-row-${index}`}
              >
                <td className="py-1" data-testid={`item-desc-${index}`}>
                  {item.description}
                </td>
                <td
                  className="text-center py-1"
                  data-testid={`item-qty-${index}`}
                >
                  {item.quantity}
                </td>
                <td
                  className="text-right py-1"
                  data-testid={`item-price-${index}`}
                >
                  {item.price.toLocaleString()}
                </td>
                <td
                  className="text-right py-1"
                  data-testid={`item-total-${index}`}
                >
                  {item.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div
          className="flex flex-col items-end text-[9px]"
          data-testid="totals-section"
        >
          <div className="flex justify-between w-1/3 py-0.5">
            <span>Subtotal:</span>
            <span data-testid="subtotal">
              {invoiceData.subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between w-1/3 py-0.5">
            <span>Tax (10%):</span>
            <span data-testid="tax">{invoiceData.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between w-1/3 py-0.5 font-bold">
            <span>Total:</span>
            <span data-testid="total">
              {invoiceData.total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-auto pt-2 text-center text-[8px] text-gray-500"
          data-testid="footer"
        >
          Thank you for your business!
        </div>
      </div>
    </div>
  );
};
