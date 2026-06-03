import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EB_Garamond } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import ReactQueryProvider from "@/components/ui/react-query-provider";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });
const eb_garamond = EB_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
});

const SITE_URL = "https://www.mebelivam.com";
const TITLE = "Мебели по поръчка в Стара Загора | Мебели ВаМ";
const DESCRIPTION =
  "Кухни и мебели по поръчка в Стара Загора — изработени до милиметър. Запишете безплатен оглед на място, получете 3D визуализация и оферта без ангажимент.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s / Мебели ВаМ ЕООД",
    default: TITLE,
  },
  description: DESCRIPTION,
  keywords: [
    "мебели по поръчка",
    "кухни по поръчка",
    "гардероби по поръчка",
    "обзавеждане",
    "МебелиВам",
    "Стара Загора",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: SITE_URL,
    siteName: "Мебели ВаМ",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Кухня по поръчка, изработена от Мебели ВаМ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={cn(inter.variable, eb_garamond.variable)}>
      <body className="min-h-[calc(100vh-1px)] flex flex-col overflow-x-hidden font-sans bg-white text-neutral-900 antialiased">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ReactQueryProvider>
          <main className="relative flex-1 flex flex-col">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
