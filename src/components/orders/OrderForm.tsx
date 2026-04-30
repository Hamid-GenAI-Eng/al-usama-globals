import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import type { OrderType } from "./OrdersList";

interface LineItem {
  id: string;
  description: string;
  hsCode: string;
  qty: number;
  unitPrice: number;
}

const currencies = ["USD", "EUR", "GBP", "AED", "SAR", "CNY", "PKR"];

const OrderForm = ({ type }: { type: OrderType }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isPO = type === "purchase";
  const isEdit = !!id;

  const [orderNumber] = useState(isEdit ? `${isPO ? "PO" : "SO"}-2026-0142` : `${isPO ? "PO" : "SO"}-2026-${String(Math.floor(Math.random() * 900) + 100)}`);
  const [party, setParty] = useState("");
  const [orderDate, setOrderDate] = useState(new Date().toISOString().slice(0, 10));
  const [deliveryDate, setDeliveryDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [incoterm, setIncoterm] = useState("FOB");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { id: "1", description: "", hsCode: "", qty: 1, unitPrice: 0 },
  ]);

  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems(items.map(it => it.id === id ? { ...it, [field]: value } : it));
  };
  const addItem = () => setItems([...items, { id: Date.now().toString(), description: "", hsCode: "", qty: 1, unitPrice: 0 }]);
  const removeItem = (id: string) => setItems(items.filter(it => it.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isEdit ? "Order updated successfully" : "Order created successfully");
    navigate(`/orders/${type}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={`/orders/${type}`} className="p-2 hover:bg-muted rounded-lg"><ArrowLeft className="w-4 h-4" /></Link>
          <div>
            <h1 className="text-2xl font-bold font-headline">{isEdit ? "Edit" : "New"} {isPO ? "Purchase Order" : "Sales Order"}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{orderNumber}</p>
          </div>
        </div>
        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
          <Save className="w-4 h-4" /> {isEdit ? "Update" : "Create"} Order
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Order Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground">{isPO ? "Supplier" : "Buyer"}</label>
            <input required value={party} onChange={e => setParty(e.target.value)} placeholder={`Select ${isPO ? "supplier" : "buyer"}`} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Order Date</label>
            <input type="date" value={orderDate} onChange={e => setOrderDate(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Expected Delivery</label>
            <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Currency</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm bg-white">
              {currencies.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Incoterm</label>
            <select value={incoterm} onChange={e => setIncoterm(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm bg-white">
              {["FOB", "CIF", "CFR", "EXW", "DAP", "DDP"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Payment Terms</label>
            <select value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm bg-white">
              {["Net 15", "Net 30", "Net 60", "Advance", "L/C at sight", "T/T"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Line Items</h2>
          <button type="button" onClick={addItem} className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-primary hover:bg-primary/5 rounded-lg">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase tracking-wider">
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold">Description</th>
                <th className="text-left py-2 font-semibold w-32">HS Code</th>
                <th className="text-right py-2 font-semibold w-24">Qty</th>
                <th className="text-right py-2 font-semibold w-32">Unit Price</th>
                <th className="text-right py-2 font-semibold w-32">Amount</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-border">
                  <td className="py-2 pr-2">
                    <input value={item.description} onChange={e => updateItem(item.id, "description", e.target.value)} placeholder="Item description" className="w-full px-2 py-1.5 border border-border rounded text-sm" />
                  </td>
                  <td className="py-2 pr-2">
                    <input value={item.hsCode} onChange={e => updateItem(item.id, "hsCode", e.target.value)} placeholder="0000.00" className="w-full px-2 py-1.5 border border-border rounded text-sm font-mono" />
                  </td>
                  <td className="py-2 pr-2">
                    <input type="number" min="0" value={item.qty} onChange={e => updateItem(item.id, "qty", parseFloat(e.target.value) || 0)} className="w-full px-2 py-1.5 border border-border rounded text-sm text-right" />
                  </td>
                  <td className="py-2 pr-2">
                    <input type="number" min="0" step="0.01" value={item.unitPrice} onChange={e => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)} className="w-full px-2 py-1.5 border border-border rounded text-sm text-right" />
                  </td>
                  <td className="py-2 pr-2 text-right font-mono font-semibold">{(item.qty * item.unitPrice).toFixed(2)}</td>
                  <td className="py-2">
                    <button type="button" onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive p-1"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="w-72 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-mono font-semibold">{currency} {subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax (5%)</span><span className="font-mono">{currency} {tax.toFixed(2)}</span></div>
            <div className="flex justify-between border-t border-border pt-2 text-base"><span className="font-bold">Total</span><span className="font-mono font-bold text-primary">{currency} {total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Notes</h2>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Additional terms, special instructions..." className="w-full px-3 py-2 border border-border rounded-lg text-sm" />
      </div>
    </form>
  );
};

export default OrderForm;
