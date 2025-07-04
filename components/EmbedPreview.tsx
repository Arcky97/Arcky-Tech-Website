import Markdown from "@/lib/markdown/Markdown";
import type { Embed, EmbedField } from "../lib/interfaces";
import { embedPlaceholder } from "@/utils/embedPlaceholder";
import { useSession } from "next-auth/react";

export default function EmbedPreview({ label, embed }: { label?: string, embed: Embed }) {
  const fieldRows: EmbedField[][] = [];

  if (embed?.fields) {
    for (const field of embed.fields) {
      if (
        // If there are no rows.
        fieldRows.length === 0 ||
        // Or the current field is not inline.
        !field.inline ||
        // Or the previous row's field is not inline
        !fieldRows[fieldRows.length - 1][0].inline ||
        // Or the previous row's number of fields is at least 3
        fieldRows[fieldRows.length - 1].length >= 3
      ) {
        // Start a new row
        fieldRows.push([field])
      } else {
        // Otherwise, add the field to the last row
        fieldRows[fieldRows.length - 1].push(field);
      }
    }
  }

  const fieldGridCols: string[] = [];

  for (const row of fieldRows) {
    const step = 12 / row.length;
    for (let i = 1; i < 13; i += step) {
      fieldGridCols.push(`${i}/${i + step}`);
    }
  }
 
  const { data: session } = useSession();

  return (
    <article>
      <label className="block text-white text-lg font-bold mb-2">{label}</label>

      <div
        className="mb-5 bg-[#2f3136] border-l-4 border-solid relative grid w-fit max-w-[520px] box-border rounded leading-[1.375rem]"
        style={{ borderLeftColor: embed?.color || "#202225" }}
      >
        
        <div className="overflow-hidden p-[.5rem_1rem_1rem_.75rem] inline-grid grid-cols-[auto] grid-rows-[auto]">

          {/* Author */}
          {embed?.author && (embed.author.name || embed.author.iconUrl) ? (
            <div className="min-w-0 flex items-center col-[1/1] mt-2">
              {/* Author Icon */}
              {embed.author.iconUrl ? (
                <img
                  className="h-6 w-6 rounded-full mr-2 object-contain"
                  src={embedPlaceholder(embed.author.iconUrl)}
                  alt=""
                />
              ) : null}

              {/* Author Name */}
              <a
                href={embedPlaceholder(embed.author.url || "") || undefined}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                className={`text-white text-sm font-semibold ${
                  embed.author.url
                    ? "hover:underline"
                    : "cursor-text"
                }`}
              >
                {embedPlaceholder(embed.author.name)}
              </a>
            </div> 
          ) : null}

          {/* Title */}
          {embed?.title ? (
            <a
              href={embedPlaceholder(embed.url || "") || undefined}
              target="_blank"
              rel="noopener norefferrer"
              role="button"
              className={`min-w-0 text-white inline-block font-semibold col-[1/1] mt-2 ${
                embed.url
                  ? "hover:underline text-[#00b0f4]"
                  : "cursor-text"
              }`}
            >
              <Markdown type="header">
                {embedPlaceholder(embed.title)}
              </Markdown>
            </a>
          ): null}

          {/* Description */}
          {embed?.description ? (
            <div className="min-w-0 text-sm font-normal whitespace-ore-line col-[1/1] mt-2">
              <Markdown>
                {embedPlaceholder(embed.description)}
              </Markdown>
            </div>
          ): null}

          {/* Fields */}
          {embed?.fields && embed.fields.length ? (
            <div className="min-w-0 grid col-[1/1] mt-2 gap-2">
              {embed.fields.map((field, index) => (
                <div
                  key={index}
                  className="min-w-0 text-sm leading-[1.125rem] font-normal"
                  style={{ gridColumn: fieldGridCols[index] }}
                >
                  {/* Field Name */}
                  <div className="min-w-0 text-white font-semibold mb-0.5">
                    <Markdown type="header">
                      {embedPlaceholder(field.name)}
                    </Markdown>
                  </div>

                  {/* Field Value */}
                  <div className="min-w-0 font-normal whitespace-pre-line">
                    <Markdown>
                      {embedPlaceholder(field.value)}
                    </Markdown>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* Image */}
          {embed?.imageUrl ? (
            <div
              className={`min-w-0 block mt-4 max-w-[400px] max-h-[300px] justify-self-start rounded cursor-pointer overflow-hidden ${
                embed.thumbnailUrl ? "col-[1/3]" : "col-[1/1]"
              }`}
            >
              <img
                className="object-contain max-h-full max-w-full"
                src={embedPlaceholder(embed.imageUrl)}
                alt={embedPlaceholder(embed.imageUrl)}
              />
            </div>
          ) : null}

          {/* Thumbnail */}
          {embed?.thumbnailUrl ? (
            <div className="min-w-0 row-[1/8] col-[2/2] mt-2 ml-4 shrink-0 justify-self-end block max-w-20 max-h-20 rounded-[3px] cursor-pointer overflow-hidden">
              <img
                className="object-contain max-h-full max-w-full"
                src={embedPlaceholder(embed.thumbnailUrl)}
                alt={embedPlaceholder(embed.thumbnailUrl)}
              />
            </div>
          ): null}

          {/* Footer */}
          {embed?.footer && (embed.footer.text || embed.footer.iconUrl) ? (
            <div
              className={`min-w-0 flex items-center mt-2 rows-auto ${
                embedPlaceholder(embed.thumbnailUrl || "") ? "col-[1/3" : "col-[1/1]"
              }`}
            >
              {/* Footer Icon */}
              {embed.footer.iconUrl ? (
                <img
                  className="h-5 w-5 rounded-full mr-2 object-contain"
                  src={embedPlaceholder(embed.footer.iconUrl)}
                  alt=""
                />
              ): null}

              {/* Footer Text */}
              <div className="min-w-0 text-xs font-medium">
                {embedPlaceholder(embed.footer.text)}
                {embed.footer.text && embed.timeStamp ? (
                  <span className="inline-block mx-1">
                    &bull;
                  </span>
                ): null}
                {embed.timeStamp ? "Today at 12:00 PM" : null}
              </div>
            </div>
          ): null}
        </div>
      </div>
    </article>
  );
}