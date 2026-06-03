import React from "react";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { Subheading } from "@/components/ui/subheading";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/ui/reveal";

const points = [
  "Десетки реализирани проекта в цяла България",
  "Уникални и функционални решения за всяко пространство",
  "Внимание към всеки детайл и висококачествени материали",
];

export default function About() {
  return (
    <section className="bg-warm py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Изображение */}
          <Reveal variant="scale" className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-3 -rotate-2 rounded-[2rem] bg-brand-100/60" />
              <Image
                className="relative aspect-[4/5] w-full rounded-[2rem] object-cover object-top shadow-xl ring-1 ring-black/5"
                src="/mebelivam-img/vasil-vitanov.jpg"
                alt="Васил Витанов — основател на Мебели ВаМ"
                width={1600}
                height={1567}
                sizes="(max-width: 1024px) 100vw, 450px"
              />
              <div className="absolute -bottom-5 left-6 rounded-2xl bg-white px-5 py-3 shadow-xl ring-1 ring-black/5">
                <p className="font-heading text-lg font-bold text-neutral-900">Васил Витанов</p>
                <p className="text-sm text-brand-600">Основател &amp; майстор</p>
              </div>
            </div>
          </Reveal>

          {/* Текст */}
          <Reveal delay={120} className="order-1 space-y-6 lg:order-2">
            <div>
              <Subheading>За нас</Subheading>
              <Heading>{'Кой стои зад „МебелиВам"?'}</Heading>
            </div>
            <p className="text-lg leading-relaxed text-neutral-700">
              {`Васил Витанов е основателят на „МебелиВам" — ателие за мебели по поръчка с десетки успешни
              проекти и доволни клиенти. Заедно с екипа си помага на хората да създадат мечтания си дом
              чрез уникални и функционални мебели, които пасват перфектно на тяхното пространство.`}
            </p>
            <p className="text-lg leading-relaxed text-neutral-700">
              Мисията е проста: да трансформираме жилищата в места, които носят комфорт и удоволствие в
              ежедневието — чрез персонализирани мебелни решения, изпълнени с грижа и прецизност.
            </p>
            <ul className="space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-none text-brand-500" />
                  <span className="text-neutral-700">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
