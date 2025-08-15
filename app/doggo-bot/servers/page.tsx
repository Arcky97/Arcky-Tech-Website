"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

import { useEffect } from "react";

export default function Servers() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/doggo-bot");
    }
  }, [status]);

  if (status === "loading") {
    return <p className="text-white mt-8 text-center">Loading...</p>;
  }

  return (
    <article className="min-h-screen mt-8 text-center">
      <h1 className="text-3xl font-bold">Welcome, {session?.user.name}!</h1>
    </article>
  )
}