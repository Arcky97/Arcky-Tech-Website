import Link from "next/link";

export default function Projects() {

  return (
    <article className="flex flex-col mt-16 items-center min-h-screen bg-gray-900 text-white">
      <section className="text-center p-8 w-5/8">
        <h1 className="text-3xl font-bold mb-4">Doggo Bot</h1>
        <Link
          href="/doggo-bot"
          className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
        >
          DoggoBot
        </Link>
      </section>
      <hr className="my-4 w-5/8 border-white border-t-2"></hr>
      <section className="text-center p-8 w-5/8">
        <h1 className="text-3xl font-bold mb-4">Essential Projects</h1>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky&apos;s Region Map</h2>
          <p className="my-4">Have you been waiting for a Region Map plugin that supports any Region Map size and works for both v20.1 (up to v2.7.0) and v21.1? Then don&apos;t look any further because you cam to the right place!<br/>I present to you Arcky&apos;s Region Map</p>
          <Link
            href="/documentation/region-map"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </Link>
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky&apos;s Poké Mart</h2>
          <p className="my-4">Always wanted to take your game&apos;s shopping experience to the next level but didn&apos;t really know where to start? Well don&apos;t worry about it any longer as Arcky&apos;s Poké Market might be just what you&apos;re looking for!</p>
          <Link
            href="/documentation/poke-market"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </Link>
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky&apos;s Graphic Transparancy</h2>
          <p className="my-4">What could behind that building? or that tree over there? Time to have fun and hide items, trainers, monsters behind buildings in your game. Go wild!</p>
          <Link
            href="/documentation/graphic-transparancy"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </Link>
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky&apos;s Vending Machine</h2>
          <p className="my-4">Who doesn&apos;t want to have a bit more fun with a Vending Machine in their Game? And one that you can also kick instead of wasting your money?</p>
          <Link
            href="/documentation/vending-machine"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </Link>
        </section>
        <section className="p-2">
          <h2 className="text-2xl font-semibold my-4">Arcky&apos;s Utilities</h2>
          <p className="my-4">It contains a lot of utilities because every cool programmer has it&apos;s own unique utilities you know.</p>
          <Link
            href="/documentation/utilities"
            className="border border-blue-600 bg-blue-600 select-none cursor-pointer hover:bg-transparent text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
          >
            Discover now
          </Link>
        </section>
      </section>
      <hr className="my-4 w-5/8 border-white border-t-2"></hr>
      <section className="p-2">
        <h1 className="text-3xl font-bold mb-4">Other Projects</h1>
        <p className="text-center">You&apos;re looking at it...</p>
      </section>
    </article>
  )
}