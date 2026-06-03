import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EB_Garamond } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import ReactQueryProvider from "@/components/ui/react-query-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const eb_garamond = EB_Garamond({
    subsets: ["latin"],
    variable: "--font-heading",
});

export const metadata: Metadata = {
    title: {
        template: "%s / Мебели ВаМ ЕООД",
        default: "Мебели ВаМ ЕООД",
    },
    description: "",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    other: { "deploy-test": "2026-06-03" },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
        <body className="min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased">
        <ReactQueryProvider>
            <main className="relative flex-1 flex flex-col">{children}</main>
        </ReactQueryProvider>
        </body>
        </html>
    );
}