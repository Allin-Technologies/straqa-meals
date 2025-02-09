"use client";

import * as React from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
  type MotionProps,
} from "framer-motion";

const variants: Variants = {
  hidden: { y: "-90%" },
  visible: { y: "1%" },
};

export const HeaderClient: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { scrollY } = useScroll();
  const lastYRef = React.useRef(0);
  const [isHidden, setIsHidden] = React.useState(false);

  useMotionValueEvent(scrollY, "change", function (y) {
    const diff = y - lastYRef.current;
    if (Math.abs(diff) > 50) {
      setIsHidden(diff > 50);

      lastYRef.current = y;
    }
  });

  return (
    <header className='fixed w-screen z-50'>
      <motion.div
        animate={isHidden ? "hidden" : "visible"}
        whileHover='visible'
        onFocusCapture={() => setIsHidden(false)}
        variants={variants}
        transition={{ duration: 0.4 }}
        className='w-full backdrop-blur-sm'
      >
        {children}
      </motion.div>
    </header>
  );
};
