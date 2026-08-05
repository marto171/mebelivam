/**
 * Праща копие от запитването и от посещенията към MG Portal, за да ги
 * вижда клиентът в своя профил. Никога не хвърля и не бави отговора към
 * посетителя — ако порталът е недостъпен, сайтът продължава да работи.
 */
const BASE = process.env.MG_PORTAL_URL ?? "https://www.mgenterprise.bg";

export type PortalEnquiry = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  source?: string | null;
  [key: string]: unknown;
};

async function post(path: string, payload: Record<string, unknown>): Promise<void> {
  const key = process.env.MG_PORTAL_KEY;
  if (!key) return;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, ...payload }),
      signal: controller.signal,
    });
    clearTimeout(timer);
  } catch (error) {
    console.error("[mg-portal] заявката не стигна до портала:", error);
  }
}

export async function notifyPortal(enquiry: PortalEnquiry): Promise<void> {
  await post("/api/portal/enquiry", enquiry);
}

/**
 * Брои посещение. Смятаме го за начало на сесия, когато човекът идва
 * отвън — тоест реферърът е чужд или го няма.
 */
export async function notifyPortalVisit(visit: {
  path?: string | null;
  referrer?: string | null;
  host?: string | null;
}): Promise<void> {
  const referrer = visit.referrer ?? "";
  let external = true;
  if (referrer && visit.host) {
    try {
      external = new URL(referrer).hostname.replace(/^www\./, "") !==
        visit.host.replace(/^www\./, "");
    } catch {
      external = true;
    }
  }

  await post("/api/portal/visit", {
    path: visit.path || "/",
    referrer: external ? referrer : "",
    first: external,
  });
}
