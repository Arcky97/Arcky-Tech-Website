import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Arcky-Tech",
  description: "A collection of Arcky's Projects, Documentation and a Dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Cookiebot script */}
        <script 
          id="Cookiebot" 
          src="https://consent.cookiebot.com/uc.js" data-cbid="0d8c264c-1acf-481c-b1c3-66923a26955f" data-blockingmode="auto" 
          type="text/javascript"
          async
        ></script>
      </head>
      <body className="flex flex-col min-h-screen ">
        <Navbar />
        <main className="bg-gray-900">
          {children}
          <AdBanner/>
        </main>
      </body>
    </html>
  );
}
