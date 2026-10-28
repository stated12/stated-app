import type { Metadata } from "next";
import Link from "next/link";
import { plans, inr } from "../data";
import { Fonts, Eyebrow } from "../ui";

export const metadata: Metadata = {
  title: "For Authors -- Stated Bookshelf",
  description:
    "Bring your books, author profile, and reader reviews together in one shareable place. Stated Author and Stated Author Plus annual memberships.",
  metadataBase: new URL("https://app.stated.in"),
  alternates: { canonical: "https://app.stated.in/books/for-authors" },
  openGraph: { title: "Give Your Books a Lasting Home", url: "https://app.stated.in/books/for-authors", siteName: "Stated", type: "website" },
};

const interest = (plan: string) =>
  `mailto:hello@stated.in?subject=${encodeURIComponent("Stated Bookshelf: " + plan)}&body=${encodeURIComponent(
    "Hello Stated team,\n\nI am interested in " + plan + ".\n\nAuthor name:\nBook title(s):\nContact number:\n"
  )}`;

export default function ForAuthorsPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Fonts />

      <section className="border-b border-gray-200 px-6 pt-16 pb-12" style={{ background: "linear-gradient(180deg,#fafaf8 0%,#ffffff 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <Eyebrow>For authors</Eyebrow>
          <h1 className="serif text-5xl md:text-7xl font-light text-gray-900 leading-none tracking-tight mb-5">
            Give Your Books <em className="italic text-amber-600">a Lasting Home.</em>
          </h1>
          <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8">
            Bring your books, author profile, and reader reviews together in one shareable place. Stated Bookshelf helps readers
            discover your work and gives you a dedicated destination for collecting genuine reader perspectives.
          </p>
          <a href="#plans" className="inline-flex items-center bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all no-underline">See the plans</a>
        </div>
      </section>

      <section className="px-6 py-14 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Eyebrow>What you get</Eyebrow>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600 font-light leading-relaxed">
            {[
              ["An author profile", "A public page with your biography, your books and the reviews they have received, at one shareable address."],
              ["Book listings", "Each book gets its own page with cover, description, official purchase link and a review form."],
              ["Genuine reviews", "Readers submit reviews, the Stated team approves them, and you can invite readers with a link for each book."],
            ].map(([h, t]) => (
              <div key={h} className="rounded-xl border border-gray-200 p-5">
                <p className="text-gray-900 font-semibold mb-1">{h}</p>
                <p>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="px-6 py-14 border-b border-gray-100" style={{ background: "#fffbeb" }}>
        <div className="max-w-4xl mx-auto">
          <Eyebrow>Annual memberships</Eyebrow>
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((p) => (
              <div key={p.id} className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col">
                <p className="serif text-3xl text-gray-900">{p.name}</p>
                <p className="mt-2 mb-4 text-gray-900"><span className="text-3xl font-semibold">{inr(p.pricePaise)}</span> <span className="text-sm text-gray-500">per year</span></p>
                <ul className="space-y-2 text-sm text-gray-600 font-light mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><span className="text-amber-600">&#10003;</span>{f}</li>
                  ))}
                </ul>
                <a href={interest(p.name)} className="mt-auto inline-flex justify-center items-center bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all no-underline">
                  Register interest
                </a>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Online membership checkout is being set up. Register your interest and the Stated team will confirm your plan and next steps.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 border-b border-gray-100">
        <div className="max-w-3xl mx-auto space-y-8 text-sm text-gray-600 font-light leading-relaxed">
          <div>
            <Eyebrow>What a membership does not do</Eyebrow>
            <p>Payment does not guarantee positive reviews, media coverage, readership, sales or featured placement. Membership never influences whether a review is approved. Authors cannot edit reader reviews, approve their own reviews or remove legitimate criticism. They can flag a review for the Stated team to assess against our guidelines on abuse, spam, impersonation and irrelevant content.</p>
          </div>
          <div>
            <Eyebrow>Distinguished authors and paid memberships</Eyebrow>
            <p>These are separate. Distinguished-author invitations are an editorial decision made by Stated and cannot be bought. A paid membership never confers distinguished status, and taking part in the Stated Principles series is never conditional on buying a membership.</p>
          </div>
          <div>
            <Eyebrow>Term, renewal and expiry</Eyebrow>
            <p>Memberships run for one year and are renewed manually; nothing is charged automatically. If a membership expires, your books and their reviews stay on the Bookshelf. You simply cannot add new listings beyond your plan until you renew or upgrade. We never delete existing books because a limit is exceeded.</p>
          </div>
          <div>
            <Eyebrow>Refunds and cancellation</Eyebrow>
            <p>Cancelling does not automatically refund a completed payment. For a refund or cancellation question, write to <a href="mailto:hello@stated.in" className="text-amber-700 hover:underline">hello@stated.in</a> and the Stated team will respond.</p>
          </div>
          <p>
            Readers can always browse books and read reviews for free. <Link href="/books" className="text-amber-700 hover:underline">Back to the Bookshelf</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
