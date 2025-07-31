"use client"

import DocsProgressBar from "@/components/documentations/DocsProgressBar"

export default function Documentation() {
  return (
    <article className="flex flex-col items-center text-white">
      <section className="text-center pt-8 w-7/8 lg:w-5/8">
        <h1 className="text-5xl font-bold mb-4">Documentation</h1>
        <p className="text-lg text-gray-300 max-w mb-2">This Page covers an overview of all documentations available on the site. See the side menu on the left to navigate to the project you would like to view documentation about.</p>
        <hr className="border-gray-600/75 border-t-1 mt-2 mb-4"/>
      </section>
      <section className="w-7/8 lg:w-5/8">
        <h2 className="text-white text-4xl font-bold text-center mb-3">Completion</h2>
        <p className="text-center text-lg text-gray-300 max-w mb-2">Below, you&apos;ll find the completion of each Documentation on the website.</p>
        <DocsProgressBar/>
      </section>
    </article>
  )
}