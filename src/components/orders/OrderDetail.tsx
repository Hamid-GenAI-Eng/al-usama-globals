import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Download, Printer, CheckCircle2, Truck, Package, FileText } from "lucide-react";
import type { OrderType } from "./OrdersList";

const OrderDetail = ({ type }: { type: OrderType }) => {
  const { id } = useParams();
  const isPO = type === "purchase";

  const order = {
    number: isPO ? "PO-2026-0142" : "SO-2026-0089",
    party: isPO ? "Shenzhen Electronics Co." : "Lahore Traders Pvt Ltd",
    address: isPO ? "Bao'an District, Shenzhen, China 518101" : "DHA Phase 6, Lahore, Pakistan",
    contact: isPO ? "Li Wei · +86 755 8888 1234" : "Ahmed Khan · +92 300 123 4567",
    orderDate: "2026-04-22",
    delivery: "2026-05-15",
    currency: "USD",
    incoterm: "FOB Shanghai",
    payment: "L/C at sight",
    status: "Confirmed",
    items: [
      { desc: "USB-C Charging Cable 2m", hs: "8544.42", qty: 5000, price: 1.85 },
      { desc: "Wireless Earbuds Pro", hs: "8518.30", qty: 800, price: 18.50 },
      { desc: "Power Bank 20000mAh", hs: "8507.60", qty: 1200, price: 14.20 },
    ],
  };

  const subtotal = order.items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const timeline = [
    { label: "Order Created", date: "Apr 22, 2026", done: true, icon: FileText },
    { label: "Confirmed", date: "Apr 23, 2026", done: true, icon: CheckCircle2 },
    { label: "Shipped", date: "Pending", done: false, icon: Truck },
    { label: "Delivered", date: "Expected May 15", done: false, icon: Package },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={`/orders/${type}`} className="p-2 hover:bg-muted rounded-lg"><ArrowLeft className="w-4 h-4" /></Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold font-headline">{order.number}</h1>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{order.status}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{isPO ? "Purchase order to" : "Sales order from"} {order.party}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm"><Printer className="w-4 h-4" /> Print</button>
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm"><Download className="w-4 h-4" /> PDF</button>
          <Link to={`/orders/${type}/${id}/edit`} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold"><Edit className="w-4 h-4" /> Edit</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{isPO ? "Supplier" : "Buyer"}</p>
                <p className="font-semibold">{order.party}</p>
                <p className="text-sm text-muted-foreground mt-1">{order.address}</p>
                <p className="text-sm text-muted-foreground mt-2">{order.contact}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-xs text-muted-foreground">Order Date</p><p className="font-semibold">{order.orderDate}</p></div>
                <div><p className="text-xs text-muted-foreground">Delivery</p><p className="font-semibold">{order.delivery}</p></div>
                <div><p className="text-xs text-muted-foreground">Incoterm</p><p className="font-semibold">{order.incoterm}</p></div>
                <div><p className="text-xs text-muted-foreground">Payment</p><p className="font-semibold">{order.payment}</p></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Line Items</h2>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground uppercase tracking-wider">
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-semibold">Description</th>
                  <th className="text-left py-2 font-semibold">HS Code</th>
                  <th className="text-right py-2 font-semibold">Qty</th>
                  <th className="text-right py-2 font-semibold">Unit</th>
                  <th className="text-right py-2 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="py-3 font-medium">{it.desc}</td>
                    <td className="py-3 font-mono text-xs">{it.hs}</td>
                    <td className="py-3 text-right">{it.qty.toLocaleString()}</td>
                    <td className="py-3 text-right font-mono">${it.price.toFixed(2)}</td>
                    <td className="py-3 text-right font-mono font-semibold">${(it.qty * it.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <div className="w-72 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-mono font-semibold">{order.currency} {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (5%)</span><span className="font-mono">{order.currency} {tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
                <div className="flex justify-between border-t border-border pt-2 text-base"><span className="font-bold">Total</span><span className="font-mono font-bold text-primary">{order.currency} {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Timeline</h2>
            <div className="space-y-4">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${t.done ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                    <t.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${t.done ? "text-foreground" : "text-muted-foreground"}`}>{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Linked Documents</h2>
            <div className="space-y-2 text-sm">
              {["Commercial Invoice", "Packing List", "Bill of Lading"].map(d => (
                <Link key={d} to="/documents" className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>{d}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
