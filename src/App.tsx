import { lazy, Suspense, useEffect } from 'react';
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
const AboutPage = lazy(() => import('@/pages/About'));
const SuccessPage = lazy(() => import('@/pages/Success'));

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

/**
 * Client-side navigation keeps the app alive, but the browser would otherwise
 * preserve the old scroll position on a new "page". Reset to the top the way a
 * fresh load would — instantly, so there's no visible scroll animation.
 *
 * `history.scrollRestoration` is pinned to `manual` once so a hard refresh / a
 * browser back-forward doesn't jump the page back to a stale scroll offset
 * before React has a chance to run.
 */
function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Router() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <ScrollToTop />
      {/* Suspense covers the lazy service routes while their chunk loads. */}
      <Suspense fallback={<RouteFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={AboutPage} />
          <Route path="/success" component={SuccessPage} />
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
