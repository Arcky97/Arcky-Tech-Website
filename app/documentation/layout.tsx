"use client"
import Sidebar from "@/components/Sidebar"
import { doggoBotMenu, graphicsTransparencyMenu, pokeMarketMenu, regionMapMenu, vendingMachineMenu } from "@/config";
import { usePathname } from "next/navigation";

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    doggoBotMenu,
    regionMapMenu,
    pokeMarketMenu,
    graphicsTransparencyMenu,
    vendingMachineMenu
  ];

  const menuItemToUse = pathname.startsWith('/documentation/') 
    ? menuItems.filter(menuItem => pathname.includes(menuItem.name))
    : menuItems.map(({ ...rest }) => rest )
  
  return (
    <div className="flex h-full">
      <Sidebar menuItems={menuItemToUse} mainDocs={!pathname.startsWith('/documentation/')}/>
      <>
        {children}
      </>
    </div>
  );
}