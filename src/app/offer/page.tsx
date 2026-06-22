import type { Metadata } from "next";
import OfferClient from "./offer-client";

export const metadata: Metadata = {
  title: "Безплатен 3D проект за мебели по поръчка — Мебели ВаМ",
  description:
    "Оставете име и телефон. Безплатен оглед, 3D визуализация и точна оферта за мебели по поръчка — до 48 часа. Стара Загора и региона.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://mebelivam.com/offer" },
};

export default function OfferPage() {
  return <OfferClient />;
}
