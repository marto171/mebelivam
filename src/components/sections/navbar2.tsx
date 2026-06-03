"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import { LucideImages, SquareDashedMousePointer, Phone } from "lucide-react";
import Link from "next/link";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Logo } from "@/components/ui/logo";

const products = [
  { name: "Галерия", description: "Разгледайте снимки на нашите проекти", href: "/gallery", icon: LucideImages },
  {
    name: "Визуализация срещу реалност",
    description: "Сравнете проект и реален резултат",
    href: "/v-vs-r",
    icon: SquareDashedMousePointer,
  },
];
const callsToAction = [
  { name: "Виж видео", href: "/#video", icon: PlayCircleIcon },
  { name: "Свържи се с нас", href: "/#contact", icon: PhoneIcon },
];

const navLink = "text-sm font-semibold text-neutral-700 hover:text-brand-600 transition-colors";

export const Navbar2 = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky inset-x-0 top-0 z-[100] w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-neutral-200/80 bg-white/85 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.05)] backdrop-blur-md"
          : "border-b border-neutral-100 bg-white py-4"
      }`}
    >
      <MaxWidthWrapper>
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Мебели ВаМ — начало" className="shrink-0">
            <Logo markClassName="h-9 w-9" textClassName="text-xl sm:text-2xl" />
          </Link>

          <PopoverGroup className="hidden items-center gap-x-9 lg:flex">
            <Link href="/#services" className={navLink}>
              Как работим
            </Link>
            <Popover className="relative">
              <PopoverButton className={`flex items-center gap-x-1 outline-none ${navLink}`}>
                Проекти
                <ChevronDownIcon aria-hidden="true" className="size-4 text-neutral-400" />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute left-1/2 z-10 mt-4 w-screen max-w-sm -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-neutral-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-3">
                  {products.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group relative flex items-center gap-x-4 rounded-xl p-3 hover:bg-brand-50"
                    >
                      <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-brand-50 group-hover:bg-white">
                        <item.icon aria-hidden="true" className="size-6 text-brand-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{item.name}</p>
                        <p className="mt-0.5 text-sm text-neutral-500">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-neutral-900/5 bg-neutral-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2 p-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
                    >
                      <item.icon aria-hidden="true" className="size-5 flex-none text-brand-500" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <Link href="/#about" className={navLink}>
              За нас
            </Link>
            <Link href="/#faq" className={navLink}>
              ЧЗВ
            </Link>
          </PopoverGroup>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+359888133513"
              className="flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-brand-600"
            >
              <Phone className="h-4 w-4 text-brand-500" />
              0888 133 513
            </a>
            <Link
              href="/#contact"
              className="rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-500/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/30"
            >
              Безплатен оглед
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-800 lg:hidden"
          >
            <span className="sr-only">Отвори меню</span>
            <Bars3Icon aria-hidden="true" className="size-7" />
          </button>
        </div>
      </MaxWidthWrapper>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-[110] bg-neutral-900/30 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-[120] w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Logo markClassName="h-9 w-9" textClassName="text-xl" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-neutral-700"
            >
              <span className="sr-only">Затвори меню</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-neutral-200">
              <div className="space-y-1 py-6">
                <Link
                  href="/#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  Как работим
                </Link>
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base font-semibold text-neutral-900 hover:bg-neutral-50">
                    Проекти
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-1 space-y-1">
                    {products.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  href="/#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  За нас
                </Link>
                <Link
                  href="/#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-neutral-900 hover:bg-neutral-50"
                >
                  ЧЗВ
                </Link>
              </div>
              <div className="space-y-3 py-6">
                <a
                  href="tel:+359888133513"
                  className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-base font-semibold text-neutral-800"
                >
                  <Phone className="h-5 w-5 text-brand-500" />
                  0888 133 513
                </a>
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-center text-base font-bold text-white shadow-md"
                >
                  Безплатен оглед
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </nav>
  );
};
