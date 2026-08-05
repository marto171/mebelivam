import type { Metadata } from "next";
import PortalPulse from "@/components/PortalPulse";
import { Inter } from "next/font/google";
import { EB_Garamond } from "next/font/google";
import Script from "next/script";
import { cn } from "@/lib/utils";
import "./globals.css";
import ReactQueryProvider from "@/components/ui/react-query-provider";

// Meta Pixel (Мебели ВаМ). CompleteRegistration се изпраща при успешен лид от /offer.
const FB_PIXEL_ID = "2075474466341543";

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
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ReactQueryProvider>
          <main className="relative flex-1 flex flex-col">{children}</main>
        </ReactQueryProvider>
              <PortalPulse />
      </body>
    </html>
  );
}
