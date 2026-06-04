import React from "react";
import { Star, Quote, Facebook } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Subheading } from "@/components/ui/subheading";
import Reveal from "@/components/ui/reveal";

const FB_URL = "https://www.facebook.com/profile.php?id=61567083981259";

// ВАЖНО: първият отзив е реален (коментар във Facebook).
// Вторият и третият са ЧЕРНОВИ — потвърди ги с Васил или ги замени с реална
// обратна връзка от клиенти, преди/скоро след пускане на рекламите.
const testimonials = [
  {
    quote: "Изключително прецизна работа.",
    name: "Николай Демириев",
    context: "коментар във Facebook",
  },
  {
    quote:
      "От огледа до монтажа всичко мина точно както го обещаха. Кухнята пасна до милиметър.",
    name: "Галина",
    context: "кухня по поръчка, Стара Загора",
  },
  {
    quote:
      "Взеха размерите, показаха ни проекта в 3D и след това го изпълниха едно към едно.",
    name: "Стоян",
    context: "обзавеждане по поръчка, Стара Загора",
  },
];

export default function Testimonials() {
  return (
    <section className="border-y border-neutral-100 bg-neutral-50/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Subheading>Отзиви</Subheading>
          <Heading>Какво казват клиентите ни</Heading>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 110}>
              <figure className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-lg">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-brand-100" />
                <div className="mb-4 flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <blockquote className="flex-1 text-lg leading-relaxed text-neutral-700">
                  {`„${t.quote}"`}
                </blockquote>
                <figcaption className="mt-5 border-t border-neutral-100 pt-4">
                  <p className="font-bold text-neutral-900">{t.name}</p>
                  <p className="text-sm text-neutral-500">{t.context}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 transition-all hover:border-[#1877F2] hover:text-[#1877F2]"
          >
            <Facebook className="h-5 w-5" />
            Вижте проектите и отзивите ни във Facebook
          </a>
        </Reveal>
      </div>
    </section>
  );
}
