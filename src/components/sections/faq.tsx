"use client";
import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Subheading } from "@/components/ui/subheading";
import { Heading } from "@/components/ui/heading";
import Reveal from "@/components/ui/reveal";

const faqData = [
  {
    question: "Какво включва безплатният оглед?",
    answer:
      "Майстор идва при вас на удобно за вас време, взема точни размери на помещението, обсъжда идеите и нуждите ви и ви дава конкретни съвети. На база огледа изготвяме оферта — всичко това е напълно безплатно и без ангажимент.",
  },
  {
    question: "За кои райони важи безплатният оглед?",
    answer:
      "Безплатният оглед на място е за Стара Загора и региона. Ако сте извън района, пак ни пишете — ще намерим решение, например онлайн консултация по снимки и размери.",
  },
  {
    question: "Безплатно ли е наистина и обвързвам ли се с нещо?",
    answer:
      "Да, огледът и офертата са напълно безплатни и без никакъв ангажимент. Решавате дали да продължим само вие — без натиск.",
  },
  {
    question: "Колко бързо ще се свържете с мен?",
    answer:
      "Обаждаме се в рамките на работния ден (най-късно до 24 часа), за да уговорим удобно време за оглед.",
  },
  {
    question: "Нямам размери и съм само с идея — проблем ли е?",
    answer:
      "Никакъв проблем — точно за това е огледът. Идваме, измерваме всичко прецизно и заедно оформяме идеята в готов проект.",
  },
  {
    question: "Подходящо ли е за ремонт или за ново жилище от нулата?",
    answer:
      "И за двете. Независимо дали допълвате съществуващи мебели, или обзавеждате изцяло ново жилище — планираме всичко така, че да пасне идеално на пространството ви.",
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
