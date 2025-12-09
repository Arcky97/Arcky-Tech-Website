import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const disabledPatterns = [
  /^\/documentation\/doggo-bot/,
  /^\/doggo-bot\/dashboard\/[^/]+\/levels$/,
  /^\/doggo-bot\/dashboard\/[^/]+\/logging$/,
  /^\/doggo-bot\/dashboard\/[^/]+\/moderation$/,
  /^\/doggo-bot\/dashboard\/[^/]+\/reactionroles$/,
  ///^\/doggo-bot\/dashboard\/[^/]+\/embeds$/,
  /^\/doggo-bot\/dashboard\/[^/]+\/settings$/,
  /^\/documentation\/graphic-transparency/,
  /^\/documentation\/vending-machine/,
  /^\/projects/,
  /^\/scoreboard/,
  /^\/about/,
  /^\/contact/
];

export function middleware(request: NextRequest) {
  const badIPs = ["172.237.55.180", "149.248.44.88"];

  const xfwd = request.headers.get("x-forwarded-for");

  const ip = xfwd?.split(",")[0]?.trim() || "0.0.0.0";

  if (badIPs.includes(ip)) {
    return new NextResponse("Blocked", { status: 403 });
  }
  
  const { pathname } = request.nextUrl;

  const isDisabled = disabledPatterns.some(pattern => pattern.test(pathname));

  if (isDisabled) {
    const url = request.nextUrl.clone();
    url.pathname = '/coming-soon';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
