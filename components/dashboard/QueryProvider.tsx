"use client"

import { DehydratedState, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function QueryProvider({
  children,
  dehydrateState,
}: {
  children: ReactNode;
  dehydrateState: DehydratedState;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrateState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  )
}