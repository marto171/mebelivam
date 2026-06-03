"use client";
import React from "react";
import { Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import scrollToSection from "@/utils/scrollTo";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Бранд */}
          <div className="md:col-span-1">
            <Logo markClassName="h-10 w-10" textClassName="text-2xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">
              Мебели по поръчка в Стара Загора — изработени до милиметър за вашия дом, с грижа и прецизност.
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-neutral-900">МебелиВам</h3>
            <nav className="space-y-3">
              {[
                { label: "Как работим", id: "services" },
                { label: "За нас", id: "about" },
                { label: "ЧЗВ", id: "faq" },
                { label: "Контакти", id: "contact" },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollToSection(l.id)}
                  className="block text-sm text-neutral-600 transition-colors hover:text-brand-600"
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Полезни връзки */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-neutral-900">Полезни връзки</h3>
            <nav className="space-y-3">
              <Link href="/gallery" className="block text-sm text-neutral-600 transition-colors hover:text-brand-600">
                Галерия
              </Link>
              <Link href="/v-vs-r" className="block text-sm text-neutral-600 transition-colors hover:text-brand-600">
                Визуализация срещу реалност
              </Link>
              <Link
                href="/privacy-policy"
                className="block text-sm text-neutral-600 transition-colors hover:text-brand-600"
              >
                Политика за поверителност
              </Link>
            </nav>
          </div>

          {/* Контакти */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-neutral-900">Контакти</h3>
            <div className="space-y-4 text-sm">
              <a href="tel:+359888133513" className="flex items-center gap-3 text-neutral-700 hover:text-brand-600">
                <Phone className="h-5 w-5 flex-none text-brand-500" />
                +359 88 813 3513
              </a>
              <div className="flex items-start gap-3 text-neutral-700">
                <MapPin className="mt-0.5 h-5 w-5 flex-none text-brand-500" />
                гр. Стара Загора, България
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
          <p className="text-sm text-neutral-500">© {new Date().getFullYear()} Мебели ВаМ ЕООД. Всички права запазени.</p>
          <p className="text-sm text-neutral-400">Изработка по поръчка · Дизайн · Монтаж</p>
        </div>
      </div>
    </footer>
  );
}
