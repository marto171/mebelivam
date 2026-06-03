"use client";
import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Subheading } from "@/components/ui/subheading";
import { Heading } from "@/components/ui/heading";
import Reveal from "@/components/ui/reveal";

const faqData = [
  {
    question: "Какво точно представлява безплатната консултация?",
    answer:
      "Индивидуална среща (на място, по телефон или видео) с екипа на МебелиВам. Обсъждаме вашите нужди, идеи и предизвикателства, и получавате конкретни съвети как да създадете функционални и красиви мебели за вашето пространство — без никакви ангажименти.",
  },
  {
    question: "Трябва ли да се обвържа с поръчка след консултацията?",
    answer:
      "Абсолютно не. Консултацията е напълно безплатна и без ангажимент. Целта ни е да ви помогнем да видите възможностите. Решението дали да продължим е изцяло ваше.",
  },
  {
    question: "Ще трябва ли да платя, за да получа предложение?",
    answer:
      "Не. За първоначално предложение или идеен проект след консултацията не е необходимо да плащате. Ако решите да продължим, изготвяме прозрачна оферта на база обсъденото.",
  },
  {
    question: "Може ли разговорът да е след работно време или през уикенда?",
    answer:
      "Разбира се. Предлагаме гъвкави часове за консултации, включително вечер и през уикендите, според наличността. При уговарянето избирате най-удобното за вас време.",
  },
  {
    question: "Подходящо ли е, ако вече имам мебели и искам да ги допълня?",
    answer:
      "Да! Много клиенти искат да интегрират нови мебели или да обновят стари, за да оптимизират пространството си. Консултацията е идеална възможност да обсъдим хармоничен и функционален интериор.",
  },
  {
    question: "Подходящо ли е, ако обзавеждам ново жилище от нулата?",
    answer:
      "Идеално е! Това е перфектният момент да планираме всяка мебел така, че да пасне на новото ви пространство и начин на живот — и да избегнем скъпи грешки от самото начало.",
  },
  {
    question: "Има ли нещо, което да подготвя предварително?",
    answer:
      "Полезно е да имате обща представа за размерите на помещението и идеи за стил или функционалност (снимки, референции). Не е задължително, но прави разговора по-продуктивен.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="mb-12 text-center">
          <Subheading>Често задавани въпроси</Subheading>
          <Heading>Имате въпроси? Имаме отговори.</Heading>
        </Reveal>

        <div className="space-y-4">
          {faqData.map((item, i) => (
            <Reveal key={item.question} delay={i * 60}>
              <Disclosure
                as="div"
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors hover:border-brand-200 data-open:border-brand-300 data-open:shadow-md"
              >
                <DisclosureButton className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-base font-bold text-neutral-900 sm:text-lg">{item.question}</span>
                  <ChevronDown className="h-5 w-5 flex-none text-brand-500 transition-transform duration-300 group-data-open:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel
                  transition
                  className="origin-top px-6 pb-5 text-neutral-600 transition duration-300 ease-out data-closed:-translate-y-2 data-closed:opacity-0"
                >
                  <p className="leading-relaxed">{item.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
