"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, CheckCircle2, Ruler, FileText, MonitorPlay, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const PHONE = "+359 88 813 3513";
const PHONE_HREF = "tel:+359888133513";

// „Мечтаните изходи" — какво печели клиентът, не какво правим ние.
const outcomes = [
  {
    icon: MonitorPlay,
    title: "Виждате мебелите си в 3D — преди да платите",
    body: "Правим визуализация на вашата кухня или гардероб. Решавате върху реална картина, не върху обещание.",
  },
  {
    icon: FileText,
    title: "Точна, писмена оферта",
    body: "Не „от–до“. Една фиксирана цена за вашия проект, която остава валидна.",
  },
  {
    icon: Ruler,
    title: "По мярка — до милиметър",
    body: "Взимаме размерите на място. Всеки сантиметър се използва, нищо не се губи.",
  },
  {
    icon: ShieldCheck,
    title: "Безплатен оглед, без ангажимент",
    body: "Огледът е безплатен дори ако ни откажете. Само Стара Загора и региона.",
  },
];

function toE164(phone: string): string {
  if (phone.startsWith("0")) return "+359" + phone.slice(1);
  if (phone.startsWith("+")) return phone;
  return "+359" + phone;
}

export default function OfferClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [source, setSource] = useState("фуния /offer");

  // Източник на лида — UTM от рекламата отива в колоната „Източник".
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const parts = ["utm_source", "utm_medium", "utm_campaign"]
      .map((k) => p.get(k))
      .filter(Boolean) as string[];
    if (!parts.length && p.get("fbclid")) parts.push("facebook");
    setSource(parts.length ? `оферта · ${parts.join(" / ")}` : "фуния /offer");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (website) return; // бот хванат от honeypot
    if (!name.trim() || phone.trim().length < 6) {
      setErrorMsg("Моля, попълнете име и валиден телефон.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: toE164(phone.trim()),
          message: message.trim(),
          source,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Грешка при изпращане.");
      // Meta Pixel е инсталиран в layout.tsx — реги-събитието се изпраща при успешен лид.
      if (typeof window !== "undefined" && typeof (window as unknown as { fbq?: unknown }).fbq === "function") {
        (window as unknown as { fbq: (...a: unknown[]) => void }).fbq("track", "CompleteRegistration");
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Грешка при изпращане.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3.5 text-neutral-900 placeholder-neutral-400 transition-all focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40";

  return (
    <div className="flex min-h-dvh flex-col bg-neutral-950">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Мебели ВаМ — начало">
          <Logo variant="light" textClassName="text-xl sm:text-2xl" />
        </Link>
        <a
          href={PHONE_HREF}
          className="hidden items-center gap-2 font-heading text-sm font-semibold text-white/80 transition-colors hover:text-brand-400 sm:inline-flex"
        >
          <Phone className="h-4 w-4 text-brand-400" />
          {PHONE}
        </a>
      </header>

      <main className="grid flex-1 lg:grid-cols-[1.05fr_1fr]">
        {/* ЛЯВО — оферта */}
        <section className="relative flex items-center overflow-hidden px-5 pb-10 pt-24 sm:px-8 lg:px-14 lg:pb-14 lg:pt-28">
          <Image
            src="/mebelivam-img/showcase/showcase-1.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-neutral-950/82" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_25%,rgba(245,131,31,0.22)_0%,transparent_55%),radial-gradient(ellipse_at_85%_95%,rgba(10,10,10,0.7)_0%,transparent_55%)]" />

          <div className="relative w-full max-w-[600px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
              <span className="font-heading text-[10px] font-bold uppercase tracking-[2.5px] text-brand-400 sm:text-[11px]">
                Безплатен оглед · Стара Загора и региона
              </span>
            </div>

            <h1 className="mb-5 font-heading text-[clamp(2rem,5vw,3.3rem)] font-bold leading-[1.06] text-white">
              Вижте мебелите си в 3D —
              <br className="hidden sm:block" /> преди да платите.
            </h1>

            <p className="mb-8 max-w-[480px] text-base leading-relaxed text-white/75 sm:text-lg">
              Оставете име и телефон. Идваме на безплатен оглед, правим 3D
              визуализация и ви даваме точна оферта — до 48 часа, без ангажимент.
            </p>

            <ul className="space-y-4">
              {outcomes.map((o) => (
                <li key={o.title} className="flex gap-3.5">
                  <span className="flex size-10 flex-none items-center justify-center rounded-xl bg-brand-400/15 text-brand-400">
                    <o.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-heading font-bold text-white">{o.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/65">{o.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-white/55">
              Десетки доволни клиенти · Реализирани проекти в цяла България
            </p>
          </div>
        </section>

        {/* ДЯСНО — форма */}
        <section className="flex items-center justify-center bg-warm px-5 py-12 sm:px-8 lg:px-12 lg:py-0">
          <div className="w-full max-w-[440px]">
            {status === "success" ? (
              <div className="rounded-3xl bg-white p-8 text-center shadow-2xl ring-1 ring-black/5 sm:p-10">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-4 font-heading text-2xl font-bold text-neutral-900">
                  Благодарим ви!
                </h2>
                <p className="mt-3 text-neutral-600">
                  Получихме заявката ви. Ще се обадим до 24 часа, за да уговорим
                  вашия безплатен оглед и 3D проект.
                </p>
                <a
                  href={PHONE_HREF}
                  className="mt-6 inline-flex items-center gap-2 font-heading font-bold text-brand-600"
                >
                  <Phone className="h-5 w-5" />
                  Или ни се обадете сега: {PHONE}
                </a>
              </div>
            ) : (
              <div className="rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:p-8">
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Заявете безплатен 3D проект
                </h2>
                <p className="mt-1.5 text-sm text-neutral-500">
                  Попълнете за 30 секунди. Обаждаме се до 24 часа.
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Вашето име"
                    autoComplete="name"
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Телефон"
                    inputMode="tel"
                    autoComplete="tel"
                    className={inputClass}
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Какво планирате? (по желание) — кухня, гардероб, цял дом…"
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />

                  {/* honeypot — скрит за хора, примамка за ботове */}
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  {status === "error" && (
                    <p className="text-sm font-medium text-red-500">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "loading" ? "Изпращане…" : "Заявявам безплатен проект"}
                  </button>

                  <p className="text-center text-xs text-neutral-400">
                    Без ангажимент. Данните ви се използват само за връзка с вас.
                  </p>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
