"use client"
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const BackToTopButton = () => {
  const [animationPhase, setAnimationPhase] = useState< "fade-in" | "shown" | "fade-out" | "hidden" >("hidden");
  const [hoverAnimating, setHoverAnimating] = useState(false);
  const phaseRef = useRef(animationPhase);

  useEffect(() => {
    phaseRef.current = animationPhase;
  }, [animationPhase]);

  useEffect(() => {
    const handleShowButton = () => {
      const show = window.scrollY > 150;

      if (show) {
        if (phaseRef.current === "hidden") {
          setAnimationPhase("fade-in");
          setTimeout(() => setAnimationPhase("shown"), 600);
        } else if (phaseRef.current !== "shown") {
          setAnimationPhase("shown");
        }
      } else {
        if (phaseRef.current === "shown") {
          setAnimationPhase("fade-out");
          setTimeout(() => setAnimationPhase("hidden"), 600);
        }
      }
    };

    window.addEventListener("scroll", handleShowButton);

    handleShowButton();

    return () => {
      window.removeEventListener("scroll", handleShowButton);
      setTimeout(() => setAnimationPhase("hidden"), 600);
    }
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAnimationPhase("fade-out");
    setTimeout(() => setAnimationPhase("hidden"), 600);
  };

  const handleMouseEnter = () => {
    setHoverAnimating(true);
    setTimeout(() => setHoverAnimating(false), 750)
  }

  const handleMouseLeave = () => {
    
  }

  if (animationPhase === "hidden") return null;

  const animationClass = {
    "fade-in": "opacity-0 -translate-y-10",
    "shown": "opacity-100 translate-y-0",
    "fade-out": "opacity-0 -translate-y-10",
  }[animationPhase];

  const hoverClass = hoverAnimating ? "ScrollToTopHover" : ""

  return (
    <div 
      className={`fixed bottom-4 right-4 z-60 cursor-pointer transition-all duration-500 ${hoverClass} ${animationClass}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ArrowUpIcon className="w-6 h-6 text-gray-200"/>
    </div>
  )
}