import { cn } from "@/lib/utils";

/**
 * Премиум монограм за МебелиВам.
 * Запазва концепцията от оригинала — геометрични „пикове", изграждащи буквата „M"
 * (дом + мебел) — но в изчистен, скулптурен вид с топъл брандов градиент.
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
      <path
        d="M13 34V16.5C13 15.4 14.25 14.77 15.13 15.43L24 22.2L32.87 15.43C33.75 14.77 35 15.4 35 16.5V34"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="33.5" r="2.15" fill="white" />
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
