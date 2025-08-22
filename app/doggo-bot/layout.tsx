import { ReactNode } 
from "react"; 
import { DashboardSessionProvider } from "../provider"; 
import Navbar from "@/components/Navbar"; 
import { CookieBanner } from "@/components/CookieBanner"; 
import { BackToTopButton } from "@/components/BackToTopButton"; import Footer from "@/components/Footer"; 
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/dashboard/auth"; 

export default async function DoggoBotLayout({ 
  children
}: { 
  children: ReactNode; 
}) {

  // defaults to null incase not logged in yet.
  const session = await getServerSession(authOptions) || null; 
  // No redirect on first visit to avoid infinity loop.

  return ( 
    <DashboardSessionProvider session={session}> 
      <Navbar session={session} /> 
      <CookieBanner /> 
      <main className="flex-1 bg-gray-900 pt-12"> 
        {children} 
      </main> 
      <BackToTopButton /> 
      <Footer /> 
    </DashboardSessionProvider> 
  ) 
}