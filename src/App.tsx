import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/not-found';

/**
 * App shell only: providers and routing.
 *
 * The landing page itself lives in `src/pages/Home.tsx`, which composes the
 * sections in `src/components/sections/`. Copy and figures live in `src/data/`,
 * and the colour palette in `src/lib/theme.ts` — see README.md for the map.
 */
const queryClient = new QueryClient();

function Router() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
