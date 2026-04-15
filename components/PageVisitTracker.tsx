"use client"

import { logPageVisit } from "@/lib/logPageVisit";
import { usePathname } from "next/navigation"
import { useEffect } from "react";


export default function PageVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    
    logPageVisit(pathname);
  }, [pathname]);

  return null;
}