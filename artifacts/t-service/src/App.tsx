import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import ServicesIndex from "@/pages/ServicesIndex";
import ServicePage from "@/pages/ServicePage";
import Contacts from "@/pages/Contacts";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Оба варианта — с завершающим слэшем (канонический) и без */}
      <Route path="/uslugi" component={ServicesIndex} />
      <Route path="/uslugi/" component={ServicesIndex} />
      <Route path="/kontakty" component={Contacts} />
      <Route path="/kontakty/" component={Contacts} />
      <Route path="/:slug" component={ServicePage} />
      <Route path="/:slug/" component={ServicePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
