"use client";
import LinkWithPreview from "../LinkWithPreview";
import { useResponsiveColumns } from "@/hooks/useResponsiveColumns";

type Item = {
  title: string;
  anchorId: string;
};

type Props = {
  items: Item[];
  offset?: number;
}

export default function DocsTableOfContents({ items, offset = 60 }: Props) {
  const columns = useResponsiveColumns(Math.ceil(items.length / 15));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.classList.add("highlight-blink");
      setTimeout(() => element.classList.remove("highlight-blink"), 2000);
    } else {
      return;
    }

    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    history.pushState(null, "", `#${id}`);
  };

  return (
    <div className="w-full flex justify-left">
      <ul 
        className="pb-4 space-y-2 list-disc list-inside [&>li]:break-inside-avoid"
        style={{
          columnCount: columns,
          columnGap: "2rem",
        }}  
      >
        {items.map(({ title, anchorId }) => (
          <li key={anchorId}>
            <LinkWithPreview
              href={`#${anchorId}`}
              className="text-blue-400 hover:underline"
              onClick={(e) => handleClick(e, anchorId)}
            >
              {title}
            </LinkWithPreview>
          </li>
        ))}
      </ul>
    </div>

  )
}