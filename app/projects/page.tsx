"use client"
import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '@/components/EmblaCarousel';
import Link from 'next/link';

export default function Projects() {
  const RegionMapSlides = [
    "documentation/region-map/Berry Preview 1",
    "documentation/region-map/Berry Preview 2",
    "documentation/region-map/Berry Preview 3",
    "documentation/region-map/Berry Preview 4",
    "documentation/region-map/Berry Preview 5"
  ];

  const PokeMarketSlides = [
    "documentation/poke-market/MenuText 1",
    "documentation/poke-market/BuyItemAmountDiscount",
    "documentation/poke-market/BuyItemMult",
    "documentation/poke-market/BuyThanks",
    "documentation/poke-market/BuyBonusMult"
  ]
  const Options: EmblaOptionsType = { loop: true }

  return (
    <article className="flex flex-col mt-16 items-center min-h-screen bg-gray-900 text-white">
      <section className="text-center p-8 w-7/8 lg:w-5/8">
        <h1 className="text-3xl font-bold mb-4">Doggo Bot</h1>
        <a
          href="/doggo-bot"
          className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
        >
          DoggoBot
        </a>
      </section>
      <hr className="border-gray-600/75 border-t-1 mt-2 mb-4"/>
      <section className="text-center p-8 w-7/8 lg:w-5/8">
        <h1 className="text-3xl font-bold mb-4">Essential Projects</h1>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky&#39;s Region Map</h2>
          <p className="my-4">Have you been waiting for a Region Map plugin that supports any Region Map size and works for both v20.1 (up to v2.7.0) and v21.1? Then don&#39;t look any further because you cam to the right place!<br/>I present to you Arcky&#39;s Region Map</p>
          <Link
            href="/documentation/region-map"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </Link>
          <EmblaCarousel slides={RegionMapSlides} options={Options}/>
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky&#39;s Poké Mart</h2>
          <p className="my-4">Always wanted to take your game&#39;s shopping experience to the next level but didn&#39;t really know where to start? Well don&#39;t worry about it any longer as Arcky&#39;s Poké Market might be just what you&#39;re looking for!</p>
          <Link
            href="/documentation/poke-market"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </Link>
          <EmblaCarousel slides={PokeMarketSlides} options={Options}/>
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky&#39;s Graphic Transparency</h2>
          <p className="my-4">What could behind that building? or that tree over there? Time to have fun and hide items, trainers, monsters behind buildings in your game. Go wild!</p>
          <Link
            href="/documentation/graphic-transparency"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </Link>
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky&#39;s Vending Machine</h2>
          <p className="my-4">Who doesn&#39;t want to have a bit more fun with a Vending Machine in their Game? And one that you can also kick instead of wasting your money?</p>
          <Link
            href="/documentation/vending-machine"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </Link>
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky&#39;s Utilities</h2>
          <p className="my-4">It contains a lot of utilities because every cool programmer has it&#39;s own unique utilities you know.</p>
          <Link
            href="/documentation/utilities"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </Link>
        </section>
      </section>
      <hr className="border-gray-600/75 border-t-1 mt-2 mb-4"/>
      <section className="p-2">
        <h1 className="text-3xl font-bold mb-4">Other Projects</h1>
        <p className="text-center">You&#39;re looking at it...</p>
      </section>
    </article>
  )
}