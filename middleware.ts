import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const disabledPatterns = [
  /^\/documentation\/doggo-bot/,
  /^\/doggo-bot\/dashboard\/[^/]+\/levels$/,
  /^\/doggo-bot\/dashboard\/[^/]+\/logging$/,
  /^\/doggo-bot\/dashboard\/[^/]+\/moderation$/,
  /^\/doggo-bot\/dashboard\/[^/]+\/reactionroles$/,
  /^\/doggo-bot\/dashboard\/[^/]+\/embeds$/,
  /^\/doggo-bot\/dashboard\/[^/]+\/settings$/,
  /^\/documentation\/graphic-transparency/,
  /^\/documentation\/vending-machine/,
  /^\/scoreboard/,
  /^\/about/,
  /^\/contact/
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDisabled = disabledPatterns.some(pattern => pattern.test(pathname));

  if (isDisabled) {
    const url = request.nextUrl.clone();
    url.pathname = '/coming-soon';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
