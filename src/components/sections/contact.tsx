"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Phone, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { Subheading } from "@/components/ui/subheading";

// Zod схема за валидация
const schema = z.object({
  name: z.string().min(1, "Името е задължително"),
  phone: z.string().min(1, "Телефонът е задължителен"),
  city: z.string().min(1, "Градът е задължителен"),
  email: z.string().email("Невалиден имейл").min(1, "Имейлът е задължителен"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof schema>;
type SubscribeResponse = { success: boolean; message: string };

function toE164(phone: string): string {
  if (phone.startsWith("0")) return "+359" + phone.slice(1);
  if (phone.startsWith("+")) return phone;
  return "+359" + phone;
}

const inputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-800 placeholder-neutral-400 transition-all focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) });

  const mutation = useMutation<SubscribeResponse, Error, ContactFormData>({
    mutationFn: async (data) => {
      const formattedPhone = toE164(data.phone);
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phone: formattedPhone }),
      });
      let json;
      try {
        json = await res.json();
      } catch {
        throw new Error("Грешка при обработка на отговора от сървъра.");
      }
      if (!res.ok) throw new Error(json.error || "Грешка при изпращане!");
      return json;
    },
    onSuccess: () => reset(),
  });

  return (
    <section className="bg-warm py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-14 text-center">
          <Subheading>Свържете се с нас</Subheading>
          <Heading>Вземете безплатна консултация</Heading>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-neutral-600">
            Попълнете формата и наш експерт ще се свърже с вас в рамките на работния ден.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* Форма */}
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-8">
            {mutation.isSuccess ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h3 className="mt-4 font-heading text-2xl font-bold text-neutral-900">Благодарим ви!</h3>
                <p className="mt-2 text-neutral-600">
                  Запитването е получено успешно. Ще се свържем с вас съвсем скоро.
                </p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
                <div>
                  <input type="text" {...register("name")} placeholder="Вашето име" className={inputClass} />
                  {errors.name && <span className="mt-1 block text-sm text-red-500">{errors.name.message}</span>}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <input type="tel" {...register("phone")} placeholder="Телефон" className={inputClass} />
                    {errors.phone && <span className="mt-1 block text-sm text-red-500">{errors.phone.message}</span>}
                  </div>
                  <div>
                    <input type="text" {...register("city")} placeholder="Град" className={inputClass} />
                    {errors.city && <span className="mt-1 block text-sm text-red-500">{errors.city.message}</span>}
                  </div>
                </div>
                <div>
                  <input type="email" {...register("email")} placeholder="Имейл" className={inputClass} />
                  {errors.email && <span className="mt-1 block text-sm text-red-500">{errors.email.message}</span>}
                </div>
                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Съобщение (по желание)"
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                {mutation.isError && (
                  <p className="text-sm font-medium text-red-500">
                    {mutation.error?.message || "Грешка при изпращане!"}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {mutation.isPending ? "Изпращане…" : "Изпрати запитване"}
                </button>
                <p className="text-center text-xs text-neutral-400">
                  Данните ви се използват единствено за връзка с вас.
                </p>
              </form>
            )}
          </div>

          {/* Дясно — изображение + контакти */}
          <div className="space-y-6">
            <div className="relative h-56 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 sm:h-64">
              <Image
                src="/mebelivam-img/showcase/showcase-1.jpg"
                alt="Кухня по поръчка от Мебели ВаМ"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-600 p-8 text-white shadow-xl">
              <h3 className="font-heading text-2xl font-bold leading-tight">Имате нужда от помощ?</h3>
              <p className="mt-3 text-white/90">
                Обадете ни се директно — ще отговорим на всичките ви въпроси и ще ви насочим.
              </p>
              <a
                href="tel:+359888133513"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-lg font-bold text-brand-600 shadow-md transition-transform hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5" />
                +359 88 813 3513
              </a>
              <div className="mt-6 flex items-center gap-2 text-sm text-white/90">
                <MapPin className="h-5 w-5" />
                гр. Стара Загора, България
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
