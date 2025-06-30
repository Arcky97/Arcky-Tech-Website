"use client";
import { JSX, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/outline";

interface MenuItem {
  name?: string;
  path: string;
  icon?: JSX.Element;
  text: string;
  subItems?: MenuItem[];
}

export default function Sidebar({ menuItems, mainDocs }: { menuItems: MenuItem[]; mainDocs?: boolean }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();
  const hasScrolledToActive = useRef(false);

  const isDashboard = pathname.startsWith("/doggo-bot/dashboard");
  const isDocumentation = pathname.startsWith("/documentation");
  const isDatabasePage = pathname.startsWith("/doggo-bot/database");

  // Automatically get /documentation/[project] base path
  const basePath = (() => {
    if (isDocumentation || isDatabasePage) {
      const segments = pathname.split("/").filter(Boolean);
      return `/${segments.slice(0, 2).join("/")}`; // e.g., "/documentation/doggo-bot"
    } else {
      const segments = pathname.split('/').filter(Boolean);
      return `/${segments.slice(0, 3).join('/')}`;
    };
  })();

  const toggleSidebarVisibility = () => setIsSidebarVisible((prev) => !prev);

  useEffect(() => {
    const updateIsSmallScreen = () => {
      setIsSmallScreen(window.innerWidth < 1024);
      setIsSidebarVisible(window.innerWidth > 1024);
    };

    window.addEventListener("resize", updateIsSmallScreen);
    updateIsSmallScreen();

    return () => {
      window.removeEventListener("resize", updateIsSmallScreen);
    };
  }, [pathname]);

  useEffect(() => {
    const splitPath = pathname.split('/');
    const basePath = splitPath.slice(0, 3).join('/');
    toggleSubmenu(`${basePath}/`, true);
    let newPath = basePath;
    splitPath.slice(3, -1).forEach(path => {
      newPath += `/${path}`;
      toggleSubmenu(newPath, true);
    });
  }, [pathname, menuItems]);

  useEffect(() => {
    if (hasScrolledToActive.current) return;

    const scrollSidebarToActiveItem = () => {
      const sidebar = document.getElementById("sidebar");
      if (!sidebar) return;
      const activeItems = Array.from(sidebar.querySelectorAll(".bg-blue-900"));
      if (activeItems.length === 0) return

      const deepestActive = activeItems[activeItems.length - 1];
      const sidebarRect = sidebar.getBoundingClientRect();
      const activeRect = deepestActive.getBoundingClientRect();
      const offsetTop = activeRect.top - sidebarRect.top + sidebar.scrollTop - 100;
      sidebar.scrollTo({ top: offsetTop, behavior: "smooth" });
      hasScrolledToActive.current = true;
    };

    setTimeout(scrollSidebarToActiveItem, 100);
  }, [pathname]);

  const toggleSubmenu = (path: string, value?: boolean) => {
    setExpandedMenu((prev) => ({
      ...prev,
      [path]: value ? value : !prev[path],
    }));
  };

  const handleClick = async (e: any, path: string, subPath: string) => {
    e.preventDefault();
    const applyHighlightEffect = (id: string) => {
      const target = document.getElementById(id);
      if (target) {
        target.classList.add("highlight-blink");
        setTimeout(() => target.classList.remove("highlight-blink"), 2000);
      }
    };

    const target = document.getElementById(subPath.replace("#", ""));
    if (target) {
      const offset = 90;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      applyHighlightEffect(subPath.replace("#", ""));
    }

    if (window.innerWidth < 1024) {
      setIsSidebarVisible(false);
    }

    history.pushState(null, "", path);
  };

  const renderMenuItems = (items: MenuItem[], parentPath = "") => {
    return items.map(({ name, path, icon, text, subItems }) => {
      const isHashLink = path.startsWith("#");
      const isAbsolutePath = path.startsWith("/");
      if (mainDocs && name) path = name;
      const prefix = parentPath || basePath;
      const normalizePath = (base: string, sub: string) =>
        `${base.replace(/\/$/, "")}/${sub.replace(/^\//, "")}`;
      // In renderMenuItems:
      const fullPath = isHashLink
        ? normalizePath(prefix, path) // For hash links
        : isAbsolutePath
          ? path
          : prefix
            ? normalizePath(prefix, path)
            : path;
      const isDeepest = !subItems || subItems.length === 0;
      const isActive = isDeepest
        ? pathname === fullPath
        : pathname.startsWith(fullPath + '/') || pathname === fullPath || path === '';
      const isExpanded = expandedMenu[fullPath];
      return (
        <div key={fullPath} className="w-full">
          <div
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700 cursor-pointer ${
              isActive ? "bg-blue-900" : "hover:bg-blue-700"
            }`}
          >
            {isDeepest && isHashLink ? (
              <Link
                href={fullPath.replace('/#', '#')}
                className="flex items-center gap-3"
                onClick={(e) => handleClick(e, fullPath.replace('/#', '#'), path)}
              >
                {icon}
                <span className="transition-opacity duration-300 ease-in-out">{text}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3 w-full">
                <Link href={fullPath} className="flex items-center gap-3 flex-grow">
                  {icon}
                  <span className="transition-opacity duration-300 ease-in-out">{text}</span>
                </Link>
                {!isDeepest && (
                  <button
                    onClick={() => toggleSubmenu(fullPath)}
                    className="p-1 rounded hover:bg-blue-600 transition-colors"
                    aria-label="Toggle Submenu"
                  >
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
                        isExpanded ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                )}
              </div>
            )}
          </div>

          {subItems && (
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-[9000px]" : "max-h-0"
              }`}
            >
              <div className="ml-6 pt-2">{renderMenuItems(subItems, fullPath)}</div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <nav className="flex min-h-screen transition-all duration-300 ease-in-out">
      {/* Sidebar */}
      <div
        className={`border-r border-y rounded-r-lg border-gray-700 top-0 mt-20 fixed left-0 h-[calc(100vh-var(--navbar-height))] z-51 transition-all duration-300 bg-gray-800 text-white flex flex-col ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-200`}
      >
        <div id="sidebar" className="flex-1 overflow-y-auto">{renderMenuItems(menuItems)}</div>
      </div>

      {/* Overlay on Small Screens */}
      <div
        className={`fixed inset-0 bg-black/50 lg:hidden z-40 transition-opacity duration-300 ease-in-out ${
          isSidebarVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarVisible(false)}
      ></div>

      {/* Main Content Wrapper */}
      <div
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{
          marginLeft: 
            isSidebarVisible
              ? isDashboard && !isSmallScreen 
                ? "232px"
                : isDocumentation && !isSmallScreen
                  ? "342px"
                  : isDatabasePage && !isSmallScreen
                    ? "252px"
                    : "0px"
              : "0px",
        }}
      >
        {/* Sidebar Toggle Button */}
        <div className="h-0 bg-gray-900 flex items-center">
          <button
            className="fixed top-5 left-3 z-50 bg-gray-900 p-2 rounded-md flex flex-col justify-center items-center space-y-1 group"
            onClick={toggleSidebarVisibility}
          >
            <span
              className={`block w-6 h-1 bg-white transition-transform duration-300 ease-in-out ${
                isSidebarVisible
                  ? "group-hover:rotate-[-45deg] group-hover:translate-y-[0px]"
                  : "group-hover:rotate-[45deg] group-hover:translate-y-[0px]"
              } group-hover:scale-110`}
            ></span>
            <span className="block w-6 h-1 bg-white transition-opacity duration-300 ease-in-out group-hover:opacity-0"></span>
            <span
              className={`block w-6 h-1 bg-white transition-transform duration-300 ease-in-out ${
                isSidebarVisible
                  ? "group-hover:rotate-[45deg] group-hover:-translate-y-[0px]"
                  : "group-hover:rotate-[-45deg] group-hover:-translate-y-[0px]"
              } group-hover:scale-110`}
            ></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
