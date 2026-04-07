"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { CodeBlock } from "../CodeBlock";

interface DocsVersionBlockProps {
  versions: versionSection[],
  language: string;
  fallbackText?: string;
}

type versionSection = {
  key: string;
  title: string;
  code: string;
  defaultOpen?: boolean;
};

const STORAGE_KEY = "settings_versions_state";

export const DocsVersionBlock = ({
  versions, language, fallbackText = "No version specific code added."
}: DocsVersionBlockProps ) => {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

      const initial: Record<string, boolean> = {};
      versions.forEach(v => {
        initial[v.key] = saved[v.key] ?? v.defaultOpen ?? false;
      });

      setOpenMap(initial);
    } catch {
      const fallback: Record<string, boolean> = {};
      versions.forEach(v => {
        fallback[v.key] = v.defaultOpen ?? false;
      });
      setOpenMap(fallback);
    }
  }, [versions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(openMap));
  }, [openMap]);

  const toggle = (key: string) => {
    setOpenMap(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStyle = (key: string): React.CSSProperties => {
    const el = refs.current[key];
    const isOpen = openMap[key];

    if (!el) return { height: 0, opacity: 0 };

    return {
      height: isOpen ? el.scrollHeight : 0,
      opacity: isOpen ? 1 : 0
    };
  };

  return (
    <div>
      <br/>
      {versions.map(({ key, title, code }) => {{
        const isOpen = openMap[key];

        return (
          <div key={key}>
            <div className="flex items-center">
              <h3 className="head3">{title}</h3>

              <button
                type="button"
                className="pl-3 mt-1 py-2.25 text-gray-300 hover:text-gray-50 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => toggle(key)}
                aria-expanded={isOpen}
                aria-controls={`code-${key}`}
              >
                {isOpen ? "Collapse" : "Expand"}
              </button>
            </div>

            <div
              id={`code-${key}`}
              role="region"
              aria-label={`code block for ${title}`}
              ref={el => {(refs.current[key] = el)}}
              className={clsx(
                "overflow-hidden",
                "transition-all duration-500 ease-in-out",
                "motion-reduce:transition-none"
              )}
              style={getStyle(key)}
            >
              <CodeBlock language={language}>
                {code || fallbackText}
              </CodeBlock>
            </div>
          </div>
        )
      }})}
    </div>
  )
}