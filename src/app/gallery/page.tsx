"use client";
import React, { useState } from "react";
import Image from "next/image";
import realImages from "./real-images";
import vizImages from "./viz-images";
import { ChevronLeft, ChevronRight, PencilRuler } from "lucide-react";
import ContactFormButton from "@/components/ui/contact-form-button";
import { Subheading } from "@/components/ui/subheading";
import { Heading } from "@/components/ui/heading";
import Reveal from "@/components/ui/reveal";

export default function Page() {
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = realImages.length;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % totalImages);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);

  return (
    <>
      {/* ===== Реални завършени проекти ===== */}
      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <Subheading>Нашата работа</Subheading>
            <Heading>Реални завършени проекти</Heading>
            <p className="mx-auto mt-3 max-w-3xl text-lg text-neutral-600">
              Кухни, гардероби и обзавеждане, изработени по поръчка и монтирани при наши клиенти.
              Започваме с най-скорошните.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
            <div className="relative h-96 md:h-[500px] lg:h-[600px]">
              <div className="absolute inset-0">
                <Image
                  src={realImages[currentImage]}
                  alt={`Реален проект ${currentImage + 1} — мебели по поръчка от Мебели ВаМ`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority
                />
              </div>

              {/* Брояч */}
              <div className="absolute top-4 right-4 z-10 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                {currentImage + 1} / {totalImages}
              </div>

              {/* Стрелки */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-200 hover:bg-white hover:shadow-xl"
                aria-label="Предишна снимка"
              >
                <ChevronLeft className="h-6 w-6 text-neutral-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-200 hover:bg-white hover:shadow-xl"
                aria-label="Следваща снимка"
              >
                <ChevronRight className="h-6 w-6 text-neutral-700" />
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="mx-auto max-w-3xl text-lg text-neutral-600">
              Всеки проект е изпълнен с внимание към детайлите и висококачествени материали — за
              пространства, които съчетават функционалност и естетика.
            </p>
          </div>
        </div>
      </section>

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
