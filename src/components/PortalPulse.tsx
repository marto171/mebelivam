"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Брои посещение при всяка смяна на страницата. Нищо не показва и не
 * пази лични данни — праща само пътя и откъде е дошъл човекът.
 */
export default function PortalPulse() {
  const pathname = usePathname();
  const sent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || sent.current === pathname) return;
    sent.current = pathname;

    void fetch("/api/portal-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: document.referrer || null }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
