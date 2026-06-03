import React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";

export default function ContactFormButton() {
  return (
    <div className="px-5 py-16 sm:px-8">
      <Reveal className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 to-brand-600 px-6 py-12 text-center shadow-2xl shadow-brand-500/30 sm:px-12">
          {/* декор */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-black/10" />

          <h2 className="relative font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            Запишете безплатен оглед на място
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/90">
            Оставете телефон и ще се обадим да уговорим оглед — взимаме размери и ви даваме оферта, без ангажимент.
          </p>

          <div className="relative mt-8 flex justify-center">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Запишете безплатен оглед
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80">
            <Clock className="h-4 w-4" />
            Безплатен оглед на място — само за Стара Загора и региона.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
