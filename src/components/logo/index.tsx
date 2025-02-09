import * as React from "react";
import LogoSVG from "@/assets/logo.svg";
import { cn } from "@/utilities/ui";

const Logo: React.FC<React.SVGProps<SVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <LogoSVG {...props} className={cn("max-w-[9.375rem] w-full", className)} />
  );
};

export default Logo;
