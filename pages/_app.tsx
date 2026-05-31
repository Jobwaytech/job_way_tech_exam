import "../src/index.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useThemeStore } from "../src/store/themeStore";
import { initAnalyticsIfSupported } from "../src/lib/firebase";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  // Apply theme class globally
  const { theme } = useThemeStore();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    // Initialize analytics only on the client when supported
    initAnalyticsIfSupported().catch(() => {});
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
