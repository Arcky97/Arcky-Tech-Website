"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { signIn, signOut, useSession } from "next-auth/react";
import { HomeIcon, BriefcaseIcon, UsersIcon, ChatAltIcon, InformationCircleIcon, ChartBarIcon, BookOpenIcon, DatabaseIcon } from "@heroicons/react/outline"; // Importing Heroicons

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false); 
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathname = usePathname(); 
  const { data: session } = useSession();
  const navbarRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === '/'; 
  const isDoggoBotPage = pathname.startsWith('/doggo-bot');
  const isServerSelectPage = pathname.startsWith('/doggo-bot/servers');
  const isDocumentationPage = pathname.startsWith('/documentation/');
  const hasSideNav = pathname.startsWith('/doggo-bot/dashboard') || pathname.startsWith('/documentation') || pathname.startsWith('/doggo-bot/database');
  const iconSizes = isSmallScreen ? { normal: 'w-6 h-6', shrunk: 'w-5 h-5' } : { normal: 'w-7 h-7', shrunk: 'w-6 h-6' };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setIsShrunk(scrollPosition > 100 && !hasSideNav);
    };

    const updateIsSmallScreen = () => {
      setIsSmallScreen(window.innerWidth < 1024);
      return isSmallScreen;
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateIsSmallScreen);

    handleScroll();
    updateIsSmallScreen();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateIsSmallScreen);
    }

  }, [pathname]);

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full bg-gray-900 text-white ${
        isScrolled ? "shadow-md transition-shadow duration-300 ease-in-out" : ""
      } z-50`}
    >
      {/* Main Navbar */}
      <div
        className={`w-full px-4 lg:px-10 flex justify-between items-center transition-all duration-300 ease-in-out ${
          isShrunk ? "h-12" : "h-20" 
        } ${hasSideNav ? 'pl-14 lg:pl-14' : '' }`}
      >
        {/* Logo (Arcky-Tech) */}
        <h1
          className={`${
            isShrunk
              ? "text-2xl"
              : "text-3xl"
            } font-bold transition-all duration-300 ease-in-out ${
            isHomePage
              ? isScrolled
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[-20px]"
              : "opacity-100"
          }`}
        >
          <Link href="/" className="hover:text-gray-400 transition-all duration-300 ease-in-out">Arcky-Tech</Link>
        </h1>

        {/* Desktop Navigation (Icons + Text) */}
        <div className={`flex ${isSmallScreen ? 'space-x-4' : 'space-x-5' }`}>
          <Link href="/" className="flex items-center space-x-2 hover:text-gray-400">
            <HomeIcon className={`${isShrunk ? iconSizes.shrunk : iconSizes.normal} transition-all duration-300 ease-in-out`} />
            {!isSmallScreen && (<span className={`${ isShrunk ? 'text-md' : 'text-lg'} transition-all duration-300 ease-in-out`}>Home</span>)}
          </Link>
          <Link href="/projects" className="flex items-center space-x-2 hover:text-gray-400">
            <BriefcaseIcon className={`${isShrunk ? iconSizes.shrunk : iconSizes.normal} transition-all duration-300 ease-in-out`} />
            {!isSmallScreen && (<span className={`${ isShrunk ? 'text-md' : 'text-lg'} transition-all duration-300 ease-in-out`}>Projects</span>)}
          </Link>
          <Link href="https://discord.gg/4SrZTuYj26" className="flex items-center space-x-2 hover:text-gray-400">
            <ChatAltIcon className={`${isShrunk ? iconSizes.shrunk : iconSizes.normal} transition-all duration-300 ease-in-out`} />
            {!isSmallScreen && (<span className={`${ isShrunk ? 'text-md' : 'text-lg'} transition-all duration-300 ease-in-out`}>Discord</span>)}
          </Link>
          {isDocumentationPage && (
            <Link href={`/documentation`} className="flex items-center space-x-2 hover:text-gray-400">
              <BookOpenIcon className={`${isShrunk ? iconSizes.shrunk : iconSizes.normal} transition-all duration-300 ease-in-out`}/>
              {!isSmallScreen && (<span className={`${ isShrunk ? 'text-md' : 'text-lg' } transition-all duration-300 ease-in-out`}>Documentation</span>)}
            </Link>
          )}
          {isDoggoBotPage ? (
            <>
              <Link 
                href={`${session ? "/doggo-bot/servers" : "#" }`}
                onClick={(e) => {
                  if (!session) {
                    e.preventDefault();
                    signIn('discord', { callbackUrl: "/doggo-bot/servers" });
                  }
                }}
                className="flex items-center space-x-2 hover:text-gray-400"
              >
                <ChartBarIcon className={`${isShrunk ? iconSizes.shrunk : iconSizes.normal} transition-all duration-300 ease-in-out`}/>
                {!isSmallScreen && (<span className={`${ isShrunk ? 'text-md' : 'text-lg' } transition-all duration-300 ease-in-out`}>Dashboard</span>)}
              </Link>
              <Link href="/documentation/doggo-bot" className="flex items-center space-x-2 hover:text-gray-400">
                <BookOpenIcon className={`${isShrunk ? iconSizes.shrunk : iconSizes.normal} transition-all duration-300 ease-in-out`}/>
                {!isSmallScreen && (<span className={`${ isShrunk ? 'text-md' : 'text-lg' } transition-all duration-300 ease-in-out`}>Documentation</span>)}
              </Link>
            </>
          ) : (
            <>
              <Link href="/about" className="flex items-center space-x-2 hover:text-gray-400">
                <InformationCircleIcon className={`${isShrunk ? iconSizes.shrunk : iconSizes.normal} transition-all duration-300 ease-in-out`} />
                {!isSmallScreen && (<span className={`${ isShrunk ? 'text-md' : 'text-lg'} transition-all duration-300 ease-in-out`}>About</span>)}
              </Link>
              <Link href="/contact" className="flex items-center space-x-2 hover:text-gray-400">
                <UsersIcon className={`${isShrunk ? iconSizes.shrunk : iconSizes.normal} transition-all duration-300 ease-in-out`} />
                {!isSmallScreen && (<span className={`${ isShrunk ? 'text-md' : 'text-lg'} transition-all duration-300 ease-in-out`}>Contact</span>)}
              </Link>
            </>
          )}
          {isServerSelectPage && !isSmallScreen && (
            <>
              <Link
                href={'/doggo-bot/database'}
                className="flex items-center space-x-2 hover:text-gray-400"
              >
                <DatabaseIcon className={`${isShrunk ? iconSizes.shrunk : iconSizes.normal} transition-all duration-300 ease-in-out`}/>
                {<span className={`${isShrunk ? 'text-md' : 'text-lg'} transition-all duration-300 ease-in-out`}>Database</span>}
              </Link>
            </>
          )}
          {/* Auth Buttons */}
          {isDoggoBotPage && (
            session ? (
              <button
                onClick={() => signOut()}
                className="border border-red-600 bg-red-600 hover:bg-transparent text-white px-3 py-1 rounded-lg text-md transition-all duration-300 ease-in-out cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => signIn("discord", { callbackUrl: "/doggo-bot/servers" })}
                className="border border-blue-600 bg-blue-600 hover:bg-transparent text-white px-3 py-1 rounded-lg text-md transition-all duration-300 ease-in-out cursor-pointer"
                >
                Login
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

