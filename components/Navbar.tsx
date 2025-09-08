"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { signIn, signOut } from "next-auth/react";
import ColorButton from "./ColorButton";
import NavbarItem from "./NavbarItem";
import type { Session } from "next-auth";

export default function Navbar({session}: {session?: Session | null}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false); 
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTinyScreen, setIsTinyScreen] = useState(false);
  const pathname = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const isHomePage = pathname === '/'; 
  const isDoggoBotPage = pathname.startsWith('/doggo-bot');
  const isDocumentationPage = pathname.startsWith('/documentation/');
  const isScoreBoardPage = pathname.startsWith('/scoreboard');
  const hasSideNav = pathname.startsWith('/doggo-bot/dashboard') || pathname.startsWith('/documentation') || pathname.startsWith('/doggo-bot/database');

  useEffect(() => {
    setHydrated(true);
    if (sessionStorage.getItem("discord-login-in-progress")) {
      setLoginInProgress(true);
    }
  }, []);

  useEffect(() => {
    if (session) {
      sessionStorage.removeItem("discord-login-in-progress");
      setLoginInProgress(false);
    }
  }, [session]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setIsShrunk((scrollPosition > 100 || hasSideNav || isScoreBoardPage) || window.innerWidth <= 320);
    };

    const updateIsSmallScreen = () => {
      setIsSmallScreen(window.innerWidth < 1024);
      setIsTinyScreen(window.innerWidth < 321);
      return [isSmallScreen, isTinyScreen];
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateIsSmallScreen);

    handleScroll();
    updateIsSmallScreen();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateIsSmallScreen);
    }

  }, [pathname, hasSideNav, isSmallScreen, isScoreBoardPage]);

  const handleDiscordLogin = () => {
    if (loginInProgress) {
      console.warn("Login already in progress");
      return;
    }

    localStorage.setItem("discord-login-in-progress", "true");
    setLoginInProgress(true);

    setTimeout(() => {
      localStorage.removeItem("discord-login-in-progress");
      setLoginInProgress(false);
    }, 30000);

    signIn("discord", { callbackUrl: "/doggo-bot/servers" });
  };

  return (
    <nav
      id="navbar"
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
              ? "lg:text-2xl text-xl"
              : "lg:text-3xl text-2xl"
            } font-bold transition-all duration-300 ease-in-out ${
            isHomePage
              ? isScrolled
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[-20px]"
              : "opacity-100"
          }`}
        >
          <Link href="/" className="hover:text-gray-400 transition-all duration-300 ease-in-out">{!isTinyScreen ? "Arcky-Tech" : ""}</Link>
        </h1>
        {/* Icons and Name (desktop only) */}
        <div className={`flex ${isSmallScreen ? 'space-x-4' : 'space-x-5' }`}>
          <NavbarItem
            href="/"
            icon="HomeIcon"
            text="Home"
            isSmallScreen={isSmallScreen}
            isShrunk={isShrunk}
          />
          <NavbarItem
            href="/projects"
            icon="BriefcaseIcon"
            text="Projects"
            isSmallScreen={isSmallScreen}
            isShrunk={isShrunk}
          />
          <NavbarItem
            href="https://discord.gg/HK99jTNqS2"
            icon="ChatBubbleLeftRightIcon"
            text="Discord"
            isSmallScreen={isSmallScreen}
            isShrunk={isShrunk}
          />
          {isDocumentationPage && (
            <NavbarItem
              href="/documentation"
              icon="BookOpenIcon"
              text="Documentation"
              isSmallScreen={isSmallScreen}
              isShrunk={isShrunk}
            />
          )}
          {isDoggoBotPage ? (
            <>
              <NavbarItem
                href={`${session ? "/doggo-bot/servers" : "#"}`}
                icon="ChartBarIcon"
                text="Dashboard"
                isSmallScreen={isSmallScreen}
                isShrunk={isShrunk}
                action={(e) => {
                  if (!session) {
                    e.preventDefault();
                    signIn('discord', { callbackUrl: "/doggo-bot/servers" });
                  }
                }}
              />
              <NavbarItem
                href="/documentation/doggo-bot"
                icon="BookOpenIcon"
                text="Documentation"
                isSmallScreen={isSmallScreen}
                isShrunk={isShrunk}
              />
            </>
          ) : (
            <>
              {(!isDocumentationPage || (isDocumentationPage && !isSmallScreen)) && (
                <>
                  <NavbarItem
                    href="/about"
                    icon="InformationCircleIcon"
                    text="About"
                    isSmallScreen={isSmallScreen}
                    isShrunk={isShrunk}
                  />
                  <NavbarItem
                    href="/contact"
                    icon="UsersIcon"
                    text="Contact"
                    isSmallScreen={isSmallScreen}
                    isShrunk={isShrunk}
                  />
                </>
              )}
            </>
          )}
          {/* Auth Buttons */}
          {isDoggoBotPage && (
            session ? (
              <ColorButton
                color="red-600"
                text="Logout"
                action={() => signOut()}
                padding={`${isShrunk ? "px-2 py-1" : "px-2 py-1 lg:px-3 lg:py-2"}`}
              />
            ) : (
              <ColorButton
                color="blue-600"
                text={hydrated && loginInProgress ? "Logging in..." : "Login"}
                disabled={hydrated && loginInProgress}
                action={handleDiscordLogin}
                padding={`${isShrunk ? "px-2 py-1" : "px-3 py-2"}`}
              />
            )
          )}
        </div>
      </div>
    </nav>
  );
}

