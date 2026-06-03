import React from "react";
import { Heading } from "@/components/ui/heading";
import { Subheading } from "@/components/ui/subheading";
import { PhoneIncoming, PhoneCall, UserCheck, Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import VideoPlayer from "@/components/ui/video-player";

const benefits = [
  {
    icon: PhoneIncoming,
    title: "1. Обаждаме се до 24 часа",
    text: "Свързваме се с вас в рамките на деня, за да уговорим удобно време за оглед.",
  },
  {
    icon: PhoneCall,
    title: "2. Безплатен оглед на място",
    text: "Идваме при вас в Стара Загора, взимаме точни размери и обсъждаме идеите ви — без ангажимент.",
  },
  {
    icon: UserCheck,
    title: "3. Дизайн и оферта",
    text: "Изготвяме 3D визуализация и ясна оферта, съобразена с вашето пространство, стил и бюджет.",
  },
  {
    icon: Clock,
    title: "4. Изработка и монтаж",
    text: "Произвеждаме и монтираме всичко прецизно. Вие само се радвате на новия си дом.",
  },
];

export default function Info() {
  return (
    <div className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <Subheading>Как протича</Subheading>
          <Heading>От запитване до готова кухня — в 4 стъпки</Heading>
          <p className="mt-3 text-lg text-neutral-600">След като оставите телефона си, ето какво следва:</p>
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
          <p className="mb-6 text-neutral-500">Вижте как клиентите ни се радват на своите кухни</p>
          <div id="video" className="section mx-auto max-w-3xl">
            <VideoPlayer
              src="/video/mebelivam-kitchens.mp4"
              poster="/mebelivam-img/video-poster.jpg"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
