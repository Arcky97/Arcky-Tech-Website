import type { MDXComponents } from "mdx/types";
import LinkWithPreview from "./components/LinkWithPreview";
import { ImageWithCaption } from "./components/ImageWithCaption";
import { CodeBlock, InlineCode } from "./components/CodeBlock";
import { Callout } from "./components/Callout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-white text-3xl lg:text-4xl font-bold text-center">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-white text-2xl lg:text-3xl font-bold text-center mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-white text-lg lg:text-xl font-bold text-left mt-1 mb-2">{children}</h3>
    ),
    header: ({ children }) => (
      <header className="mt-4 text-center">{children}</header>
    ),
    p: ({ children }) => (
      <p className="text-white text-base lg:text-lg font-normal text-left">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-white text-base lg:text-lg font-normal text-left marker:text-white" style={{ listStyleType: "revert"}}>{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="text-white text-base lg:text-lg font-normal text-left marker:text-white" style={{ listStyleType: "initial"}}>{children}</ol>
    ),
    li: ({ children }) => (
      <li className="ml-6 text-white leading-relaxed text-md mb-1"><span className="">{children}</span></li>
    ),
    code:({children}) => <InlineCode>{children}</InlineCode>,
    pre:({children}: any) => {
      const codeString = children?.props?.children ?? "";
      const language = children?.props?.className?.replace("language-", "") ?? "text";
      return <CodeBlock language={language}>{codeString}</CodeBlock>
    },
    hr: () => (
      <hr className="border-gray-600/75 border-t-1 mt-2 mb-4"></hr>
    ),
    a: (props) => <LinkWithPreview {...props} />,
    ImageWithCaption,
    Callout,
    ...components
  }
}