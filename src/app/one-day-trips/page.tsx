import type { Metadata } from "next";
import { oneDayTripsDestinations } from "@/data/oneDayTrips/oneDayTrips";
import { CONFIG } from "@/data/config/company";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Day Trips from Split | Krka, Plitvice & More",
  description:
    "Explore Croatia with private day trips from Split. Visit Krka, Plitvice, and other top destinations with hotel pickup, flexible schedules, and professional drivers.",
  alternates: {
    canonical: `${CONFIG.url}/one-day-trips`,
  },
  openGraph: {
    title: "Private Day Trips from Split | Krka, Plitvice & More",
    description:
      "Explore Croatia with private day trips from Split. Visit Krka, Plitvice, and other top destinations with hotel pickup, flexible schedules, and professional drivers.",
    url: `${CONFIG.url}/one-day-trips`,
    siteName: "TORONTO Taxi",
    images: [
      {
        url: `${CONFIG.url}/tours/plitvice/plitvice-1.jpg`,
        width: 1200,
        height: 630,
        alt: "Private day trips from Split",
      },
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Day Trips from Split | Krka, Plitvice & More",
    description:
      "Explore Croatia with private day trips from Split, including Krka, Plitvice, and more.",
    images: [`${CONFIG.url}/tours/plitvice/plitvice-1.jpg`],
  },
};

export default function OneDayTripsPage() {


  return (
    <>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header: mobile bez slike, desktop sa slikom */}
        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          {/* Mobile (bez slike) */}
          <div className="block sm:hidden px-5 py-7">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Private Day Trips from Split
            </h1>
            <p className="mt-3 text-gray-600">
              Explore Croatia&apos;s most beautiful destinations with private
              transfers, flexible schedules, and hotel pickup & drop-off.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                Private tour
              </span>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                Hotel pickup
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-800">
                Flexible schedule
              </span>
            </div>
          </div>

          {/* Desktop hero */}
          <div className="relative hidden sm:block aspect-24/9-full bg-gray-100">
            <Image
              src="/tours/plitvice/plitvice-1.jpg"
              alt="Private day trips from Split"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/10" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 py-10 md:px-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Private Day Trips from Split
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-white/90">
                  Explore Croatia&apos;s most beautiful destinations in comfort
                  with our private transfers. Hotel pickup & drop-off included.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mt-10 text-center">
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Discover the beauty of Croatia with our private day trips from
            Split. Travel in comfort with professional drivers, enjoy flexible
            schedules, and create unforgettable memories.
          </p>
        </section>

        {/* Grid */}
        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(oneDayTripsDestinations).map(([key, destination]) => (
            <Link
              href={`/one-day-trips/${key}`}
              key={key}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="relative aspect-video w-full bg-gray-100">
                <Image
                  src={destination.image}
                  alt={destination.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                    {destination.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-white/90 text-sm">
                    <span className="inline-flex items-center">
                      <span className="mr-2">📍</span>
                      {destination.distance} from Split
                    </span>
                    <span className="inline-flex items-center">
                      <span className="mr-2">⏱️</span>
                      {destination.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 line-clamp-3">
                  {destination.shortDescription}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center font-extrabold text-blue-600 group-hover:text-blue-700 transition">
                    View details & book
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                    Private tour
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Why us */}
        <section className="mt-14 rounded-3xl border border-gray-100 bg-gray-50 p-8">
          <h2 className="text-2xl font-extrabold text-center text-gray-900">
            Why choose our private day trips?
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🚐",
                title: "Comfortable Vehicles",
                text: "Modern, air-conditioned vehicles for your comfort.",
              },
              {
                icon: "⏱️",
                title: "Flexible Schedule",
                text: "Depart when you want, stay as long as you like.",
              },
              {
                icon: "👨‍✈️",
                title: "Professional Drivers",
                text: "Licensed, experienced, English-speaking drivers.",
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
