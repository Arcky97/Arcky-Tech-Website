"use client"
import ColorButton from "@/components/ColorButton";
import Link from "next/link";

export default function Home() {
  return (
    <article className="flex flex-col mt-16 items-center min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="text-center p-8 w-7/8 lg:w-5/8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Arcky-Tech</h1>
        <p className="text-lg text-gray-300 max-w mb-4">
          Hello, my name is Arcky. For years I've been fascinated by coding so I've been working on a lot of different projects among the years. You can take a look at them by clicking the button below.
        </p>
        <Link
          href="/projects"
          className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-lg"
        >
          View Projects 
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8 w-7/8 lg:w-5/8">
        {[
          { title: "Doggo Bot", desc: "A Bot for your Discord Server with a ton of features. Including a customizable level system, moderation commands, fun commands and even a chat function and so much more.", link: <ColorButton color="blue" intensity="600" text="View Info" href="/doggo-bot"></ColorButton>},
          { title: "Region-Map", desc: "A Plugin for your Game that brings the Region Map to a next level. Packed with a ton of features, there's nearly nothing this plugin doesn't do. Check it out below.", link: <ColorButton color="blue" intensity="600" text="View Info" href="/documentation/region-map"></ColorButton>}
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg min-w-[200px] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50 hover:ring-2 hover:ring-blue-500"
          >
            <h3 className="text-xl font-semibold text-center">{feature.title}</h3>
            <p className="text-gray-400 mt-5">{feature.desc}</p>
            <div className="text-center mt-5">
              {feature.link ?? ""}
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
