"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { urlSlugify } from "@/lib/url";
import { firstPlaces } from "@/data/firstPlaces";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showAllTaxi, setShowAllTaxi] = useState(false);

  // Taxi destinacije (slugovi)
  const taxiDestinations = useMemo(
    () => [
      "split",
      "trogir",
      "omis",
      "kastela",
      "podstrana",
      "solin",
      "dugopolje",
      "klis",
      "split-airport",
      "split-ferry-port",
    ],
    [],
  );

  const oneDayTrips = useMemo(
    () => [
      { name: "Krka National Park", path: "krka-national-park" },
      { name: "Plitvice Lakes", path: "plitvice-lakes" },
    ],
    [],
  );

  const humanize = (slug: string) =>
    slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const taxiList = showAllTaxi ? taxiDestinations : taxiDestinations.slice(0, 6);

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/10 grid place-items-center text-white font-extrabold">
                TC
              </div>
              <div>
                <h3 className="text-white text-lg font-extrabold tracking-tight">
                  Taxi Croatia
                </h3>
                <p className="text-xs text-gray-400">
                  Split • Dalmatia • 24/7
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Reliable taxi service across Dalmatia. Airport transfers, port
              pickups, and city rides — fast pickup and professional drivers.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200">
                Airport transfers
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200">
                Groups & vans
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200">
                24/7 support
              </span>
            </div>

            <div className="mt-6 space-y-2">
              <Link
                href="/about"
                className="block text-sm text-gray-300 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
              >
                About us
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-gray-300 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
              >
                Contact
              </Link>
              <Link
                href="/terms"
                className="block text-sm text-gray-300 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Taxi services */}
          <div>
            <h3 className="text-white text-lg font-extrabold mb-4">
              Taxi Services
            </h3>

            <ul className="space-y-2">
              {taxiList.map((dest) => (
                <li key={dest}>
                  <Link
                    href={`/taxi/${dest}`}
                    className="group inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                    aria-label={`Taxi ${humanize(dest)}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-600 group-hover:bg-blue-400 transition" />
                    <span>Taxi {humanize(dest)}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-3">
              <Link
                href="/taxi"
                className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
              >
                View all →
              </Link>

              {/* Show more only on small screens / when list is long */}
              {taxiDestinations.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowAllTaxi((v) => !v)}
                  className="text-sm font-semibold text-gray-300 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                >
                  {showAllTaxi ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          </div>

          {/* Transfers */}
          <div>
            <h3 className="text-white text-lg font-extrabold mb-4">
              Transfers
            </h3>

            <Link
              href="/transfers/calculator"
              className="inline-flex items-center justify-center w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white hover:bg-blue-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              🧮 Transfer Calculator
            </Link>

            <h4 className="mt-6 text-sm font-bold text-white/90">
              Popular routes
            </h4>

            <ul className="mt-3 space-y-2">
              {firstPlaces?.slice(0, 4).map((place) => (
                <li key={place.place_id}>
                  <Link
                    href={`/transfers/${urlSlugify(place.main_text)}`}
                    className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <span className="block text-sm font-semibold text-white">
                      {place.main_text}
                    </span>
                    <span className="block text-xs text-gray-400">
                      {place.secondary_text}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/transfers"
                  className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                >
                  All transfers →
                </Link>
              </li>
            </ul>
          </div>

          {/* One-day trips */}
          <div>
            <h3 className="text-white text-lg font-extrabold mb-4">
              One-Day Trips
            </h3>

            <ul className="space-y-2">
              {oneDayTrips.map((trip) => (
                <li key={trip.path}>
                  <Link
                    href={`/one-day-trips/${trip.path}`}
                    className="group inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-600 group-hover:bg-blue-400 transition" />
                    <span>{trip.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/one-day-trips"
                  className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                >
                  All one day trips →
                </Link>
              </li>
            </ul>

            {/* Optional quick contact block (nice on desktop) */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-bold text-white">Quick booking</p>
              <p className="mt-1 text-xs text-gray-400">
                Book by phone or WhatsApp — 24/7.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-white text-gray-950 px-4 py-2 text-sm font-extrabold hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-400">
            © {currentYear} Taxi Croatia. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {/* Replace these with real URLs when you have them */}
            <a
              href="/"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            <a
              href="/"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.22 1.802h-.255c-2.431 0-2.813.011-3.813.058-1.005.046-1.55.209-1.913.344-.48.178-.823.39-1.174.741-.34.34-.552.683-.73 1.174-.135.363-.298.908-.344 1.913-.047 1-.058 1.38-.058 3.856v.255c0 2.476.011 2.857.058 3.856.046 1.005.209 1.55.344 1.913.178.48.39.823.73 1.174.34.34.683.552 1.174.73.363.135.908.298 1.913.344.976.045 1.335.055 3.637.055h.255c2.302 0 2.661-.01 3.637-.055 1.005-.046 1.55-.209 1.913-.344.48-.178.823-.39 1.174-.73.34-.34.552-.683.73-1.174.135-.363.298-.908.344-1.913.045-.976.055-1.335.055-3.637v-.255c0-2.302-.01-2.661-.055-3.637-.046-1.005-.209-1.55-.344-1.913-.178-.48-.39-.823-.73-1.174-.34-.34-.683-.552-1.174-.73-.363-.135-.908-.298-1.913-.344-1-.047-1.38-.058-3.813-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}