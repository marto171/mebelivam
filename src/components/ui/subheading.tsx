import { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeadingProps extends HTMLAttributes<HTMLHeadElement> {
    children?: ReactNode
}

export const Subheading = ({ children, className, ...props }: HeadingProps) => {
    return <span className={cn("inline-block text-brand-500 font-bold text-sm sm:text-base md:text-lg mb-3 tracking-widest uppercase", className)}{...props}>
        {children}
    </span>
}