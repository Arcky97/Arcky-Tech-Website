"use client"
import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '@/components/EmblaCarousel';

export default function Projects() {
  const Slides = [
    "/images/documentation/region-map/Bery Preview 1.png",
    "/images/documentation/region-map/Bery Preview 2.png",
    "/images/documentation/region-map/Bery Preview 3.png",
    "/images/documentation/region-map/Bery Preview 4.png",
    "/images/documentation/region-map/Bery Preview 5.png"
  ];
  const Options: EmblaOptionsType = { loop: true }

  return (
    <article className="flex flex-col mt-16 items-center min-h-screen bg-gray-900 text-white">
      <section className="text-center p-8 w-5/8">
        <h1 className="text-3xl font-bold mb-4">Doggo Bot</h1>
        <a
          href="/doggo-bot"
          className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
        >
          DoggoBot
        </a>
      </section>
      <hr className="my-4 w-5/8 border-white border-t-2"></hr>
      <section className="text-center p-8 w-5/8">
        <h1 className="text-3xl font-bold mb-4">Essential Projects</h1>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky's Region Map</h2>
          <p className="my-4">Have you been waiting for a Region Map plugin that supports any Region Map size and works for both v20.1 (up to v2.7.0) and v21.1? Then don't look any further because you cam to the right place!<br/>I present to you Arcky's Region Map</p>
          <a
            href="/documentation/region-map"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </a>
          <EmblaCarousel slides={[1, 2, 3, 4, 5, 6, 7, 8]} options={Options} />
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky's Poké Mart</h2>
          <p className="my-4">Always wanted to take your game's shopping experience to the next level but didn't really know where to start? Well don't worry about it any longer as Arcky's Poké Market might be just what you're looking for!</p>
          <a
            href="/documentation/poke-market"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </a>
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky's Graphic Transparancy</h2>
          <p className="my-4">What could behind that building? or that tree over there? Time to have fun and hide items, trainers, monsters behind buildings in your game. Go wild!</p>
          <a
            href="/documentation/graphic-transparancy"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </a>
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky's Vending Machine</h2>
          <p className="my-4">Who doesn't want to have a bit more fun with a Vending Machine in their Game? And one that you can also kick instead of wasting your money?</p>
          <a
            href="/documentation/vending-machine"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </a>
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky's Utilities</h2>
          <p className="my-4">It contains a lot of utilities because every cool programmer has it's own unique utilities you know.</p>
          <a
            href="/documentation/utilities"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </a>
        </section>
      </section>
      <hr className="my-4 w-5/8 border-white border-t-2"></hr>
      <section className="p-2">
        <h1 className="text-3xl font-bold mb-4">Other Projects</h1>
        <p className="text-center">You're looking at it...</p>
      </section>
    </article>
  )
}