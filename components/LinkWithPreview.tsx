"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function LinkWithPreview({ href = "", children, ...rest }: Props) {
  const [preview, setPreview] = useState<null | React.ReactNode>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!href) return;

    const isExternal = href.startsWith("http");
    const isAnchor = href.startsWith("#");

    if (isExternal) {
      setPreview(
        <>
          <strong className="block">External link:</strong>
          <span className="text-gray-300 break-words">{href}</span>
        </>
      );
    } else if (isAnchor) {
      setPreview(
        <>
          <strong className="block">Jump to section:</strong>
          <span className="text-gray-300">{href.replace("#", "")}</span>
        </>
      );
    } else {
      fetch(href)
        .then((res) => res.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const h1 = doc.querySelector("main header h1")?.textContent || "No title";
          const p = doc.querySelector("main header p")?.textContent || "No Description";
          setPreview(
            <>
              <strong className="block">{h1}</strong>
              <span className="text-gray-300 mt-1 block">{p}</span>
            </>
          );
        });
    }
  }, [href]);

  const showPreview = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsVisible(true), 300);
  };

  const hidePreview = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsVisible(false), 200);
  };

  return (
    <span
      ref={wrapperRef}
      className="relative text-blue-400 hover:text-blue-500 transition-all duration-300 ease-in-out"
      onMouseEnter={showPreview}
      onMouseLeave={hidePreview}
    >
      <Link href={href} {...rest}>
        {children}
      </Link>

      {isVisible && preview ? (
        <span
          className="absolute bottom-full -left-5 z-50 bg-[#1e1e1e] border border-gray-700 text-white text-sm rounded-xl px-4 py-3 min-w-5xs shadow-lg transition-all duration-300 opacity-100"
          onMouseEnter={showPreview}
          onMouseLeave={hidePreview}
        >
          {preview}
        </span>
      ) : (
          <span className="opacity-0"></span>
      )}
    </span>
  );
}
