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
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/shipments" element={<ShipmentList />} />
          <Route path="/shipments/create" element={<CreateShipment />} />
          <Route path="/shipments/search" element={<SearchResults />} />
          <Route path="/shipments/:id" element={<ShipmentDetails />} />
          <Route path="/shipments/:id/tracking" element={<ShipmentTracking />} />
          <Route path="/shipments/:id/edit" element={<CreateShipment />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/upload" element={<UploadDocument />} />
          <Route path="/documents/:id" element={<DocumentDetails />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/suppliers/create" element={<SupplierForm />} />
          <Route path="/suppliers/:id" element={<SupplierDetails />} />
          <Route path="/suppliers/:id/edit" element={<SupplierForm />} />
          <Route path="/buyers" element={<Buyers />} />
          <Route path="/buyers/create" element={<BuyerForm />} />
          <Route path="/buyers/:id" element={<BuyerDetails />} />
          <Route path="/buyers/:id/edit" element={<BuyerForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
