
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DriverAuth from "./pages/DriverAuth";
import DriverDashboard from "./pages/DriverDashboard";
import Motorista from "./pages/Motorista";
import Cargas from "./pages/Cargas";
import Admin from "./pages/Admin";
import { AuthProvider } from "./contexts/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/motorista" element={<Motorista />} />
            <Route path="/cargas" element={<Cargas />} />
            <Route path="/motorista/auth" element={<DriverAuth />} />
            <Route path="/motorista/dashboard" element={<DriverDashboard />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
