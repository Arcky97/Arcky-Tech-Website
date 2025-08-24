"use client"

import { SessionProvider } from "next-auth/react";
import { createContext, ReactNode, useContext } from "react";
import type { Session } from "next-auth";

export default function Providers({ children }: {children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

const DashboardSessionContext = createContext<Session | null>(null);

export function useDashboardSession() {
  const ctx = useContext(DashboardSessionContext);
  if (!ctx) {
    throw new Error("useDashboardSession must be used inside DashboardSessionProvider");
  }
  return ctx;
}

export function DashboardSessionProvider({
  session,
  children 
}: {
  session: Session | null;
  children: ReactNode;
}) {
  return (
    <DashboardSessionContext.Provider value={session}>
      {children}
    </DashboardSessionContext.Provider>
  )
}