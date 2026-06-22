import Link from "next/link";
import { Home, Phone, Images } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-warm px-5 py-16 text-center">
      {/* меки брандови петна за топлина */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_15%,rgba(245,131,31,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_85%_95%,rgba(245,131,31,0.10)_0%,transparent_55%)]" />

      <div className="relative w-full max-w-lg">
        <Link href="/" aria-label="Мебели ВаМ — начало" className="inline-flex">
          <Logo />
        </Link>

        <p className="mt-12 font-heading text-[clamp(5rem,18vw,9rem)] font-bold leading-none text-brand-500">
          404
        </p>

        <h1 className="mt-2 font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
          Тази страница я няма
        </h1>
        <p className="mx-auto mt-3 max-w-md text-neutral-600">
          Може да е преместена или връзката да е остаряла. Но мебелите по поръчка
          са на мястото си — да ви върнем към тях.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
          >
            <Home className="h-5 w-5" />
            Към началната страница
          </Link>
          <Link
            href="/gallery"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3.5 font-bold text-neutral-800 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600 sm:w-auto"
          >
            <Images className="h-5 w-5" />
            Вижте проектите ни
          </Link>
        </div>

        <a
          href="tel:+359888133513"
          className="mt-8 inline-flex items-center gap-2 font-heading font-semibold text-neutral-700 transition-colors hover:text-brand-600"
        >
          <Phone className="h-5 w-5 text-brand-500" />
          Или ни се обадете: +359 88 813 3513
        </a>
      </div>
    </div>
  );
}
