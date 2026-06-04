"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import realImages from "./real-images";
import vizImages from "./viz-images";
import { ChevronLeft, ChevronRight, X, PencilRuler, ChevronDown } from "lucide-react";
import ContactFormButton from "@/components/ui/contact-form-button";
import { Subheading } from "@/components/ui/subheading";
import { Heading } from "@/components/ui/heading";
import Reveal from "@/components/ui/reveal";

const INITIAL_COUNT = 12;

export default function Page() {
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visibleImages = showAll ? realImages : realImages.slice(0, INITIAL_COUNT);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + realImages.length) % realImages.length)),
    [],
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % realImages.length)),
    [],
  );

  // Клавиатура + заключване на скрола, докато лайтбоксът е отворен
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, close, prev, next]);

  return (
    <>
      {/* ===== Завършени проекти — masonry ===== */}
      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <Subheading>Портфолио</Subheading>
            <Heading>Истински домове. Истинска изработка.</Heading>
            <p className="mx-auto mt-3 max-w-3xl text-lg text-neutral-600">
              Всяка снимка е от дома на наш клиент — кухни, гардероби и цялостно обзавеждане по
              поръчка. Най-новите проекти са първи. Кликнете върху снимка, за да я разгледате.
            </p>
          </div>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {visibleImages.map((img, i) => (
              <Reveal key={img.src} delay={(i % 3) * 70} className="mb-5 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  aria-label={`Разгледай проект ${i + 1}`}
                >
                  <Image
                    src={img.src}
                    alt={`Завършен проект ${i + 1} — мебели по поръчка от Мебели ВаМ`}
                    width={img.w}
                    height={img.h}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {i < 6 && (
                    <span className="absolute left-3 top-3 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
                      Ново
                    </span>
                  )}
                </button>
              </Reveal>
            ))}
          </div>

          {!showAll && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-neutral-300 px-7 py-4 text-base font-semibold text-neutral-800 transition-all hover:border-brand-500 hover:text-brand-600"
              >
                Покажи всички проекти ({realImages.length})
                <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== Лайтбокс ===== */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="Затвори"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
            {lightbox + 1} / {realImages.length}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Предишна"
            className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <div className="relative h-[82vh] w-[92vw] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={realImages[lightbox].src}
              alt={`Завършен проект ${lightbox + 1} — Мебели ВаМ`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Следваща"
            className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}

      {/* ===== Проектни визуализации ===== */}
      <section className="bg-warm px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <Subheading>Преди изработката</Subheading>
            <Heading>Проектни визуализации</Heading>
            <p className="mt-3 text-lg text-neutral-600">
              Всеки наш проект започва с оглед, точни размери и 3D визуализация — виждате кухнята
              си, преди да бъде изработена. Ето част от проектите, които сме чертали за наши
              клиенти.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
              <PencilRuler className="h-4 w-4" />
              Изготвени по реални размери, взети на място
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vizImages.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 80}>
                <div className="group relative aspect-video overflow-hidden rounded-2xl bg-neutral-100 shadow-md ring-1 ring-black/5">
                  <Image
                    src={src}
                    alt={`3D визуализация на проект ${i + 1} — Мебели ВаМ`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-neutral-700 backdrop-blur">
                    3D проект
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactFormButton />
    </>
  );
}
