"use client"
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { CookieBanner } from "./CookieBanner";
import { BackToTopButton } from "./BackToTopButton";
import Footer from "./Footer";

export default function MainLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDoggoBot = pathname.startsWith("/doggo-bot");

  return (
    <>
      {!isDoggoBot && <Navbar/>}
      {!isDoggoBot && <CookieBanner/>}
      {!isDoggoBot ? (
        <main className="flex-1 bg-gray-900 pt-12">
          {children}
        </main>
      ) : ( 
        <>
          {children}
        </>
      )}
      {!isDoggoBot && <BackToTopButton/>}
      {!isDoggoBot && <Footer/>}
    </>
  )
}