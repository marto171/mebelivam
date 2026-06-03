import React from "react";
import { Heading } from "@/components/ui/heading";
import { Subheading } from "@/components/ui/subheading";
import Image from "next/image";
import { PhoneIncoming, PhoneCall, UserCheck, Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";

const benefits = [
  {
    icon: PhoneIncoming,
    title: "Експресна връзка",
    text: "Наш експерт ще се свърже с вас в рамките на деня (най-късно до 24 часа), за да уточним удобно време за консултация.",
  },
  {
    icon: PhoneCall,
    title: "Безплатна 30-минутна сесия",
    text: "Провеждаме индивидуална консултация, в която обсъждаме нуждите ви и чертаем пътна карта за вашето пространство.",
  },
  {
    icon: UserCheck,
    title: "Персонализирано решение",
    text: "Създаваме мебелите на мечтите ви — съобразени с вашия бюджет, стил и пространство, без компромиси.",
  },
  {
    icon: Clock,
    title: "Спестено време и усилия",
    text: "Край на обикалянето по магазини. С наша помощ стигате до перфектното решение бързо и лесно.",
  },
];

export default function Info() {
  return (
    <div className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <Subheading>Какво следва</Subheading>
          <Heading>Какво се случва, след като оставите данните си?</Heading>
          <p className="mt-3 text-lg text-neutral-600">След като попълните формата, ето какво можете да очаквате:</p>
        </Reveal>

        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <div className="group flex h-full gap-5 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-100 hover:shadow-lg">
                <div className="flex size-14 flex-none items-center justify-center rounded-2xl bg-brand-50 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <b.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-neutral-900">{b.title}</h3>
                  <p className="leading-relaxed text-neutral-600">{b.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Видео */}
        <Reveal className="text-center" variant="scale">
          <p className="mb-6 text-neutral-500">Изгледайте видеото за повече информация</p>
          <div id="video" className="section group relative mx-auto max-w-3xl overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
            <Image
              src="/mebelivam-img/how-we-do-it.png"
              alt="Как изработваме мебели по поръчка"
              width={1920}
              height={1080}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="flex size-20 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform group-hover:scale-110">
                <svg className="ml-1 h-8 w-8 text-brand-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
