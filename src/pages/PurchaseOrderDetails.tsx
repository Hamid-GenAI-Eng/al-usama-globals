import DashboardLayout from "@/components/DashboardLayout";
import OrderDetail from "@/components/orders/OrderDetail";

const PurchaseOrderDetails = () => (
  <DashboardLayout><OrderDetail type="purchase" /></DashboardLayout>
);
export default PurchaseOrderDetails;
