import Image from "next/image";
import Link from "next/link";
import { areaContact, areaServed } from "@/data/areaContact/areaContact";
import { CONFIG } from "@/data/config/company";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taxi Services in Dalmatia | Split, Trogir, Omiš & More",
  description:
    "Reliable taxi services across Dalmatia including Split, Trogir, Omiš, Kaštela, Podstrana, Solin, Dugopolje, and Klis. Airport, port, hotel, and city transfers available 24/7.",
  alternates: {
    canonical: `${CONFIG.url}/taxi`,
  },
  openGraph: {
    title: "Taxi Services in Dalmatia | Split, Trogir, Omiš & More",
    description:
      "Reliable taxi services across Dalmatia including Split, Trogir, Omiš, Kaštela, Podstrana, Solin, Dugopolje, and Klis. Airport, port, hotel, and city transfers available 24/7.",
    url: `${CONFIG.url}/taxi`,
    siteName: "TORONTO Taxi",
    images: [
      {
        url: `${CONFIG.url}/city/split.jpg`,
        width: 1200,
        height: 630,
        alt: "Taxi services across Dalmatia",
      },
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxi Services in Dalmatia | Split, Trogir, Omiš & More",
    description:
      "Reliable taxi services across Dalmatia with airport, port, hotel, and city transfers available 24/7.",
    images: [`${CONFIG.url}/city/split.jpg`],
  },
};

export default function TaxiListPage() {
  const availableAreas = Object.keys(areaServed).filter(
    (key) => areaContact[key as keyof typeof areaContact],
  );



  return (
    <>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-900">
          <div className="absolute inset-0 opacity-40">
            {/* optional: background image */}
          </div>
          <div className="relative px-6 py-14 sm:px-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Taxi Services in Croatia
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              Reliable transfers across Dalmatia — airports, ports, hotels, and
              cities.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableAreas.map((key) => {
            const area = areaServed[key as keyof typeof areaServed];
            return (
              <Link
                href={`/taxi/${area.path}`}
                key={key}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="relative aspect-video w-full bg-gray-100">
                  <Image
                    src={area.image}
                    alt={`Taxi service in ${area.cityName}`}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition">
                    Taxi {area.cityName}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {area.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">
                      View & Book →
                    </span>
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                      Available now
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        {/* Why us */}
        <section className="mt-14 rounded-3xl border border-gray-100 bg-gray-50 p-8">
          <h2 className="text-center text-2xl font-extrabold text-gray-900">
            Why choose us?
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: "🚖",
                title: "24/7 Availability",
                text: "Always here when you need us.",
              },
              {
                icon: "👥",
                title: "Groups Welcome",
                text: "Vehicles from 4 to 50 passengers.",
              },
              {
                icon: "📍",
                title: "All Destinations",
                text: "Airports, ports, hotels, cities.",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="text-4xl">{f.icon}</div>
                <h3 className="mt-3 font-extrabold text-gray-900">{f.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
