import DashboardLayout from "@/components/DashboardLayout";
import OrdersList from "@/components/orders/OrdersList";

const SalesOrders = () => (
  <DashboardLayout><OrdersList type="sales" /></DashboardLayout>
);
export default SalesOrders;
