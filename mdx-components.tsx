import type { MDXComponents } from "mdx/types";
import LinkWithPreview from "./components/LinkWithPreview";
import { ImageWithCaption } from "./components/ImageWithCaption";
import { CodeBlock, InlineCode } from "./components/CodeBlock";
import { Callout } from "./components/Callout";
import { TextColor as TC } from "./components/TextColor"
import { DocsHeader as Header } from "./components/documentations/DocsHeader";
import {DocsTable as Table} from "./components/documentations/DocsTable";
import { DocsPokeMarketSpeeches as PMSpeeches } from "./components/documentations/DocsPokeMarketSpeeches";
import { DocsShelfSpeeches as SHSpeeches } from "./components/documentations/DocsShelfSpeeches";
import { DocsSpeciesSpeeches as SPSpeeches } from "./components/documentations/DocsSpeciesSpeeches";
import EmblaCarousel from "./components/EmblaCarousel";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="head1">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="head2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="head3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-white text-base font-normal text-left">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-base font-normal text-left marker:text-white mt-2" style={{ listStyleType: "revert"}}>{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="text-base font-normal text-left marker:text-white mt-2" style={{ listStyleType: "decimal"}}>{children}</ol>
    ),
    li: ({ children }) => (
      <li className="ml-6 text-gray-300 leading-relaxed text-md mb-2 break-words">{children}</li>
    ),
    code:({children}) => (
      <InlineCode>{children}</InlineCode>
    ),
    pre:({children}: any) => {
      const codeString = children?.props?.children ?? "";
      const language = children?.props?.className?.replace("language-", "") ?? "text";
      return <CodeBlock language={language}>{codeString}</CodeBlock>
    },
    hr: () => (
      <hr className="horRule"/>
    ),
    a: (props) => <LinkWithPreview {...props} />,
    strong: ({children}) => (
      <strong className="text-blue-300">{children}</strong>
    ),
    em: ({children}) => (
      <em className="text-gray-200">{children}</em>
    ),
    Bl: ({children}) => (
      <TC color="blue-400">{children}</TC>
    ),
    Gn: ({children}) => (
      <TC color="green-500">{children}</TC>
    ),
    Rd: ({children}) => (
      <TC color="red-600">{children}</TC>
    ),
    Gy: ({children}) => (
      <TC color="gray-300">{children}</TC> 
    ),
    Ye: ({children}) => (
      <TC color="yellow-400">{children}</TC>
    ),
    Or: ({children}) => (
      <TC color="orange-400">{children}</TC>
    ),
    Header,
    ImageWithCaption,
    Callout,
    TC,
    Table,
    PMSpeeches,
    SHSpeeches,
    SPSpeeches,
    EmblaCarousel,
    ...components
  }
}