export default function CookiePolicy() {
  return (
    <article className="flex flex-col min-h-[calc(100vh-189px)] bg-gray-900 text-white p-8 mx-auto lg:w-5/8">
      <h1 className="text-3xl font-bold mb-4 text-center">Cookie Policy</h1>
      <em className="text-sm text-gray-400 text-center">Effective Date: July 20, 2025</em>

      <section className="my-6 text-left">
        <p>
          We use cookies that are strictly necessary for the functioning of this website.
          These include:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Session cookies for logging in with Discord</li>
          <li>Anonymous preferences stored in your browser</li>
          <li>Traffic measurement via analytics</li>
        </ul>

        <p className="mt-4">
          These cookies cannot be disabled as they are essential to the site’s core functionality.
          You can manage or delete cookies at any time through your browser settings.
        </p>

        <p className="mt-4">
          For more details, see our <a href="/privacy-policy" className="text-blue-400 underline">Privacy Policy</a>.
        </p>
      </section>
    </article>
  );
}
