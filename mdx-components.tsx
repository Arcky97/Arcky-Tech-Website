import type { MDXComponents } from "mdx/types";
import LinkWithPreview from "./components/LinkWithPreview";
import { ImageWithCaption } from "./components/ImageWithCaption";
import { MediaGallery } from "./components/MediaGallery";
import { CodeBlock, InlineCode } from "./components/CodeBlock";
import { Callout } from "./components/Callout";
import { TextColor as TC } from "./components/TextColor"
import { DocsHeader as Header } from "./components/documentations/DocsHeader";
import {DocsTable as Table} from "./components/documentations/DocsTable";
import { DocsPokeMarketSpeeches as PMSpeeches } from "./components/documentations/DocsPokeMarketSpeeches";
import { DocsShelfSpeeches as SHSpeeches } from "./components/documentations/DocsShelfSpeeches";
import { DocsSpeciesSpeeches as SPSpeeches } from "./components/documentations/DocsSpeciesSpeeches";
import EmblaCarousel from "./components/EmblaCarousel";
import YouTubeEmbed from "./components/YouTubeEmbed";
import ColorButton from "./components/ColorButton";
import { SettingsVersions as SetVer } from "./components/documentations/SettingsVersions";
import { DocsVersionBlock as VerBlock } from "./components/documentations/DocsVersionBlock";
import React from "react";
import { DocsInputText as InputText } from "./components/documentations/docInputs/DocsInputText";
import { DocsInputNumber as InputNumber } from "./components/documentations/docInputs/DocsInputNumber"
import { DocsInputSelect as InputSelect } from "./components/documentations/docInputs/DocsInputSelect";
import { DocsInputMultiSelect as InputMultiSelect } from "./components/documentations/docInputs/DocsInputMultiSelect";
import { DocsInputToggle as InputToggle } from "./components/documentations/docInputs/DocsInputToggle"
import { DocsInputTextArea as InputTextArea } from "./components/documentations/docInputs/DocsInputTextArea";

function wrapWithKeys(children: React.ReactNode) {
  return React.Children.map(children, (child, i) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, { key: i });
  });
}

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
      <ul className="text-base font-normal text-left marker:text-white mt-2" style={{ listStyleType: "revert"}}>
        {wrapWithKeys(children)}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-base font-normal text-left marker:text-white mt-2" style={{ listStyleType: "decimal"}}>
        {wrapWithKeys(children)}
      </ol>
    ),
    li: ({ children }) => (
      <li className="ml-6 text-gray-300 leading-relaxed text-md mb-2 wrap-break-word">{children}</li>
    ),
    code:({children}) => (
      <InlineCode>{children}</InlineCode>
    ),
    pre:({children}) => {
      const codeString = children?.props?.children ?? "";
      const className = children?.props?.className ?? "";

      let language = "text";
      let filename: string | undefined;

      if (className.startsWith("language-")) {
        const parts = className.replace("language-", "").split(":");
        language = parts[0];
        if (parts[1]) filename = parts[1];
      }
      return <CodeBlock language={language} filename={filename}>{codeString}</CodeBlock>
    },
    hr: () => (
      <hr className="horRule"/>
    ),
    a: (props) => <LinkWithPreview {...props} />,
    strong: ({children}) => (
      <strong className="text-blue-300">{children}</strong>
    ),
    em: ({children}) => (
      <em className="text-orange-100">{children}</em>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-200 my-4 bg-linear-85 from-gray-800/80 to-gray-900">
        {children}
      </blockquote>
    ),
    Bl: ({children}) => (
      <TC color="blue-400">{children}</TC>
    ),
    Gr: ({children}) => (
      <TC color="green-500">{children}</TC>
    ),
    Rd: ({children}) => (
      <TC color="red-600">{children}</TC>
    ),
    Gy: ({children}) => (
      <TC color="gray-300">{children}</TC> 
    ),
    Yl: ({children}) => (
      <TC color="yellow-400">{children}</TC>
    ),
    Or: ({children}) => (
      <TC color="orange-400">{children}</TC>
    ),
    Cen: ({children}) => (
      <div className="text-center mt-5">{children}</div>
    ),
    Header,
    ImageWithCaption,
    MediaGallery,
    Callout,
    TC,
    Table,
    PMSpeeches,
    SHSpeeches,
    SPSpeeches,
    YouTubeEmbed,
    EmblaCarousel,
    ColorButton,
    SetVer,
    VerBlock,
    InputText,
    InputNumber,
    InputSelect,
    InputMultiSelect,
    InputToggle,
    InputTextArea,
    ...components
  }
}