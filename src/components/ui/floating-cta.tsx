"use client";
import { useEffect, useState } from "react";
import { Phone, CalendarCheck } from "lucide-react";
import scrollToSection from "@/utils/scrollTo";

/** Закрепено CTA за мобилни устройства — критично за реклами от Facebook. */
export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-[90] p-3 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-md items-stretch gap-2 rounded-2xl border border-neutral-200 bg-white/95 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur">
        <a
          href="tel:+359888133513"
          className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800"
          aria-label="Обади се"
        >
          <Phone className="h-5 w-5 text-brand-500" />
          Обади се
        </a>
        <button
          onClick={() => scrollToSection("contact")}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-3 text-sm font-bold text-white shadow-lg"
        >
          <CalendarCheck className="h-5 w-5" />
          Безплатен оглед
        </button>
      </div>
    </div>
  );
}
