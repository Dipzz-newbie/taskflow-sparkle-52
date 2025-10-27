import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "@/context/AppContext";
import { Router, Route } from "@/components/Router";
import { Navigation } from "@/components/Navigation";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Route path="/" component={Home} />
          <Route path="/stats" component={Stats} />
          <Route path="/settings" component={Settings} />
        </Router>
        <Navigation />
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
