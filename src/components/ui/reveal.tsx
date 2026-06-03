"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Закъснение преди старт на анимацията (ms) — за стъпаловиден ефект. */
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
};

/**
 * Лек, без външни зависимости scroll-reveal wrapper (IntersectionObserver + CSS).
 */
export default function Reveal({ children, className, delay = 0, variant = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", `reveal-${variant}`, visible && "is-visible", className)}
    >
      {children}
    </div>
  );
}
