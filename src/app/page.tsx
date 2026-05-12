import Image from "next/image";
import Link from "next/link";
import { areaServed, vehicleInfo } from "@/data/areaContact/areaContact";
import { urlSlugify } from "@/lib/url";
import { firstPlaces } from "@/data/firstPlaces";
import { CONFIG } from "@/data/config/company";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TORONTO Taxi & Transfers | Split, Airport Transfers & Day Trips",
  description:
    "Professional taxi service, airport transfers, intercity transport, and private day trips in Split, Trogir, Omiš, Kaštela, and across Dalmatia. Available 24/7.",
  alternates: {
    canonical: `${CONFIG.url}/`,
  },
  openGraph: {
    title: "TORONTO Taxi & Transfers | Split, Airport Transfers & Day Trips",
    description:
      "Professional taxi service, airport transfers, intercity transport, and private day trips in Split, Trogir, Omiš, Kaštela, and across Dalmatia. Available 24/7.",
    url: `${CONFIG.url}/`,
    siteName: "TORONTO Taxi",
    images: [
      {
        url: `${CONFIG.url}/city/split.jpg`,
        width: 1200,
        height: 630,
        alt: "TORONTO Taxi & Transfers in Dalmatia",
      },
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TORONTO Taxi & Transfers | Split, Airport Transfers & Day Trips",
    description:
      "Professional taxi service, airport transfers, intercity transport, and private day trips across Dalmatia.",
    images: [`${CONFIG.url}/city/split.jpg`],
  },
};

