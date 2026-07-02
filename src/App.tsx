import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import SteelFrame from "./pages/SteelFrame";
import Incorporacao from "./pages/Incorporacao";
import Aniversario from "./pages/Aniversario";
import { initPixel } from "@/lib/pixel";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initPixel();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/steel-frame" element={<SteelFrame />} />
            <Route path="/incorporacao" element={<Incorporacao />} />
            <Route path="/aniversario" element={<Aniversario />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
