import React from "react";
import { Ruler, Paintbrush, Hammer } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Subheading } from "@/components/ui/subheading";
import Reveal from "@/components/ui/reveal";

const steps = [
  {
    icon: Ruler,
    title: "Вземане на размери",
    text: "Нашият екип идва на място и взема размерите бързо и прецизно — без забавяне и с максимално удобство за вас.",
  },
  {
    icon: Paintbrush,
    title: "Дизайн и визуализация",
    text: "Изготвяме професионален дизайн и фотореалистична 3D визуализация, за да видите проекта преди изработка.",
  },
  {
    icon: Hammer,
    title: "Изработка и монтаж",
    text: "Изработваме и монтираме всичко прецизно — получавате завършен интериор, без да губите време и усилия.",
  },
];

export default function Services() {
  return (
    <section className="bg-warm relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <Subheading>Как работим</Subheading>
          <Heading>Три прости стъпки до мечтаната мебел</Heading>
        </Reveal>

        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {/* свързваща линия (десктоп) */}
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent md:block" />

          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 140} className="relative">
              <div className="group relative flex h-full flex-col items-center rounded-3xl bg-white/70 p-8 text-center shadow-sm ring-1 ring-neutral-100 backdrop-blur transition-all hover:-translate-y-1.5 hover:bg-white hover:shadow-xl">
                <span className="absolute right-6 top-5 font-heading text-6xl font-bold text-brand-100 transition-colors group-hover:text-brand-200">
                  {i + 1}
                </span>
                <div className="relative z-10 mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30">
                  <s.icon className="h-9 w-9" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-neutral-900">{s.title}</h3>
                <p className="leading-relaxed text-neutral-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
