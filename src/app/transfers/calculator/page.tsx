import type { Metadata } from "next";
import Link from "next/link";
import TransferForm from "@/components/transfersForm/transferClient";
import { initialPrediction } from "@/data/initialPrediction";
import { CONFIG } from "@/data/config/company";
import { firstPlaces } from "@/data/firstPlaces";
import { secondPlaces } from "@/data/secendPlaces";
import { urlSlugify } from "@/lib/url";

export const metadata: Metadata = {
  title: "Transfer Calculator | Split Airport, Hotel & City Transfers",
  description:
    "Calculate transfer prices for Split Airport, hotels, ferry port, marinas, and destinations across Dalmatia. Get an instant estimate and contact us via WhatsApp or email.",
  alternates: {
    canonical: `${CONFIG.url}/transfers/calculator`,
  },
  openGraph: {
    title: "Transfer Calculator | Split Airport, Hotel & City Transfers",
    description:
      "Calculate transfer prices for Split Airport, hotels, ferry port, marinas, and destinations across Dalmatia.",
    url: `${CONFIG.url}/transfers/calculator`,
    siteName: "TORONTO Taxi",
    images: [
      {
        url: `${CONFIG.url}/city/split.jpg`,
        width: 1200,
        height: 630,
        alt: "Transfer calculator for Dalmatia transfers",
      },
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transfer Calculator | Split Airport, Hotel & City Transfers",
    description:
      "Calculate transfer prices for Split Airport, hotels, ferry port, marinas, and destinations across Dalmatia.",
    images: [`${CONFIG.url}/city/split.jpg`],
  },
};

export default function TransfersFrom() {
  const allPlaces = [...firstPlaces, ...secondPlaces];

  const relatedFromLinks = allPlaces.map((place) => ({
    href: `/transfers/${urlSlugify(place.main_text.toLowerCase())}`,
    title: `Transfers from ${place.main_text}`,
    description: `Private transfers from ${place.main_text} to destinations across Dalmatia.`,
  }));

  return (
    <>
      <main>
        <TransferForm initialPrediction={initialPrediction} />

        <section className="mx-auto mt-10 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Popular transfer starting points
            </h2>
            <p className="mt-2 max-w-2xl text-gray-600">
              Choose one of the most common pickup locations and continue
              directly to available transfer options.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedFromLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-4 hover:border-blue-200 hover:bg-blue-50 transition"
                >
                  <p className="font-extrabold text-gray-900">{link.title}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    {link.description}
                  </p>
                  <span className="mt-3 inline-block text-sm font-bold text-blue-600">
                    View transfers →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
