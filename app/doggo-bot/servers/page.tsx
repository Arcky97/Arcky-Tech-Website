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
    <article className="flex flex-col min-h-screen mt-8 text-center w-7/8 items-center mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome, {session?.user.name}!</h1>
      <p>Thank you for testing the Discord Authentication implementation on the website.</p>
      <p>Currently this doesn't do anything else so that's it for now :P</p>
    </article>
  )
}