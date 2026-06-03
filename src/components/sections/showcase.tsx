import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Subheading } from "@/components/ui/subheading";
import Reveal from "@/components/ui/reveal";

const projects = [
  { src: "/mebelivam-img/showcase/showcase-2.jpg", w: 1600, h: 1200, label: "Модерна бяла кухня", tag: "Кухня" },
  { src: "/mebelivam-img/showcase/showcase-3.jpg", w: 1200, h: 1600, label: "Сиво-бяла кухня с гланц", tag: "Кухня" },
  { src: "/mebelivam-img/showcase/showcase-1.jpg", w: 1600, h: 1200, label: "Кухня в маслено зелено", tag: "Кухня" },
  { src: "/mebelivam-img/showcase/showcase-4.jpg", w: 1200, h: 1600, label: "Кухня с висок гланц", tag: "Кухня" },
];

export default function Showcase() {
  return (
    <section id="showcase" className="section bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <Subheading>Нашата работа</Subheading>
          <Heading>Проекти, които говорят вместо нас</Heading>
          <p className="mt-3 text-lg text-neutral-600">
            Всеки детайл е изпипан до съвършенство. Разгледайте част от реализираните ни кухни и обзавеждания.
          </p>
        </Reveal>

        <div className="columns-1 gap-5 sm:columns-2">
          {projects.map((p, i) => (
            <Reveal key={p.src} delay={i * 90} variant="scale" className="mb-5 break-inside-avoid">
              <div className="group relative overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5">
                <Image
                  src={p.src}
                  alt={p.label}
                  width={p.w}
                  height={p.h}
                  sizes="(max-width: 640px) 100vw, 600px"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
                  <div>
                    <span className="inline-block rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      {p.tag}
                    </span>
                    <p className="mt-2 text-lg font-semibold text-white drop-shadow">{p.label}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-neutral-300 px-7 py-4 text-base font-semibold text-neutral-800 transition-all hover:border-brand-500 hover:text-brand-600"
          >
            Вижте цялата галерия
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
