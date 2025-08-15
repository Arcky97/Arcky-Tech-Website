import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { BackToTopButton } from "@/components/BackToTopButton";
import Providers from "./provider";

export const metadata: Metadata = {
  title: "Arcky-Tech",
  description: "A collection of Arcky's Projects, Documentation and a Dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png"/>
      </head>
      <body className="flex flex-col h-full">
        <Providers>
          <Navbar/>
          <CookieBanner/>
          <main className="flex-1 bg-gray-900 pt-12">
            {children}
          </main>
          <BackToTopButton/>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
