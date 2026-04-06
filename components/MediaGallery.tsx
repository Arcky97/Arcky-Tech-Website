"use client"
import React, { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import 'photoswipe/style.css';
import clsx from "clsx";
import Image from "next/image";

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
};

export interface MediaItem {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

interface MediaGalleryProps {
  items: MediaItem[];
  size: Size;
  align: Align;
  backdropOpacity?: number; // optional, default 0.7
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ items, size, align, backdropOpacity = 0.9 }) => {

  useEffect(() => {
    // Initialize PhotoSwipe
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#pswp-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
      showHideAnimationType: "zoom", // smooth zoom
      bgOpacity: backdropOpacity,
      easing: 'cubic-bezier(.4,0,.22,1)',
      zoomAnimationDuration: 300,
      wheelToZoom: true,
      closeOnVerticalDrag: true,
    });
    
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, [backdropOpacity]);

  return (
    <div
      id="pswp-gallery"
      className={clsx(
        "my-5 grid gap-3",
        sizeValues[size],
        alignMargins[align],
        items.length === 1
          ? "grid-cols-1"
          : items.length === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.src}
          data-pswp-width={item.width}
          data-pswp-height={item.height}
          data-caption={item.alt || ""}
        >
          <Image
            src={item.src}
            alt={item.alt || ""}
            width={item.width}
            height={item.height}
            style={{ display: "block" }}
          />
          {item.alt && (
            <p className="text-center text-[#ccc] text-sm mt-2">{item.alt}</p>
          )}
        </a>
      ))}
    </div>
  );
};