import type { Metadata } from "next";
import "./globals.css";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";
import PageVisitTracker from "@/components/PageVisitTracker";
import ReloadOnActionError from "./global-error";

export const metadata: Metadata = {
  title: "Arcky-Tech",
  description: "A collection of Arcky's Projects, Documentation and a Dashboard.",
  icons: {
    icon: "favicon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full">
        <ReloadOnActionError />
        <PageVisitTracker />
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}
