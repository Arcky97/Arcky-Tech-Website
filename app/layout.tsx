import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Arcky-Tech",
  description: "Built with Next.js",
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
