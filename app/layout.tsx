import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Arcky-Tech",
  description: "A collection of Arcky's Projects, Documentation and a Dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen ">
        <Navbar />
        <main className="bg-gray-900">
          {children}
        </main>
      </body>
    </html>
  );
}
