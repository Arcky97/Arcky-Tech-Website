"use client"
import { ReactNode, useEffect, useState } from "react";
import hljs from "highlight.js/lib/core";

import javascript from "highlight.js/lib/languages/javascript";
import ruby from "highlight.js/lib/languages/ruby";
import json from "highlight.js/lib/languages/json";
import plaintext from "highlight.js/lib/languages/plaintext";

import "highlight.js/styles/github-dark.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("json", json);
hljs.registerLanguage("plaintext", plaintext);

interface CodeBlockProps {
  children: string;
  language?: string;
}

export const CodeBlock = ({ children, language = "text" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [highlightedLines, setHighlightedLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = children.trimEnd().split('\n');

    const highlighted = lines.map(line => {
      try {
        const { value } = hljs.highlight(line, { language, ignoreIllegals: true });
        return value;
      } catch (error) {
        console.error(error);
        return line;
      }
    });

    setHighlightedLines(highlighted);
  }, [children, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative mb-4 overflow-auto text-sm font-mono rounded-lg text-gray-300">
      <div className="pt-2 pb-2 border border-gray-600/75 px-2 leading-relaxed tracking-wider">
        {highlightedLines.map((line, i) => (
          <div
            key={`line-${i}`}
            className="grid grid-cols-[2rem_1fr] gap-2 py-0.5 hover:bg-gray-800 rounded-lg transition-colors duration-200 ease-in-out"
          >
            <div className="text-right pr-2 text-gray-500 select-none">
              {i + 1}
            </div>
            <div
              className="text-left whitespace-pre-wrap -indent-[0.6rem] pl-2"
              dangerouslySetInnerHTML={{ __html: line || " " }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export const InlineCode = ({children}: { children: ReactNode }) => (
  <code
    className="bg-gray-500/5 text-gray-300 px-1 py-1 rounded-md text-sm font-mono tracking-widest"
  >
    {children}
  </code>
)

