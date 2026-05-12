import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  areaContact,
  areaServed,
  vehicleInfo,
} from "@/data/areaContact/areaContact";
import { formatAreaName } from "@/lib/formUrlToText";
import { CONFIG } from "@/data/config/company";
import WhatsAppLocationButton from "@/components/whatsapp/WhatsAppLocationButton";
import type { Metadata } from "next";
import WhatsAppMessageButton from "@/components/whatsapp/WhatsAppMessageButton";
import CallButton from "@/components/whatsapp/CallButton";

type MaybePromise<T> = T | Promise<T>;
type PageProps = { params: MaybePromise<{ area: string }> };

const toDigits = (phone: string) => phone.replace(/\D/g, "");

const formatPhoneNumber = (phone: string) => {
  const d = toDigits(phone);
  const parts = [
    d.slice(0, 3),
    d.slice(3, 5),
    d.slice(5, 8),
    d.slice(8, 10),
    d.slice(10, 12),
  ];
  return parts.filter(Boolean).join(" ");
};

const normalize = (s: string) =>
  decodeURIComponent(s || "")
    .trim()
    .toLowerCase()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

const waLink = (phone: string, text?: string) => {
  const base = `https://wa.me/${toDigits(phone)}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
};

function resolveAreaKey(areaParam: string) {
  const slug = normalize(areaParam);

  const keys = Object.keys(areaServed) as Array<keyof typeof areaServed>;

  const direct = keys.find((k) => normalize(String(k)) === slug);
  if (direct) return direct;

  const byPath = keys.find((k) => normalize(areaServed[k].path) === slug);
  if (byPath) return byPath;

  return undefined;
}

export function generateStaticParams() {
  return (Object.keys(areaServed) as Array<keyof typeof areaServed>)
    .filter((k) => k in areaContact)
    .map((k) => ({ area: areaServed[k].path }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const key = resolveAreaKey(resolved.area);

  if (!key) {
    return {
      title: "Taxi Services in Dalmatia",
      description:
        "Reliable taxi services across Dalmatia including airports, ports, hotels, and cities.",
      alternates: {
        canonical: `${CONFIG.url}/taxi`,
      },
    };
  }

  const data = areaServed[key];
  const pageUrl = `${CONFIG.url}/taxi/${data.path}`;
  const title = `Taxi ${data.cityName} | 24/7 Transfers & Airport Rides`;
  const description = `Looking for reliable taxi service in ${data.cityName}? Fast, safe, and affordable transportation for airport transfers, hotels, ports, and city rides. Available 24/7.`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "TORONTO Taxi",
      images: [
        {
          url: `${CONFIG.url}${data.image}`,
          width: 1200,
          height: 630,
          alt: `Taxi service in ${data.cityName}`,
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

export default async function TaxiAreaPage({ params }: PageProps) {
  const resolved = await Promise.resolve(params);
  const key = resolveAreaKey(resolved.area);

  if (!key) redirect("/taxi");

  const aboutArea = areaServed[key];
  const thisAreaNumbers = areaContact[key];

  if (!aboutArea || !thisAreaNumbers) redirect("/taxi");

  const vehicles = [
    {
      key: "car",
      ...vehicleInfo.car,
      phone: thisAreaNumbers.car.phone,
      whatsApp: thisAreaNumbers.car.whatsApp,
      company: thisAreaNumbers.car.company,
      driver: thisAreaNumbers.car.driver,
      value: vehicleInfo.car.defaultPrice,
    },
    {
      key: "monovolumen",
      ...vehicleInfo.monovolumen,
      phone: thisAreaNumbers.monovolumen.phone,
      whatsApp: thisAreaNumbers.monovolumen.whatsApp,
      company: thisAreaNumbers.monovolumen.company,
      driver: thisAreaNumbers.monovolumen.driver,
      value: vehicleInfo.monovolumen.defaultPrice,
    },
    {
      key: "van",
      ...vehicleInfo.van,
      phone: thisAreaNumbers.van.phone,
      whatsApp: thisAreaNumbers.van.whatsApp,
      company: thisAreaNumbers.van.company,
      driver: thisAreaNumbers.van.driver,
      value: vehicleInfo.van.defaultPrice,
    },
    {
      key: "vClass",
      ...vehicleInfo.vClass,
      phone: thisAreaNumbers.vClass.phone,
      whatsApp: thisAreaNumbers.vClass.whatsApp,
      company: thisAreaNumbers.vClass.company,
      driver: thisAreaNumbers.vClass.driver,
      value: vehicleInfo.vClass.defaultPrice,
    },
  ];

  const primaryVehicle = vehicles[0];
  const primaryPhone = primaryVehicle?.phone || CONFIG.company.phone;



  return (
    <>

      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-600">
          <Link
            href="/"
            className="font-semibold text-blue-600 hover:underline"
          >
            Homepage
          </Link>
          <span className="mx-2">›</span>
          <Link
            href="/taxi"
            className="font-semibold text-blue-600 hover:underline"
          >
            Taxi services
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Taxi {aboutArea.cityName}</span>
        </nav>

        <section className="mt-2 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="block sm:hidden px-4 py-2">
            <h1 className=" text-center text-2xl font-extrabold tracking-tight text-gray-900">
              Taxi in {formatAreaName(aboutArea.path)}
            </h1>
            <p className=" text-md mt-2 text-gray-600">
              {aboutArea.description}
            </p>

            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                Available 24/7
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-800">
                Fast pickup
              </span>
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="relative aspect-24/9 w-full bg-gray-100">
              <Image
                src={aboutArea.image}
                alt={`Taxi service in ${aboutArea.cityName}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-black/10" />
              <div className="absolute inset-0 flex items-center">
                <div className="px-8 py-8 md:px-10">
                  <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Taxi in {formatAreaName(aboutArea.path)}
                  </h1>
                  <p className="mt-3 max-w-2xl text-white/90">
                    {aboutArea.description}
                  </p>

                  <div className="mt-6 flex flex-row gap-3">
                    <CallButton
                      phone={primaryPhone}
                      vehicle={primaryVehicle.key}
                      company={primaryVehicle.company}
                      driver={primaryVehicle.driver}
                      value={primaryVehicle.value}
                      className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-extrabold text-blue-700 hover:bg-gray-100 transition"
                    >
                      Call +{formatPhoneNumber(primaryPhone)}
                    </CallButton>

                    <WhatsAppMessageButton
                      phone={primaryVehicle.whatsApp}
                      vehicleName={primaryVehicle.title}
                      vehicle={primaryVehicle.key}
                      company={primaryVehicle.company}
                      driver={primaryVehicle.driver}
                      value={primaryVehicle.value}
                    >
                      WhatsApp
                    </WhatsAppMessageButton>
                  </div>

                  <p className="mt-3 text-xs text-white/80">
                    24/7 • Airport & city transfers • Fast pickup
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Available vehicles
              </h2>
              <p className="mt-1 text-gray-600">
                Pick a vehicle and contact the driver instantly.
              </p>
            </div>
            <span className="hidden sm:inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
              Available now
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {vehicles.map((vehicle) => (
              <article
                key={vehicle.key}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="relative aspect-video w-full bg-gray-100">
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.title} - Taxi service`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.02] transition duration-300"
                    priority={vehicle.key === "car" || vehicle.key === "van"}
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-gray-900">
                    {vehicle.title}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-gray-900">
                    {vehicle.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {vehicle.description}
                  </p>

                  <div className="mt-5 space-y-2">
                    <CallButton
                      phone={vehicle.phone}
                      vehicle={vehicle.key}
                      company={vehicle.company}
                      driver={vehicle.driver}
                      value={vehicle.value}
                      className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 transition"
                    >
                      Call +{formatPhoneNumber(vehicle.phone)}
                    </CallButton>

                    <WhatsAppMessageButton
                      phone={vehicle.whatsApp}
                      vehicleName={vehicle.title}
                      vehicle={vehicle.key}
                      company={vehicle.company}
                      driver={vehicle.driver}
                      value={vehicle.value}
                    >
                      Send WhatsApp message
                    </WhatsAppMessageButton>

                    <WhatsAppLocationButton
                      phone={vehicle.whatsApp}
                      vehicleName={vehicle.title}
                      vehicle={vehicle.key}
                      company={vehicle.company}
                      driver={vehicle.driver}
                      value={vehicle.value}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}