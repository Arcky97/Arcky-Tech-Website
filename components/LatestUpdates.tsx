import { getLatestProjectUpdates } from "@/lib/getLatestProjectUpdates";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";

export default function LatestUpdates() {
  const updates = getLatestProjectUpdates();

  const mdxComponents = useMDXComponents({});
  return (
    <section className="text-center w-7/8 lg:w-6/8">
      <h2 className="text-white text-4xl font-bold text-center mb-3">Recent Updates</h2>
      <div className="flex flex-wrap justify-center gap-8 p-4">
        {updates.map((u, idx) => (
          <div key={idx} className="w-[100%] md:w-[45%] 2xl:w-[31%] bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold">{u.title}</h2>
            <p className="text-md text-gray-400 italic pt-2">{u.date} • {u.project}</p>
            <div className="prose prose-invert px-4">
              <MDXRemote source={u.excerpt} components={mdxComponents} />
            </div>
            <a href={u.slug} className="inline-block mt-1 text-blue-500 hover:font-bold">Read more</a>
          </div>
        ))}
      </div>
      <br/>
      <hr className="border-gray-600/75 border-t-1 mt-2 mb-4"/>
    </section>
  )
}