import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className = "",
            variant = "primary",
            size = "md",
            isLoading = false,
            fullWidth = false,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

        const variants = {
            primary: "bg-[#1A4AFF] text-white hover:bg-[#1539cc] shadow-lg shadow-[#1A4AFF]/25 border border-transparent",
            secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-md border border-transparent",
            outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-[#1A4AFF] hover:text-[#1A4AFF]",
            ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        };

        const sizes = {
            sm: "h-9 px-4 text-xs",
            md: "h-11 px-6 text-sm",
            lg: "h-14 px-8 text-base",
        };

        const widthClass = fullWidth ? "w-full" : "";

        // Combine classes manually since we don't have clsx/tailwind-merge
        const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

        return (
            <button
                ref={ref}
                className={combinedClassName}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
