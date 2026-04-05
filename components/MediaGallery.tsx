"use client"
import React, { use, useEffect, useRef } from "react";
import LightGallery from 'lightgallery/react';

import lgZoom from "lightgallery/plugins/zoom";
import comment from "lightgallery/plugins/comment"

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
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
  items: MediaItem[];
  size: Size;
  align: Align;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ items, size, align }) => {

  const onOpen = () => {
    const scrollY = window.scrollY * -1; 
    document.body.style.top = `${scrollY}px`; 
    document.body.classList.add("lock-scrollbar"); 
    document.body.style.overflow = "hidden";
  };

  const onClose = () => {
    const scrollY = parseInt(document.body.style.top) * -1; document.body.style.top = ""; document.body.classList.remove("lock-scrollbar"); document.body.style.overflow = ""; window.scrollTo({ top: scrollY || 0, behavior: 'instant' });
  };

  return (
    <LightGallery
      plugins={[lgZoom, comment]}
      speed={500}
      mode="lg-slide"
      download={false}
      easing="easeInOut"
      zoomFromOrigin={true}
      elementClassNames={clsx("my-5 grid gap-3",
        sizeValues[size],
        alignMargins[align],
        items.length === 1
          ? "grid-cols-1"
          : items.length === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-2 lg:grid-cols-3"

      )}
    >
      {items.map((item, idx) => {
        const isVideo = item.type === "video" || item.src.match(/\.(mp4|webm|ogg)$/i);
        return (
          <>
            <Link key={idx} href={item.src} data-sub-html={item.alt || ""} data-lg-size={`${item.width}-${item.height}`}
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
    </LightGallery>
  )
}