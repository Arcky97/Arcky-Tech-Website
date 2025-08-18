import ColorButton from "@/components/ColorButton";
import LatestUpdates from "@/components/LatestUpdates";

export default function Home() {
  return (
    <article className="flex flex-col pt-10 items-center h-full text-white">
      {/* Hero Section */}
      <section className="text-center w-7/8 lg:w-5/8">
        <h1 className="head1">Welcome to Arcky-Tech</h1>
        <p className="text-lg text-gray-300 max-w mb-2">
          Hello, my name is Arcky. For years I&#39;ve been fascinated by coding, so I&#39;ve been working on a lot of different projects over the years. You can take a look yourself down below!
        </p>
        <hr className="border-gray-600/75 border-t-1 mt-2 mb-4"/>
      </section>
      {/* News Section */}
      <LatestUpdates/>
      {/* Features Section */}
      <section className="w-7/8 lg:w-5/8">
        <h2 className="text-white text-4xl font-bold text-center mb-3">Projects</h2>
        <div className="flex flex-wrap justify-center gap-8 p-4 ">
          {[
            { title: "Doggo Bot", desc: "A Bot for your Discord Server with a ton of features. Including a customizable level system, moderation commands, fun commands and even a chat function and so much more.", link: <ColorButton color="blue-600" text="View Info" href="/doggo-bot"/>},
            { title: "Region Map", desc: "A Plugin for your Game that brings the Region Map to a next level. Packed with a ton of features, there's nearly nothing this plugin doesn't do. Check it out below.", link: <ColorButton color="blue-600"  text="View Info" href="/documentation/region-map"/>},
            { title: "Poke Market", desc: "A Plugin for your Game that brings more to your Marts than what you would normally expect from a Mart in these Games. A lot of features that is. Check it out!", link: <ColorButton color="blue-600" text="View Info" href="/documentation/poke-market"/>},
            { title: "Graphic Transparency", desc: "A Plugin for your Game that brings another level to explorating Routes and Cities. You can hide Item, NPCs, overworld species behind buildings, trees, etc.", link: <ColorButton color="blue-600" text="View Info" href="/documentation/graphic-transparency"/>},
            { title: "Vending Machine", desc: "A Plugin for your Game that brings your vending machines to another level. Items can get stuck like a real one but this time you're allowed to kick the machine to get it out eventually.", link: <ColorButton color="blue-600" text="View Info" href="/documentation/vending-machine"/>}
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg w-[350px] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50 hover:ring-2 hover:ring-blue-500"
            >
              <h3 className="text-xl font-semibold text-left">{feature.title}</h3>
              <p className="text-gray-400 mt-5">{feature.desc}</p>
              <div className="text-center mt-5">
                {feature.link ?? ""}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
