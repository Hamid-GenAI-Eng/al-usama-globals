import DashboardLayout from "@/components/DashboardLayout";
import OrdersList from "@/components/orders/OrdersList";

const PurchaseOrders = () => (
  <DashboardLayout><OrdersList type="purchase" /></DashboardLayout>
);
export default PurchaseOrders;
