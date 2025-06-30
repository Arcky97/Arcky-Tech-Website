"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";

type Align = "left" | "center" | "right";
type Size = "full" | "small" | "medium" | "large";

const alignMargins: Record<Align, string> = {
  left: "ml-0",
  center: "mx-auto",
  right: "ml-auto"
};

const sizeValues: Record<Size, string> = {
  full: "max-w-full",
  small: "max-w-2/5",
  medium: "max-w-3/5",
  large: "max-w-4/5"
};

export const ImageWithCaption = ({
  src,
  alt,
  caption,
  align = "center",
  size = "medium"
}: {
  src: string;
  alt?: string;
  caption?: string;
  align?: Align;
  size?: Size;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [thumbnailRect, setThumbnailRect] = useState<DOMRect | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const modalImgRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setThumbnailRect(rect);
    }
    setShowModal(true);
    setTimeout(() => setIsOpen(true), 10);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setShowModal(false);
      setThumbnailRect(null);
    }, 200);
  };

  useEffect(() => {
    setTimeout(() => {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, 150)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Normal Image with Caption */}
      <figure className={clsx("my-5", sizeValues[size], alignMargins[align])}>
        <Image
          ref={imageRef}
          src={src}
          alt={alt ?? "Image not found"}
          className="rounded-lg border-white w-full cursor-pointer select-none cursor-zoom-in"
          onClick={handleOpen}
        />
        {caption && (
          <figcaption className="text-center text-[#ccc] text-sm mt-2">
            {caption}
          </figcaption>
        )}
      </figure>
      {/* Fullscreen Zoom Modal */}
      {showModal && thumbnailRect && (
        <div
          className={`z-150 w-full h-full inset-0 fixed bg-tint-base/4 backdrop-blur-xl ${isOpen ? 'opacity-100' : 'opacity-0'} transition-all duration-500 ease-in-out`}
          onClick={handleClose}
        >
          <div
            ref={modalImgRef}
            className={clsx(
              "absolute transition-all duration-300 ease-in-out p-5"
            )}
            style={{
              top: isOpen ? "0" : `${thumbnailRect.top}px`,
              left: isOpen ? "0" : `${thumbnailRect.left}px`,
              width: isOpen ? "100vw" : `${thumbnailRect.width}px`,
              height: isOpen ? "100vh" : `${thumbnailRect.height}px`,
              transform: isOpen
                ? "translate(0, 0) scale(1)"
                : "translate(0, 0) scale(1)",
            }}
          >
            <Image
              src={src}
              alt={alt || ""}
              className="w-full h-full object-contain rounded-lg mx-auto select-none cursor-zoom-out"
            />
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-white text-3xl font-bold"
              aria-label="Close Image"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};


