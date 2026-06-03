"use client";
import { useEffect, useState } from "react";
import { Phone, CalendarCheck } from "lucide-react";
import scrollToSection from "@/utils/scrollTo";

/** Закрепено CTA за мобилни устройства — критично за реклами от Facebook.
 *  Скрива се, щом секцията „контакти" или футърът влязат в кадър, за да не ги застъпва. */
export default function FloatingCTA() {
  const [scrolled, setScrolled] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = [document.getElementById("contact"), document.querySelector("footer")].filter(
      Boolean,
    ) as Element[];
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setNearBottom(visible.size > 0);
      },
      { threshold: 0.01 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const show = scrolled && !nearBottom;

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-[90] p-3 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
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
