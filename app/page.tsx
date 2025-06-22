export default function Home() {
  return (
    <article className="flex flex-col mt-16 items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="text-center p-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Arcky-Tech</h1>
        <p className="text-lg text-gray-300 max-w">
          Hello, my name is Arcky.
        </p>
        <a
          href="/projects"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg"
        >
          View Projects 
        </a>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8 max-w-6xl w-full">
        {[
          { title: "A first item", desc: "A nice first item on this webpage. It's very sunny outside and I hope it's going to stay that way."},
          { title: "A second item", desc: "A cool second item on this webpage below the first item. But this item moves next to the first item when the page size changes."},
          { title: "a third item", desc: "A awesome third item on this webpage which is below the first and next item, even when the page size changes, it stays on the second row up to a certain width of the page."},
          { title: "another item", desc: "A beautiful item that is also the fourth one on this webpage and is below the first 3 items. It'll always be below the first 3 no matter what width the page has."},
          { title: "why not one more", desc: "And the final and gorgeous item that is on the third row then the webpage is small but is also on the second row when the page gets wider and will also remain next to the fourth item."},
          { title: "And a sixth one", desc: "And so we can add a sixth element that is just the same story as the items above, I guess you got the point by now."},
          { title: "And very last one", desc: "This is the last element, I promise. The items on each row seems to take the height of the biggest element but since this one is all alone on this row it can just get as tall as I want it to get. If I just keep talking here, it'll never end hahaha."}

        ].map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg min-w-[200px] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50 hover:ring-2 hover:ring-blue-500"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
