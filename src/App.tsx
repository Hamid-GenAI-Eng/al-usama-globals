import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ProfileSettings from "./pages/ProfileSettings.tsx";
import ShipmentList from "./pages/ShipmentList.tsx";
import CreateShipment from "./pages/CreateShipment.tsx";
import ShipmentDetails from "./pages/ShipmentDetails.tsx";
import ShipmentTracking from "./pages/ShipmentTracking.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import Documents from "./pages/Documents.tsx";
import UploadDocument from "./pages/UploadDocument.tsx";
import DocumentDetails from "./pages/DocumentDetails.tsx";
import Suppliers from "./pages/Suppliers.tsx";
import SupplierDetails from "./pages/SupplierDetails.tsx";
import SupplierForm from "./pages/SupplierForm.tsx";
import Buyers from "./pages/Buyers.tsx";
import BuyerDetails from "./pages/BuyerDetails.tsx";
import BuyerForm from "./pages/BuyerForm.tsx";
import PurchaseOrders from "./pages/PurchaseOrders.tsx";
import SalesOrders from "./pages/SalesOrders.tsx";
import PurchaseOrderForm from "./pages/PurchaseOrderForm.tsx";
import SalesOrderForm from "./pages/SalesOrderForm.tsx";
import PurchaseOrderDetails from "./pages/PurchaseOrderDetails.tsx";
import SalesOrderDetails from "./pages/SalesOrderDetails.tsx";
import HSCodeLookup from "./pages/HSCodeLookup.tsx";
import DutyCalculator from "./pages/DutyCalculator.tsx";
import WEBOCDeclaration from "./pages/WEBOCDeclaration.tsx";
import FinancialDashboard from "./pages/FinancialDashboard.tsx";
import Analytics from "./pages/Analytics.tsx";
import RBACAdmin from "./pages/RBACAdmin.tsx";
import Notifications from "./pages/Notifications.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Settings from "./pages/Settings.tsx";
import Support from "./pages/Support.tsx";
import AuditLog from "./pages/AuditLog.tsx";
import ExchangeRates from "./pages/ExchangeRates.tsx";
import Reports from "./pages/Reports.tsx";
import ClientPortal from "./pages/ClientPortal.tsx";
import NotFound from "./pages/NotFound.tsx";

import ProtectedRoute from "./components/ProtectedRoute.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/shipments" element={<ProtectedRoute><ShipmentList /></ProtectedRoute>} />
          <Route path="/shipments/create" element={<ProtectedRoute><CreateShipment /></ProtectedRoute>} />
          <Route path="/shipments/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
          <Route path="/shipments/:id" element={<ProtectedRoute><ShipmentDetails /></ProtectedRoute>} />
          <Route path="/shipments/:id/tracking" element={<ProtectedRoute><ShipmentTracking /></ProtectedRoute>} />
          <Route path="/shipments/:id/edit" element={<ProtectedRoute><CreateShipment /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
          <Route path="/documents/upload" element={<ProtectedRoute><UploadDocument /></ProtectedRoute>} />
          <Route path="/documents/:id" element={<ProtectedRoute><DocumentDetails /></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
          <Route path="/suppliers/create" element={<ProtectedRoute><SupplierForm /></ProtectedRoute>} />
          <Route path="/suppliers/:id" element={<ProtectedRoute><SupplierDetails /></ProtectedRoute>} />
          <Route path="/suppliers/:id/edit" element={<ProtectedRoute><SupplierForm /></ProtectedRoute>} />
          <Route path="/buyers" element={<ProtectedRoute><Buyers /></ProtectedRoute>} />
          <Route path="/buyers/create" element={<ProtectedRoute><BuyerForm /></ProtectedRoute>} />
          <Route path="/buyers/:id" element={<ProtectedRoute><BuyerDetails /></ProtectedRoute>} />
          <Route path="/buyers/:id/edit" element={<ProtectedRoute><BuyerForm /></ProtectedRoute>} />
          <Route path="/orders/purchase" element={<ProtectedRoute><PurchaseOrders /></ProtectedRoute>} />
          <Route path="/orders/purchase/create" element={<ProtectedRoute><PurchaseOrderForm /></ProtectedRoute>} />
          <Route path="/orders/purchase/:id" element={<ProtectedRoute><PurchaseOrderDetails /></ProtectedRoute>} />
          <Route path="/orders/purchase/:id/edit" element={<ProtectedRoute><PurchaseOrderForm /></ProtectedRoute>} />
          <Route path="/orders/sales" element={<ProtectedRoute><SalesOrders /></ProtectedRoute>} />
          <Route path="/orders/sales/create" element={<ProtectedRoute><SalesOrderForm /></ProtectedRoute>} />
          <Route path="/orders/sales/:id" element={<ProtectedRoute><SalesOrderDetails /></ProtectedRoute>} />
          <Route path="/orders/sales/:id/edit" element={<ProtectedRoute><SalesOrderForm /></ProtectedRoute>} />
          <Route path="/customs/hs-codes" element={<ProtectedRoute><HSCodeLookup /></ProtectedRoute>} />
          <Route path="/customs/duty-calculator" element={<ProtectedRoute><DutyCalculator /></ProtectedRoute>} />
          <Route path="/customs/weboc" element={<ProtectedRoute><WEBOCDeclaration /></ProtectedRoute>} />
          <Route path="/finance" element={<ProtectedRoute><FinancialDashboard /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><RBACAdmin /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
          <Route path="/admin/audit-log" element={<ProtectedRoute><AuditLog /></ProtectedRoute>} />
          <Route path="/finance/exchange-rates" element={<ProtectedRoute><ExchangeRates /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/client/portal" element={<ProtectedRoute><ClientPortal /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
