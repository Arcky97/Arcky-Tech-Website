import Link from "next/link";
import * as Icons from "@heroicons/react/24/outline";
import { ComponentType, SVGProps } from "react";

interface NavbarItemProp  {
  href: string;
  icon?: keyof typeof Icons;
  text?: string;
  isSmallScreen?: boolean;
  isShrunk?: boolean;
  action?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function NavbarItem({href, icon, text, isSmallScreen, isShrunk, action}: NavbarItemProp ) {
  const iconSizes = isSmallScreen 
    ? { 
      normal: 'w-6 h-6', 
      shrunk: 'w-5 h-5'
    } : { 
      normal: 'w-7 h-7', 
      shrunk: 'w-6 h-6' 
    };

  const IconComp = Icons[icon || "HomeIcon"] as ComponentType<SVGProps<SVGSVGElement>>;
  return (
    <>
      <Link
        href={href}
        className="flex items-center space-x-2 hover:text-gray-400"
        onClick={action}
      >
        <IconComp className={`${isShrunk ? iconSizes.shrunk : iconSizes.normal} transition-all duration-300 ease-in-out`}/>
        {!isSmallScreen && (<span className={`${isShrunk ? "text-md" : 'text-lg'} transition-all duration-300 ease-in-out`}>{text}</span>)}
      </Link>
    </>
  )
}