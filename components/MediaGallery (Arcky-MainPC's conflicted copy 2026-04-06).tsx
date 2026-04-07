"use client"
import React, { useEffect } from 'react';

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type Align = "left" | "center" | "right";
type Size = "full" | "tiny" | "small" | "medium" | "large";

const alignMargins: Record<Align, string> = {
  left: "ml-0",
  center: "mx-auto",
  right: "ml-auto"
};

const sizeValues: Record<Size, string> = {
  full: "max-w-full",
  tiny: "max-w-1/5",
  small: "max-w-2/5",
  medium: "max-w-3/5",
  large: "max-w-4/5"
}

export interface MediaItem {
  src: string;
  alt?: string;
  width: number;
  height: number;
  type?: "image" | "video";
}

interface MediaGalleryProps {
  id: string;
  items: MediaItem[];
  size: Size;
  align: Align;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ id, items, size, align }) => {

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + id,
      children: 'Link',
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <div
      className={clsx("pswp-gallery my-5 grid gap-3",
        sizeValues[size],
        alignMargins[align],
        items.length === 1
          ? "grid-cols-1"
          : items.length === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-2 lg:grid-cols-3"

      )}
      id={id}
    >
      {items.map((item, idx) => {
        const isVideo = item.type === "video" || item.src.match(/\.(mp4|webm|ogg)$/i);
        return (
          <>
            <Link 
              href={item.src}
              data-pswp-width={item.width}
              data-pswp-height={item.height}
              key={`media-${idx}`}
              target='_blank'
              rel="noreferrer"
            >
              {isVideo ? (
                <video
                  src={item.src}
                  style={{ width: 350, margin: 5 }}
                  controls={false}
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt || ""}
                  width={item.width}
                  height={item.height}
                />
              )}
              {item.alt && (
                <p key={idx} className="text-center text-[#ccc] text-sm mt-2">{item.alt}</p>
              )}
            </Link>

          </>
        ) 
       })}
    </div>
  )
}