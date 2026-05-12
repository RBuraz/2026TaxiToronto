// taxiintl/src/app/transfers/page.tsx
import React from "react";
import Link from "next/link";
import { firstPlaces } from "@/data/firstPlaces";
import { secondPlaces } from "@/data/secendPlaces";
import { urlSlugify } from "@/lib/url";
import {
  Plane,
  Ship,
  Hotel,
  MapPin,
  Building,
  Anchor,
  Calculator,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react";

import type { Metadata } from "next";
import { CONFIG } from "@/data/config/company";

export const metadata: Metadata = {
  title: "Croatia Transfers from Split Airport, Port & Hotels | TORONTO Taxi",
  description:
    "Private transfer services from Split Airport (SPU), Ferry Port, hotels, marinas, and towns across Dalmatia. Fixed-price transfers, 24/7 availability, and instant price calculator.",
  alternates: {
    canonical: `${CONFIG.url}/transfers`,
  },
  openGraph: {
    title: "Croatia Transfers from Split Airport, Port & Hotels | TORONTO Taxi",
    description:
      "Private transfer services from Split Airport (SPU), Ferry Port, hotels, marinas, and towns across Dalmatia. Fixed-price transfers, 24/7 availability, and instant price calculator.",
    url: `${CONFIG.url}/transfers`,
    siteName: "TORONTO Taxi",
    images: [
      {
        url: `${CONFIG.url}/city/split.jpg`,
        width: 1200,
        height: 630,
        alt: "Croatia transfer services from Split Airport and Dalmatia",
      },
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Croatia Transfers from Split Airport, Port & Hotels | TORONTO Taxi",
    description:
      "Private transfer services from Split Airport, Ferry Port, hotels, marinas, and towns across Dalmatia.",
    images: [`${CONFIG.url}/city/split.jpg`],
  },
};

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">{icon}</div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p className="mt-3 max-w-3xl text-base md:text-lg text-gray-600">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
      <span className="opacity-90">{icon}</span>
      <span className="opacity-95">{text}</span>
    </div>
  );
}

function CardLink({
  href,
  title,
  description,
  icon,
  badge,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-700">{icon}</div>
        <div className="min-w-0">
          <h3 className="font-extrabold text-gray-900 group-hover:text-blue-700 transition">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600">{description}</p>

          <div className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
            View offers{" "}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>

      {badge ? (
        <div className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1 text-xs font-extrabold text-green-800">
          {badge}
        </div>
      ) : null}
    </Link>
  );
}

