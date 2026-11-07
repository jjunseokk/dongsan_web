import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initializeDemo } from "./demo/adapter";
import "./index.scss";
import { QueryClient, QueryClientProvider, MutationCache } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

initializeDemo();
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  mutationCache: new MutationCache({ onError: (error) => window.dispatchEvent(new CustomEvent('demo-error', { detail: error.message })) }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CookiesProvider>
  </StrictMode>
);
