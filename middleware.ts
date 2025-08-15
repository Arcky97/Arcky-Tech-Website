import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const disabledRoutes = [
  //'/doggo-bot/dashboard', 
  //'/doggo-bot/servers', 
  '/documentation/doggo-bot', 
  //'/documentation/region-map', 
  '/documentation/graphic-transparency', 
  '/documentation/vending-machine', 
  '/scoreboard'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDisabled = disabledRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isDisabled) {
    const url = request.nextUrl.clone();
    url.pathname = '/coming-soon'
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}