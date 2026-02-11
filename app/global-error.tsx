"use client";

import { useEffect } from "react";

export default function ReloadOnActionError() {
  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const res = await originalFetch(...args);

      if (res.status === 500) {
        const text = await res.clone().text();
        if (text.includes("Failed to find Server Action")) {
          window.location.reload();
        }
      }

      return res;
    };
  }, []);

  return null;
}