export default function TaxiHomePage() {
  const popularDestinations = [
    "split",
    "trogir",
    "omis",
    "kastela",
    "podstrana",
    "solin",
  ];
  const yearFounded = 2019;
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - yearFounded;

  // Pronađi Split Airport iz firstPlaces
  const splitAirport = firstPlaces.find(
    (place) => place.main_text === "Split Airport (SPU)",
  );

  const airportSlug = splitAirport
    ? urlSlugify(splitAirport.main_text)
    : "split-airport-spu";

  // Destinacije za popularne rute
  const popularRoutes = [
    // Prva 4 - osnovne destinacije
    {
      to: "Split",
      toSlug: "split",
      time: "20 min",
      description: "City center, ferry port, hotels",
    },
    {
      to: "Trogir",
      toSlug: "trogir",
      time: "5-10 min",
      description: "UNESCO old town, Čiovo island",
    },
    {
      to: "Omiš",
      toSlug: "omis",
      time: "30 min",
      description: "Cetina River, beaches, fortress",
    },
    {
      to: "Podstrana",
      toSlug: "podstrana",
      time: "15-20 min",
      description: "Beachfront hotels, resorts",
    },

    // Sljedeća 4 - okolna mjesta
    {
      to: "Kaštela",
      toSlug: "kastela",
      time: "5-15 min",
      description: "Seven coastal villages, near airport",
    },
    {
      to: "Solin",
      toSlug: "solin",
      time: "15 min",
      description: "Ancient Salona, nearby towns",
    },
    {
      to: "Dugopolje",
      toSlug: "dugopolje",
      time: "15 min",
      description: "Highway exit, shopping center",
    },
    {
      to: "Klis",
      toSlug: "klis",
      time: "10-15 min",
      description: "Medieval fortress, hilltop views",
    },

    // Još 4 - Makarska rivijera i šire
    {
      to: "Makarska",
      toSlug: "makarska",
      time: "60 min",
      description: "Beautiful riviera, beaches",
    },
    {
      to: "Baška Voda",
      toSlug: "baska-voda",
      time: "50 min",
      description: "Coastal town, crystal clear sea",
    },
    {
      to: "Tučepi",
      toSlug: "tucepi",
      time: "55 min",
      description: "Beach resort, pine forests",
    },
    {
      to: "Brela",
      toSlug: "brela",
      time: "50 min",
      description: "Famous beaches, Punta Rata",
    },

    // Zadnja 4 - otoci i dalje destinacije (trajektom ili mostom)
    {
      to: "Dubrovnik",
      toSlug: "dubrovnik",
      time: "3 h",
      description: "Pearl of Adriatic, city walls",
    },
    {
      to: "Zadar",
      toSlug: "zadar",
      time: "1.5 h",
      description: "Sea organ, Roman forum",
    },
    {
      to: "Šibenik",
      toSlug: "sibenik",
      time: "45 min",
      description: "St. James Cathedral, forts",
    },
    {
      to: "Primošten",
      toSlug: "primosten",
      time: "35 min",
      description: "Beautiful peninsula, beaches",
    },
  ];



  return (
    <>
      <main className="bg-white">
        {/* Hero sekcija - velika slika i uvod */}
        <div className="relative w-full h-150">
          <Image
            src="/city/split.jpg"
            alt="Taxi service in Split, Croatia"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Toronto Taxi & Transfers
              </h1>
              <p className="text-2xl md:text-3xl mb-8">
                Your trusted partner in Dalmatia since 2019
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  href="/taxi"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition"
                >
                  Find Your Nearest Taxi
                </Link>
                <Link
                  href="/transfers/calculator"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition"
                >
                  Calculate Transfer Price
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* O nama sekcija - priča o firmi */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-700 mb-6">
                It all started in December 2019 when Tomislav Baričević founded{" "}
                <strong>TORONTO, obrt za prijevoz putnika i usluge</strong> in
                the small coastal town of Kaštel Sućurac. With a single vehicle
                and a vision to provide reliable, comfortable transportation
                along the beautiful Dalmatian coast, we began our journey.
              </p>
              <p className="text-gray-700 mb-6">
                Located at <strong>Petrina ulica 10A, Kaštel Sućurac</strong>,
                our company has grown over the past {yearsInBusiness} years
                through word of mouth and countless satisfied customers. What
                started as a one-man operation has evolved into a fleet of
                vehicles ready to serve you - from solo travelers to large
                groups, from quick city rides to long-distance transfers.
              </p>
              <p className="text-gray-700 mb-6">
                Our OIB is <strong>31557341439</strong> and MBS{" "}
                <strong>98096460</strong> - we're a fully registered, legitimate
                business you can trust. But numbers on paper don't tell the real
                story. The real story is in the thousands of passengers we've
                safely transported to Split Airport, the families we've helped
                reach their vacation rentals in Podstrana, the business
                travelers we've driven to meetings in Split, and the tourists
                we've taken to explore the wonders of Krka and Plitvice.
              </p>
              <p className="text-gray-700 font-semibold text-lg border-l-4 border-blue-600 pl-4 italic">
                "We don't just drive you from point A to point B. We're your
                local guides, your reliable partners, and your first taste of
                Dalmatian hospitality."
              </p>
            </div>
          </div>
        </div>

        {/* Naše usluge - gradske vožnje, transferi, međugradske */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Our Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Gradske vožnje */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="text-5xl mb-4">🏙️</div>
                <h3 className="text-2xl font-semibold mb-4">City Rides</h3>
                <p className="text-gray-600 mb-4">
                  Need to get across Split quickly? Going from the ferry port to
                  your hotel in Podstrana? Our city rides are perfect for short
                  trips, shopping tours, dinner outings, or business meetings.
                  We know every street, every shortcut, and the best routes to
                  avoid traffic.
                </p>
                <Link
                  href="/taxi/split"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Book a city ride →
                </Link>
              </div>

              {/* Transferi od/do aerodroma */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="text-5xl mb-4">✈️</div>
                <h3 className="text-2xl font-semibold mb-4">
                  Airport Transfers
                </h3>
                <p className="text-gray-600 mb-4">
                  Split Airport (SPU) is our home base. We meet you at arrivals
                  with a name board, help with luggage, and drive you
                  comfortably to any destination - Trogir (5 minutes), Split (20
                  minutes), Omiš (30 minutes), or further along the coast. No
                  waiting, no stress, no hidden fees.
                </p>
                <Link
                  href={`/transfers/${airportSlug}`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Book airport transfer →
                </Link>
              </div>

              {/* Međugradske vožnje */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="text-5xl mb-4">🛣️</div>
                <h3 className="text-2xl font-semibold mb-4">
                  Intercity Transfers
                </h3>
                <p className="text-gray-600 mb-4">
                  Going from Split to Dubrovnik? Zadar to Split? Need a ride to
                  the airport from Makarska? Our intercity transfers connect all
                  of Dalmatia. Comfortable vehicles, experienced drivers, and
                  door-to-door service. Perfect for longer journeys along the
                  stunning Adriatic coast.
                </p>
                <Link
                  href="/transfers"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Explore intercity routes →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Popularne rute od aerodroma */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-4">
            Popular Airport Transfers
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Most of our guests arrive at Split Airport and need a ride to their
            final destination. Here are our most booked routes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route) => (
              <Link
                key={route.to}
                href={`/transfers/${airportSlug}/${route.toSlug}`}
                className="bg-white border rounded-xl p-6 hover:shadow-lg transition group"
              >
                <h3 className="text-xl font-semibold group-hover:text-blue-600">
                  Split Airport → {route.to}
                </h3>
                <p className="text-gray-500 text-sm">{route.description}</p>
                <p className="text-gray-600 mt-2">
                  {route.time} drive • from 1-50 persons
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/transfers"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              View All Transfer Routes
            </Link>
          </div>
        </div>

        {/* Taxi destinacije - gdje sve vozimo */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Where We Drive
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              We serve the entire Split-Dalmatia County. Click on any location
              to see available taxi services:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularDestinations.map((key) => {
                const area = areaServed[key as keyof typeof areaServed];
                return (
                  <Link
                    key={key}
                    href={`/taxi/${key}`}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-md transition text-center group"
                  >
                    <span className="font-semibold group-hover:text-blue-600">
                      Taxi {area?.cityName}
                    </span>
                  </Link>
                );
              })}
              <Link
                href="/taxi"
                className="bg-blue-600 text-white p-4 rounded-lg shadow hover:shadow-md transition text-center font-semibold"
              >
                View All Locations
              </Link>
            </div>
          </div>
        </div>

        {/* Privatni izleti - Krka, Plitvice i ostalo */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-4">
            Private Day Trips & Excursions
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Want to explore Croatia's natural wonders? Let us take you on an
            unforgettable journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Krka */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto relative">
                <Image
                  src="/tours/krka/krka-1.jpg"
                  alt="Krka National Park"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  Krka National Park
                </h3>
                <p className="text-gray-600 mb-4">
                  Just an hour from Split, Krka National Park boasts stunning
                  waterfalls, crystal-clear pools, and walking trails. We'll
                  drive you there, wait while you explore, and bring you back.
                  Perfect for families and nature lovers. Visit Skradinski Buk,
                  swim near the waterfalls (where permitted), and enjoy the
                  pristine nature.
                </p>
                <Link
                  href="/one-day-trips/krka-national-park"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Book Krka day trip →
                </Link>
              </div>
            </div>

            {/* Plitvice */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto relative">
                <Image
                  src="/tours/plitvice/plitvice-3.jpg"
                  alt="Plitvice Lakes"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-2xl font-semibold mb-2">Plitvice Lakes</h3>
                <p className="text-gray-600 mb-4">
                  A UNESCO World Heritage site, Plitvice is Croatia's most
                  famous national park. Sixteen terraced lakes connected by
                  waterfalls, wooden walkways, and untouched wilderness. It's a
                  2.5-hour drive from Split, but absolutely worth it. We provide
                  comfortable transport so you can relax and enjoy the scenery.
                </p>
                <Link
                  href="/one-day-trips/plitvice-lakes"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Book Plitvice day trip →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/one-day-trips"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Explore All Day Trips
            </Link>
          </div>
        </div>

        {/* Transfer kalkulator CTA */}
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Know Your Price Before You Ride
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Use our transfer calculator to get an instant price estimate for
              any route. No surprises, just transparent pricing.
            </p>
            <Link
              href="/transfers/calculator"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition inline-block"
            >
              Calculate Your Transfer
            </Link>
          </div>
        </div>

        {/* Zadovoljni klijenti */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Our Customers Love Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">5000+ Happy Rides</h3>
              <p className="text-gray-600">
                Thousands of satisfied passengers since 2019
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚖</div>
              <h3 className="text-xl font-semibold mb-2">Modern Fleet</h3>
              <p className="text-gray-600">
                From comfortable sedans to spacious vans for groups
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🗣️</div>
              <h3 className="text-xl font-semibold mb-2">
                English Speaking Drivers
              </h3>
              <p className="text-gray-600">
                Friendly drivers who know the area inside out
              </p>
            </div>
          </div>
        </div>

        {/* Footer informacije - kontakt i OIB */}
        <div className="bg-gray-900 text-gray-300 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white text-xl font-semibold mb-4">
                  TORONTO - Taxi & Transfers
                </h3>
                <p className="mb-2">
                  obrt za prijevoz putnika i usluge, vl. Tomislav Baričević
                </p>
                <p className="mb-2">
                  Petrina ulica 10A, Kaštel Sućurac, 21212, Hrvatska
                </p>
                <p className="mb-2">OIB: 31557341439 | MBS: 98096460</p>
                <p className="mb-2">Founded: December 17, 2019</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
