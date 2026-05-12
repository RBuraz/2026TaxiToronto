import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  oneDayTripsDestinations,
  oneDayTripsContact,
} from "@/data/oneDayTrips/oneDayTrips";
import { CONFIG } from "@/data/config/company";
import WhatsAppButton from "@/components/contact/WhatsAppButton";
import EmailButton from "@/components/contact/EmailButton";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { destination } = await params;

  const data = oneDayTripsDestinations[destination];

  if (!data) {
    return {
      title: "One Day Trips from Split | Private Tours",
      description:
        "Discover the best private one day trips from Split including Krka, Plitvice Lakes, Dubrovnik and Zadar.",
      alternates: {
        canonical: `${CONFIG.url}/one-day-trips`,
      },
    };
  }

  const pageUrl = `${CONFIG.url}/one-day-trips/${destination}`;
  const title = `${data.title} Day Trip from Split | Private Tour`;
  const description = `${data.shortDescription} Private transfer from Split. Duration ${data.duration}. Distance ${data.distance}.`;

  return {
    title,
    description,
    keywords: [
      `${data.title} day trip`,
      `${data.title} tour from Split`,
      `${data.title} private tour`,
      `${data.title} taxi tour`,
      `${data.title} private transfer`,
      `${data.title} Croatia tour`,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: CONFIG.company.companyShortName,
      images: [
        {
          url: `${CONFIG.url}${data.image}`,
          width: 1200,
          height: 630,
          alt: `${data.title} day trip`,
        },
      ],
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${CONFIG.url}${data.image}`],
    },
  };
}

type PageProps = { params: Promise<{ destination: string }> };

const toDigits = (s: string) => (s || "").replace(/\D/g, "");

const waLink = (phoneOrWhatsapp: string, text: string) =>
  `https://wa.me/${toDigits(phoneOrWhatsapp)}?text=${encodeURIComponent(text)}`;

const vehicleNames: Record<string, string> = {
  car: "Car",
  monovolumen: "Minivan",
  van: "Van",
  vClass: "V-Class",
  minibus: "Minibus",
};

const vehicleMeta: Record<
  string,
  { capacity: string; suitcases: string; image: string; description: string }
> = {
  car: {
    capacity: "1–4",
    suitcases: "up to 3",
    image: "/fleet-jpg/sedan.jpg",
    description: "Comfortable sedan for up to 4 passengers",
  },
  monovolumen: {
    capacity: "1–6",
    suitcases: "0–6",
    image: "/fleet-jpg/monovolumen-new.jpg",
    description: "Spacious minivan for families or small groups",
  },
  van: {
    capacity: "1–8",
    suitcases: "up to 6",
    image: "/fleet-jpg/van.jpg",
    description: "Perfect for larger groups with luggage",
  },
  vClass: {
    capacity: "1–7",
    suitcases: "up to 6",
    image: "/fleet-jpg/v-class.jpg",
    description: "Premium Mercedes V-Class for luxury travel",
  },
  minibus: {
    capacity: "1–16",
    suitcases: "up to 12",
    image: "/fleet-jpg/mini-bus.jpg",
    description: "Ideal for larger groups and tours",
  },
};

function VehicleOfferCard({
  title,
  image,
  capacity,
  suitcases,
  price,
  callButton,
  whatsappButton,
  emailButton,
}: {
  title: string;
  image: string;
  capacity?: string;
  suitcases?: string;
  price?: number;
  callButton?: React.ReactNode;
  whatsappButton: React.ReactNode;
  emailButton: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition">
      <div className="relative aspect-video w-full bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 420px"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-gray-900 backdrop-blur">
          Private tour
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-extrabold text-gray-900">{title}</p>
          </div>

          {typeof price === "number" ? (
            <div className="text-right">
              <p className="text-lg font-extrabold text-blue-600">{price}€</p>
            </div>
          ) : null}
        </div>

        {(capacity || suitcases) && (
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-xl bg-blue-50 px-3 py-2 font-semibold text-blue-800">
              👥 {capacity || "—"}
            </div>
            <div className="rounded-xl bg-blue-50 px-3 py-2 font-semibold text-blue-800 text-right">
              🧳 {suitcases || "—"}
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-2">
          {callButton}
          {whatsappButton}
          {emailButton}
        </div>
      </div>
    </div>
  );
}

export default async function DestinationPage({ params }: PageProps) {
  const { destination } = await params;

  const destinationData = oneDayTripsDestinations[destination];
  const contactData = oneDayTripsContact[destination];

  if (!destinationData || !contactData) notFound();

  const generateWhatsAppMessage = (vehicleType: string, contact: any) =>
    `Hi! I'm interested in booking a one-day trip to ${destinationData.title} with a ${
      vehicleNames[vehicleType] || vehicleType
    }. Price: ${contact.price}€. Please contact me for more details.`;

  const generateEmailBody = (vehicleType: string, contact: any) =>
    `Hi,\n\nI'm interested in booking a one-day trip to ${destinationData.title} with a ${
      vehicleNames[vehicleType] || vehicleType
    }.\nPrice: ${contact.price}€\n\nPlease contact me for more details.\n\nBest regards`;



  return (
    <>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-600">
          <Link
            href="/"
            className="font-semibold text-blue-600 hover:underline"
          >
            Taxi Croatia
          </Link>
          <span className="mx-2">›</span>
          <Link
            href="/one-day-trips"
            className="font-semibold text-blue-600 hover:underline"
          >
            One Day Trips
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">{destinationData.title}</span>
        </nav>

        <section className="mt-6 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="block sm:hidden px-5 py-7">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {destinationData.title}
            </h1>

            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                📍 {destinationData.distance} from Split
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-800">
                ⏱️ {destinationData.duration}
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-green-800">
                Private tour
              </span>
            </div>
          </div>

          <div className="relative hidden sm:block aspect-24/7 w-full bg-gray-100">
            <Image
              src={destinationData.image}
              alt={destinationData.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-black/10" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 py-10 md:px-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  {destinationData.title}
                </h1>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/90 font-semibold">
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    📍 {destinationData.distance} from Split
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    ⏱️ {destinationData.duration}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    Private tour
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-extrabold text-gray-900">
                About this trip
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                {destinationData.fullDescription}
              </p>

              <h3 className="mt-8 text-xl font-extrabold text-gray-900">
                Highlights
              </h3>
              <ul className="mt-3 space-y-2 text-gray-700">
                {destinationData.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-xl font-extrabold text-gray-900">
                What&apos;s included
              </h3>
              <ul className="mt-3 space-y-2 text-gray-700">
                {destinationData.includes.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-green-600" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              {destinationData.gallery?.length ? (
                <>
                  <h3 className="mt-8 text-xl font-extrabold text-gray-900">
                    Gallery
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {destinationData.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100"
                      >
                        <Image
                          src={img}
                          alt={`${destinationData.title} ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </section>

          <aside className="lg:col-span-1">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <div className="text-center">
                <p className="text-xl font-extrabold text-gray-900">
                  Book your vehicle
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Choose the best option for your group
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                {Object.entries(contactData as any).map(
                  ([vehicleType, driver]: [string, any]) => {
                    const meta = vehicleMeta[vehicleType] || {
                      capacity: "",
                      suitcases: "",
                      image: "/fleet-jpg/trio.jpg",
                      description: "",
                    };

                    const title = vehicleNames[vehicleType] || vehicleType;
                    const waText = generateWhatsAppMessage(vehicleType, driver);
                    const emailBody = generateEmailBody(vehicleType, driver);

                    const whatsappHref = waLink(driver.whatsApp, waText);

                    const emailHref = `mailto:${driver.email}?subject=${encodeURIComponent(
                      `Booking inquiry for ${destinationData.title}`,
                    )}&body=${encodeURIComponent(emailBody)}`;

                    return (
                      <VehicleOfferCard
                        key={vehicleType}
                        title={title}
                        image={meta.image}
                        capacity={meta.capacity}
                        suitcases={meta.suitcases}
                        price={driver.price}
                        whatsappButton={
                          <WhatsAppButton
                            href={whatsappHref}
                            vehicle={vehicleType}
                            company={driver.company}
                            driver={driver.driver}
                            value={driver.price}
                            category="one_day_trip"
                            className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-3 text-sm font-extrabold text-white hover:bg-green-700 transition"
                          >
                            WhatsApp
                          </WhatsAppButton>
                        }
                        emailButton={
                          <EmailButton
                            href={emailHref}
                            vehicle={vehicleType}
                            company={driver.company}
                            driver={driver.driver}
                            value={driver.price}
                            category="one_day_trip"
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white hover:bg-blue-700 transition"
                          >
                            Email
                          </EmailButton>
                        }
                      />
                    );
                  },
                )}
              </div>

              <p className="mt-6 text-center text-xs text-gray-500">
                Pickup & drop-off included • Flexible schedule • Private tour
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
