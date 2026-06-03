import React from "react";
import { Ruler, MessageSquareHeart, Box, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/reveal";

const items = [
  { icon: Ruler, title: "По поръчка до милиметър", text: "Всяка мебел е изработена точно за вашето пространство." },
  { icon: MessageSquareHeart, title: "Безплатна консултация", text: "Оглед и експертен съвет на място, без ангажимент." },
  { icon: Box, title: "3D визуализация", text: "Виждате крайния резултат още преди изработката." },
  { icon: ShieldCheck, title: "Гаранция и монтаж", text: "Професионален монтаж и гаранция за спокойствие." },
];

export default function Stats() {
  return (
    <section className="border-y border-neutral-100 bg-neutral-50/60 py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 90}>
              <div className="group flex h-full items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="flex size-12 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <it.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">{it.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{it.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
