import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/not-found';

/**
 * Service pages are lazy-loaded: they're only reachable through the navbar
 * dropdown / footer-style links, so there's no reason to pay for them in the
 * initial bundle. Each is a thin wrapper over the shared `ServiceDetail`
 * layout, so the chunks stay tiny.
 */
const ServicesIndex = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));

/** Bare white screen — matches the page background while a chunk loads. */
function RouteFallback() {
  return <div className="min-h-screen bg-white" aria-hidden="true" />;
}

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
      {/* Suspense covers the lazy service routes while their chunk loads. */}
      <Suspense fallback={<RouteFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/services" component={ServicesIndex} />
          <Route path="/services/:slug" component={ServiceDetail} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
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
