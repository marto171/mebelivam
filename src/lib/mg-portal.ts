/**
 * Праща копие от запитването към MG Portal, за да го вижда клиентът в
 * своя профил. Никога не хвърля и не бави отговора към посетителя —
 * ако порталът е недостъпен, формата на сайта продължава да работи.
 */
const ENDPOINT =
  process.env.MG_PORTAL_URL ?? "https://www.mgenterprise.bg/api/portal/enquiry";

export type PortalEnquiry = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  source?: string | null;
  [key: string]: unknown;
};

export async function notifyPortal(enquiry: PortalEnquiry): Promise<void> {
  const key = process.env.MG_PORTAL_KEY;
  if (!key) return;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, ...enquiry }),
      signal: controller.signal,
    });
    clearTimeout(timer);
  } catch (error) {
    console.error("[mg-portal] запитването не стигна до портала:", error);
  }
}