export default function Transfers() {
  const yearsOfExperience = new Date().getFullYear() - 2019;

  // Airports list (we won't render a list here, but keep it in case you need later)
  const airports = firstPlaces.filter((p) => p.types?.includes("airport"));

  // Ports list (we also won't render a list now; we render only Ferry Port Split)
  const ports = firstPlaces.filter((p) => {
    const text = p.main_text.toLowerCase();
    const desc = p.description.toLowerCase();

    return (
      (text.includes("ferry") ||
        text.includes("port") ||
        text.includes("luka") ||
        desc.includes("ferry") ||
        desc.includes("port") ||
        desc.includes("luka")) &&
      !text.includes("airport") &&
      !desc.includes("airport") &&
      !text.includes("zračna") &&
      !desc.includes("zračna")
    );
  });

  const marinas = [...firstPlaces, ...secondPlaces].filter(
    (p) =>
      p.main_text.toLowerCase().includes("marina") ||
      p.description.toLowerCase().includes("marina"),
  );

  const hotels = secondPlaces.filter((p) => p.types?.includes("lodging"));

  const towns = [...firstPlaces, ...secondPlaces].filter(
    (p) => p.types?.includes("locality") || p.types?.includes("political"),
  );



  return (
    <>

      {/* HERO */}
      <section className="bg-linear-to-br from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Croatia Transfer Services
            </h1>
            <p className="mt-4 text-lg md:text-xl text-blue-100">
              Reliable transfers from Split Airport (SPU), Ferry Port and Bus
              Station to Split and all surrounding destinations.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <FeaturePill icon={<Clock className="h-4 w-4" />} text="24/7" />
              <FeaturePill
                icon={<Plane className="h-4 w-4" />}
                text="Flight tracking"
              />
              <FeaturePill
                icon={<Shield className="h-4 w-4" />}
                text="Licensed & insured"
              />
              <FeaturePill
                icon={<Award className="h-4 w-4" />}
                text={`${yearsOfExperience}+ years`}
              />
            </div>
          </div>

          {/* CTA panel */}
          <div className="mt-10 rounded-3xl border border-white/20 bg-white/10 p-6 md:p-8 backdrop-blur">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/15 p-4">
                  <Calculator className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold">Transfer Calculator</p>
                  <p className="mt-1 text-blue-100">
                    Calculate price & book instantly.
                  </p>
                </div>
              </div>

              <Link
                href="/transfers/calculator"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-extrabold text-blue-700 hover:bg-blue-50 transition shadow-lg"
              >
                <Calculator className="h-5 w-5" />
                Calculate price
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Trusted Transfer Partner Since 2019
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                For over <strong>{yearsOfExperience} years</strong>, we’ve been
                welcoming guests at <strong>Split Airport (SPU)</strong>,{" "}
                <strong>Ferry Port</strong> and <strong>Bus Station</strong>,
                delivering smooth transfers to hotels, marinas and destinations
                across Split-Dalmatia County.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2">
                {[
                  "Radisson Blu Resort & Spa",
                  "Le Méridien Lav",
                  "Hotel Amfora",
                  "AC Hotel Split",
                ].map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2"
                  >
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-800">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "5000+", v: "Happy Clients" },
                { k: "24/7", v: "Availability" },
                { k: "15+", v: "Vehicles" },
                { k: "50+", v: "Hotel Partners" },
              ].map((x) => (
                <div
                  key={x.v}
                  className="rounded-2xl border border-gray-100 bg-blue-50 p-6 text-center"
                >
                  <div className="text-3xl font-extrabold text-blue-700">
                    {x.k}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-gray-700">
                    {x.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AIRPORT — SPLIT AIRPORT FEATURE BLOCK */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader
            icon={<Plane className="h-7 w-7" />}
            title="Airport Transfers — Split Airport (SPU)"
            subtitle="Meet & greet with a name sign, flight tracking, and comfortable ride to your destination. Free waiting time: 60 minutes for international flights."
          />

          <div className="overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 grid md:grid-cols-2">
            {/* LEFT SIDE — CONTENT */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                  Split Airport (SPU)
                </h3>

                <p className="text-gray-600 mb-6">
                  Airport transfers to Split, hotels, marinas and towns across
                  Split-Dalmatia County. Your driver waits at arrivals and
                  monitors your flight — even if delayed.
                </p>

                {/* INCLUDED FEATURES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    "Name sign at arrivals",
                    "Flight tracking",
                    "Fixed price via calculator",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/transfers/split-airport-spu"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-white font-extrabold hover:bg-blue-700 transition shadow-md"
                >
                  View offers
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE — VISUAL */}
            <div className="relative min-h-65 md:min-h-full bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white">
              <div className="text-center px-6">
                <Plane className="w-16 h-16 mx-auto mb-4 opacity-90" />
                <p className="text-lg font-semibold">Split Airport Pickup</p>
                <p className="text-blue-100 text-sm mt-2">
                  Meet & greet • Flight tracking • No waiting fees
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTS + MARINAS (SINGLE: Ferry Port Split) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader
            icon={<Ship className="h-7 w-7" />}
            title="Ferry Port & Marina Transfers"
            subtitle="We monitor ferry arrivals and wait regardless of delays. Special offers for nautical tourism and marinas."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {/* Ferry Port Split - single */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <Ship className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-extrabold text-gray-900">
                    Ferry Port Split
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We track ferry arrivals (Ancona, Rijeka, Dubrovnik and
                    islands Brač, Hvar, Vis, Korčula) and wait even if delayed.
                  </p>
                  <Link
                    href="/transfers/ferry-port-split"
                    className="mt-4 inline-flex items-center gap-2 font-extrabold text-blue-700 hover:gap-3 transition-all"
                  >
                    Port transfers <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Marinas list (no "View more marinas") */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-white/60 p-3 text-blue-700">
                  <Anchor className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  Marinas & Nautical Tourism
                </h3>
              </div>
              <p className="mt-3 text-gray-700">
                Popular marina transfers (fast booking):
              </p>

              <ul className="mt-4 space-y-2">
                {marinas.slice(0, 8).map((m) => (
                  <li key={m.place_id}>
                    <Link
                      href={`/transfers/${urlSlugify(m.main_text)}`}
                      className="inline-flex items-center gap-2 font-semibold text-gray-800 hover:text-blue-700"
                    >
                      <span className="text-blue-700">•</span> {m.main_text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOTELS */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader
            icon={<Hotel className="h-7 w-7" />}
            title="Hotel Transfers"
            subtitle="We collaborate with major hotels in Split and surrounding areas — smooth pickup from airport, port or bus station."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {hotels.slice(0, 9).map((hotel) => (
              <Link
                key={hotel.place_id}
                href={`/transfers/${urlSlugify(hotel.main_text)}`}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                    <Building className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-gray-900 group-hover:text-blue-700 transition">
                    {hotel.main_text}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Transfers to/from {hotel.main_text} and all locations around
                  Split.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                  View offers{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOWNS */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader
            icon={<MapPin className="h-7 w-7" />}
            title="Transfers to Towns Around Split"
            subtitle="We operate across Split-Dalmatia County. Pick your destination and see offers instantly."
          />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {towns.map((town) => (
              <Link
                key={town.place_id}
                href={`/transfers/${urlSlugify(town.main_text)}`}
                className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-center hover:bg-blue-50 hover:border-blue-200 transition"
              >
                <span className="block font-extrabold text-gray-900">
                  {town.main_text}
                </span>
                <span className="mt-0.5 block text-xs text-gray-500">
                  {town.secondary_text}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-blue-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-extrabold text-center">
            Why Travelers Choose Us
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              {
                icon: <Clock className="h-7 w-7" />,
                title: "24/7 Availability",
                text: "Every day, anytime you need us.",
              },
              {
                icon: <Shield className="h-7 w-7" />,
                title: "Safety First",
                text: "Experienced drivers & serviced vehicles.",
              },
              {
                icon: <Plane className="h-7 w-7" />,
                title: "Flight Tracking",
                text: "We monitor your flight & wait free of charge.",
              },
              {
                icon: <Award className="h-7 w-7" />,
                title: `${yearsOfExperience}+ Years`,
                text: "Trusted since 2019 by thousands of guests.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl bg-white/10 p-6 text-center border border-white/15"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  {f.icon}
                </div>
                <h3 className="text-xl font-extrabold">{f.title}</h3>
                <p className="mt-2 text-blue-100">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              "Licensed & insured",
              "Free cancellation",
              "Best price guarantee",
              "English & Croatian",
            ].map((t) => (
              <div
                key={t}
                className="flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white p-4"
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-gray-700">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Ready to Book Your Transfer?
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Calculate your price and book in just a few clicks.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/transfers/calculator"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-extrabold text-white hover:bg-blue-700 transition shadow-lg"
            >
              <Calculator className="h-5 w-5" />
              Transfer Calculator
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
