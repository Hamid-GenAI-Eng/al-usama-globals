import DashboardLayout from "@/components/DashboardLayout";
import OrderForm from "@/components/orders/OrderForm";

const PurchaseOrderForm = () => (
  <DashboardLayout><OrderForm type="purchase" /></DashboardLayout>
);
export default PurchaseOrderForm;
