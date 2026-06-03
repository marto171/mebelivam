"use client";
import React from "react";
import Image from "next/image";
import { Star, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import scrollToSection from "@/utils/scrollTo";

const Hero = () => {
  return (
    <section className="bg-warm relative overflow-hidden">
      {/* меки декоративни кръгове */}
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pt-12 pb-20 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:pt-20 lg:pb-28">
        {/* ЛЯВО — текст */}
        <div className="relative z-10 max-w-xl">
          <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-brand-500" />
            Мебели по поръчка · Стара Загора
          </div>

          <h1
            className="animate-fade-in-up mt-6 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Превърнете дома си в{" "}
            <span className="text-gradient-brand">пространство мечта</span>
          </h1>

          <p
            className="animate-fade-in-up mt-6 text-lg leading-relaxed text-neutral-600"
            style={{ animationDelay: "160ms" }}
          >
            Проектираме и изработваме кухни, гардероби и обзавеждане по поръчка — до милиметър за
            вашето пространство. Запазете <b className="font-semibold text-neutral-800">безплатен оглед на място</b> и
            получете оферта без ангажимент.
          </p>

          <div
            className="animate-fade-in-up mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/40"
            >
              Запишете безплатен оглед
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection("showcase")}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-neutral-300 bg-white/60 px-7 py-4 text-base font-semibold text-neutral-800 backdrop-blur transition-all hover:border-neutral-900 hover:bg-white"
            >
              Вижте проектите ни
            </button>
          </div>

          <p
            className="animate-fade-in-up mt-4 text-sm font-medium text-neutral-500"
            style={{ animationDelay: "280ms" }}
          >
            Безплатен оглед на място — само за Стара Загора и региона.
          </p>

          {/* trust ред */}
          <div
            className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            style={{ animationDelay: "320ms" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-400 text-brand-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-neutral-700">Десетки доволни клиенти</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
              <MapPin className="h-5 w-5 text-brand-500" />
              Оглед на място · Стара Загора
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
              <Clock className="h-5 w-5 text-brand-500" />
              Отговаряме до 24 ч
            </div>
          </div>
        </div>

        {/* ДЯСНО — изображения */}
        <div className="relative z-10 lg:pl-6">
          <div className="animate-floaty-slow relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
              <Image
                src="/mebelivam-img/showcase/showcase-2.jpg"
                alt="Модерна бяла кухня по поръчка, изработена от Мебели ВаМ"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="animate-ken-burns object-cover"
              />
            </div>

            {/* плаваща карта — рейтинг */}
            <div className="animate-floaty absolute -left-4 top-8 hidden rounded-2xl bg-white/95 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur sm:block">
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-400 text-brand-400" />
                ))}
              </div>
              <p className="mt-1 text-xs font-semibold text-neutral-500">Реализирани проекти в цяла България</p>
            </div>

            {/* плаваща карта — по поръчка */}
            <div
              className="animate-floaty absolute -bottom-5 -right-2 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 px-5 py-4 text-white shadow-xl"
              style={{ animationDelay: "1.2s" }}
            >
              <p className="text-2xl font-extrabold leading-none">100%</p>
              <p className="mt-1 text-xs font-medium text-white/90">изработка по поръчка</p>
            </div>
          </div>
        </div>
      </div>

      {/* долна вълничка / индикатор за скрол */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => scrollToSection("showcase")}
          aria-label="Скролни надолу"
          className="animate-bounce text-neutral-400 transition-colors hover:text-brand-500"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
