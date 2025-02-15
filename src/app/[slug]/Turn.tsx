// @ts-nocheck
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import $ from "jquery";
import "turn.js";
import { cn } from "@/lib/utils";

// Define options for turn.js
const options = {
  width: 600,
  height: 800,
  autoCenter: true,
  display: "single",
  acceleration: true,
  elevation: 50,
  gradients: !$.isTouch,
  when: {
    turned: function (this: HTMLElement, e: Event, page: number) {
      console.log("Current view: ", $(this).turn("view"));
    },
  },
};

export const Turn: React.FC<
  React.PropsWithChildren & { className?: string }
> = ({ children, className }) => {
  const flipBookRef = React.useRef<any | null>(null);
  //   const isMobile = useIsMobile();

  React.useEffect(() => {
    if (flipBookRef.current) {
      $(flipBookRef.current).turn({
        ...options,
        // display: isMobile ? "single" : "double",
      });
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        $(flipBookRef.current!).turn("previous");
      }
      if (event.key === "ArrowRight") {
        $(flipBookRef.current!).turn("next");
      }
    };

    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      if (flipBookRef.current) {
        $(flipBookRef.current).turn("destroy").remove();
      }
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [options]);

  return (
    <div ref={flipBookRef} className={cn("turn", className)}>
      {children}
    </div>
  );
};

Turn.displayName = "Turn";
