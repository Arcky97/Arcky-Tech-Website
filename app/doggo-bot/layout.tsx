import { ReactNode } 
from "react"; 
import Navbar from "@/components/Navbar"; 
import { CookieBanner } from "@/components/CookieBanner"; 
import { BackToTopButton } from "@/components/BackToTopButton"; import Footer from "@/components/Footer"; 

export default async function DoggoBotLayout({ 
  children
}: { 
  children: ReactNode; 
}) {

  return ( 
    <>
      <Navbar/> 
      <CookieBanner /> 
      <main className="flex-1 bg-gray-900 pt-12"> 
        {children} 
      </main> 
      <BackToTopButton /> 
      <Footer /> 
    </>

  ) 
}