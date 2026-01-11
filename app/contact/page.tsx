import ContactForm from "@/components/ContactForm";
import Link from "next/link";

export default function Contact() {
  return (
    <article className="flex flex-col pt-10 h-full items-center text-white text-center">
      <section className="w-7/8 lg:w-5/8">
        <h1 className="head2">Contact</h1>

        <p className="text-lg text-gray-300 mb-6">
          If you&#39;d like to get in touch, feel free to use the contact form below
          or reach out to me on Discord. Whether it&#39;s a question, feedback, or
          something related to my projects, I&#39;ll do my best to respond.
        </p>

        {/* Contact form goes here */}
        <ContactForm/>

        <p className="text-lg text-gray-300">
          You can also find me on my{" "}
          <Link href="https://discord.gg/HK99jTNqS2" className="font-semibold text-white">Discord server</Link>.
        </p>
      </section>
    </article>
  );
}
