"use client"

import { logPageVisit } from "@/lib/logPageVisit";
import { usePathname } from "next/navigation"
import { useEffect } from "react";


export default function PageVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    logPageVisit(pathname);
  }, [pathname]);

  return null;
}