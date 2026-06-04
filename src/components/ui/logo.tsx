import { cn } from "@/lib/utils";

/**
 * Премиум монограм за МебелиВам — „В" върху топъл брандов градиент.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-10 w-10", className)}
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mvGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBA84A" />
          <stop offset="0.55" stopColor="#F5831F" />
          <stop offset="1" stopColor="#D9670E" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#mvGrad)" />
      <text
        x="24"
        y="25.5"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontWeight="700"
        fontSize="27"
        style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
      >
        В
      </text>
    </svg>
  );
}

/**
 * Хоризонтален логотип: монограм + словесна марка.
 */
export function Logo({
  className,
  markClassName,
  textClassName,
  variant = "dark",
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  variant?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <span
        className={cn(
          "font-heading text-2xl font-bold tracking-tight leading-none",
          variant === "light" ? "text-white" : "text-neutral-900",
          textClassName,
        )}
      >
        Мебели<span className="text-brand-500">ВаМ</span>
      </span>
    </span>
  );
}
