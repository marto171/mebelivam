import { NextResponse } from "next/server";
import { notifyPortalVisit } from "@/lib/mg-portal";

/** Приема посещение от страницата и го брои в MG Portal. */
export async function POST(request: Request) {
  let path = "/";
  let referrer: string | null = null;
  try {
    const body = await request.json();
    path = String(body.path ?? "/").slice(0, 200);
    referrer = body.referrer ? String(body.referrer).slice(0, 300) : null;
  } catch {
    /* без тяло — броим го като начална страница */
  }

  await notifyPortalVisit({ path, referrer, host: request.headers.get("host") });

  return NextResponse.json({ ok: true });
}
