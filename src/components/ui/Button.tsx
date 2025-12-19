"use client";

import { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "large";
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-body font-medium transition-all duration-300 focus-ring rounded-lg disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";

    const variants = {
      primary: `
        bg-gradient-to-b from-burgundy-500 to-burgundy-700
        text-paper-100
        border border-burgundy-400/30
        shadow-[0_4px_16px_rgba(139,41,66,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
        hover:shadow-[0_6px_24px_rgba(139,41,66,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
        hover:from-burgundy-400 hover:to-burgundy-600
        active:from-burgundy-600 active:to-burgundy-800
      `,
      secondary: `
        bg-gradient-to-b from-paper-100 to-paper-200
        text-warm-800
        border border-paper-400/50
        shadow-paper-md
        hover:shadow-paper-lg hover:from-paper-50 hover:to-paper-100
        active:from-paper-200 active:to-paper-300
      `,
      ghost: `
        bg-transparent
        text-paper-200
        border border-paper-200/20
        hover:bg-paper-100/10 hover:border-paper-200/40
        active:bg-paper-100/20
      `,
    };

    const sizes = {
      default: "h-11 px-6 text-base min-w-[44px]",
      large: "h-14 px-10 text-lg min-w-[44px] tracking-wide",
    };

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...props}
      >
        {/* Subtle shine effect */}
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
            transform: 'translateX(-100%)',
            animation: 'none'
          }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
