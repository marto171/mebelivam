"use client";

import { useEffect, useState } from "react";
import { КЛЮЧ } from "@/lib/saglasie";

/**
 * Съгласието за бисквитки.
 *
 * Маркерите на Google и Meta НЕ се спират: зареждат се както преди, на
 * всяка страница. Само получават сигнал дали посетителят е съгласен
 * (Google Consent Mode v2 и `fbq('consent')`). Докато няма съгласие,
 * Google мери без бисквитки и моделира конверсиите, а щом човекът
 * приеме, всичко тръгва с пълна сила. Така рекламите продължават да
 * отчитат, а сайтът е изряден по GDPR.
 *
 * `СЪГЛАСИЕ_ПО_ПОДРАЗБИРАНЕ` трябва да е първият скрипт в <head>, преди
 * gtag и пиксела, иначе те стартират без сигнал.
 */
type W = Window & {
  gtag?: (...a: unknown[]) => void;
  fbq?: (...a: unknown[]) => void;
  clarity?: (...a: unknown[]) => void;
};

function подай(съгласен: boolean) {
  const w = window as W;
  const с = съгласен ? "granted" : "denied";
  w.gtag?.("consent", "update", {
    ad_storage: с,
    ad_user_data: с,
    ad_personalization: с,
    analytics_storage: с,
  });
  w.gtag?.("set", "ads_data_redaction", !съгласен);
  w.fbq?.("consent", съгласен ? "grant" : "revoke");
  w.clarity?.("consentv2", { ad_Storage: с, analytics_Storage: с });
}

export default function Biskvitki({ акцент = "#111" }: { акцент?: string }) {
  const [видим, setВидим] = useState(false);

  useEffect(() => {
    let запис: string | null = null;
    try {
      запис = localStorage.getItem(КЛЮЧ);
    } catch {}
    if (запис === "granted") {
      подай(true);
      return;
    }
    if (запис === "denied") return;
    const т = setTimeout(() => setВидим(true), 1200);
    return () => clearTimeout(т);
  }, []);

  function избор(съгласен: boolean) {
    try {
      localStorage.setItem(КЛЮЧ, съгласен ? "granted" : "denied");
    } catch {}
    подай(съгласен);
    setВидим(false);
  }

  if (!видим) return null;

  return (
    <div
      role="dialog"
      aria-label="Бисквитки"
      style={{
        position: "fixed",
        left: 12,
        right: 12,
        bottom: 12,
        zIndex: 70,
        maxWidth: 380,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 12px 12px 16px",
        background: "rgba(255,255,255,0.97)",
        color: "#1d1d1f",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 14,
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        fontSize: 13,
        lineHeight: 1.4,
        backdropFilter: "blur(8px)",
        animation: "mg-bisk 0.35s ease-out",
      }}
    >
      <style>{`@keyframes mg-bisk{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
      <p style={{ margin: 0, flex: 1, opacity: 0.8 }}>
        Ползваме бисквитки за статистика и реклама.
      </p>
      <button
        type="button"
        onClick={() => избор(false)}
        style={{
          background: "none",
          border: 0,
          padding: "8px 6px",
          font: "inherit",
          color: "inherit",
          opacity: 0.55,
          cursor: "pointer",
        }}
      >
        Отказ
      </button>
      <button
        type="button"
        onClick={() => избор(true)}
        style={{
          background: акцент,
          color: "#fff",
          border: 0,
          borderRadius: 999,
          padding: "8px 16px",
          font: "inherit",
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Приемам
      </button>
    </div>
  );
}
