import { NextRequest, NextResponse } from "next/server";
import { decodeFromUrlSafeBase64, isValidHttpUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, ctx: { params: Promise<{ data: string }> }) {
  try {
    const { data } = await ctx.params;
    const payload = JSON.parse(decodeFromUrlSafeBase64(data)) as {
      url: string;
      utm?: Record<string, string>;
    };
    if (!payload?.url || !isValidHttpUrl(payload.url)) {
      return new NextResponse("Invalid URL", { status: 400 });
    }

    const incoming = new URL(req.url);
    const target = new URL(payload.url);

    // carry over any provided utm in payload
    if (payload.utm) {
      for (const [k, v] of Object.entries(payload.utm)) {
        if (!target.searchParams.has(k)) target.searchParams.set(k, v);
      }
    }

    // allow source override via ?s=instagram|youtube
    const source = incoming.searchParams.get("s");
    if (source && !target.searchParams.has("utm_source")) {
      target.searchParams.set("utm_source", source);
    }

    const res = NextResponse.redirect(target.toString(), 302);
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  } catch {
    return new NextResponse("Bad request", { status: 400 });
  }
}
