import type { Metadata } from "next";
import Link from "next/link";
import TransferForm from "@/components/transfersForm/transferClient";
import { CONFIG } from "@/data/config/company";
import { firstPlaces } from "@/data/firstPlaces";
import { initialPrediction } from "@/data/initialPrediction";
import { secondPlaces } from "@/data/secendPlaces";
import {
  getOptimalDescription,
  getOptimalTitle,
} from "@/lib/titleAndDescriptionGenerator";
import { urlSlugify } from "@/lib/url";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  const fromLocations = [...firstPlaces, ...secondPlaces];

  return fromLocations.map((prediction) => ({
    from: urlSlugify(prediction.main_text.toLowerCase()),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ from: string }>;
}): Promise<Metadata> {
  const { from } = await params;

  const fromLocation = initialPrediction.find(
    (prediction) =>
      urlSlugify(prediction.main_text.toLowerCase()) === from.toLowerCase(),
  );

  if (!fromLocation) {
    redirect("/transfers/calculator");
  }

  const allTitle = [
    `Private Taxi Transfer from ${fromLocation.main_text}`,
    `Private Transfers from ${fromLocation.main_text}`,
    `Taxi & Transfer from ${fromLocation.main_text}`,
    `${fromLocation.main_text} Transfer Services`,
    `Book a Transfer from ${fromLocation.main_text}`,
    `Private Taxi from ${fromLocation.main_text}`,
    `Transfers from ${fromLocation.main_text}`,
    `Taxi from ${fromLocation.main_text}`,
    `${fromLocation.main_text} transfers`,
    `Transfer service ${fromLocation.main_text}`,
    `Book your transfer from ${fromLocation.main_text}`,
    `Best transfers from ${fromLocation.main_text}`,
    `Reliable taxi from ${fromLocation.main_text}`,
    `Affordable taxi from ${fromLocation.main_text}`,
    `Door to door from ${fromLocation.main_text}`,
    `24/7 transfers from ${fromLocation.main_text}`,
    `Private transfer service from ${fromLocation.main_text}`,
    `Book your taxi online from ${fromLocation.main_text}`,
    `Reliable transfer company from ${fromLocation.main_text}`,
    `Professional taxi service from ${fromLocation.main_text}`,
    `Safe & reliable rides from ${fromLocation.main_text}`,
    `Professional taxi & transfer from ${fromLocation.main_text}`,
    `Reliable door to door service from ${fromLocation.main_text}`,
    `24 hour transfer service from ${fromLocation.main_text}`,
    `Trusted local taxi from ${fromLocation.main_text}`,
  ];

  const allDescription = [
    `Book your transfer from ${fromLocation.main_text} to any destination. Choose from comfortable sedans, spacious family vehicles, premium options or larger vehicles for groups. Fixed prices, professional drivers. Book online!`,
    `Private transfers from ${fromLocation.main_text} with reliable service. From solo rides to larger groups, we offer a range of vehicles to match your needs. Door-to-door, fixed rates. Reserve now!`,
    `Travel from ${fromLocation.main_text} with comfort and safety. Whether you are traveling alone, with family or in a group, we have the right vehicle for every journey. Book your ride today!`,
    `Reliable transfer service from ${fromLocation.main_text}. Flexible vehicle options for individuals, families and groups. Professional drivers, fixed pricing and 24/7 availability.`,
    `Transfer from ${fromLocation.main_text} made simple. Choose the vehicle that fits your trip, from standard cars to spacious group transport. Book online with instant confirmation.`,
    `Taxi and transfer service from ${fromLocation.main_text}. Clean vehicles, experienced drivers and options for all group sizes. Safe, reliable and affordable rides. Book now!`,
    `Professional transfers from ${fromLocation.main_text}. From everyday rides to premium travel and group transport, we cover all needs. Fixed prices, no hidden fees.`,
    `Book your taxi or transfer from ${fromLocation.main_text}. Quick, simple booking and a wide range of vehicles for any type of journey. Reliable service guaranteed.`,
    `Comfortable rides from ${fromLocation.main_text}. Travel solo, with family or in a group with the right vehicle and professional driver. Reserve today!`,
    `Door-to-door transfers from ${fromLocation.main_text}. Easy booking, reliable drivers and vehicles suitable for any group size. Travel without stress.`,
    `Affordable transfer service from ${fromLocation.main_text}. Flexible options for short trips, long distances and group travel. No hidden fees. Book your ride now!`,
    `24/7 taxi and transfer from ${fromLocation.main_text}. Always available with vehicles for individuals, families and larger groups. Instant confirmation.`,
    `Best value transfers from ${fromLocation.main_text}. Choose the right vehicle for your journey and enjoy fixed pricing with professional drivers.`,
    `Safe and reliable transfers from ${fromLocation.main_text}. Comfortable vehicles and experienced drivers for every type of traveler. Book online in minutes.`,
    `Book your private transfer from ${fromLocation.main_text}. From simple rides to larger group transport, we provide flexible solutions for every journey. Travel comfortably at fixed prices.`,
  ];

  const perfectTitle = getOptimalTitle(allTitle, fromLocation.main_text);
  const perfectDescription = getOptimalDescription(
    allDescription,
    fromLocation.main_text,
  );

  const pageUrl = `${CONFIG.url}/transfers/${from}`;

  return {
    title: perfectTitle,
    description: perfectDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: perfectTitle,
      description: perfectDescription,
      url: pageUrl,
      siteName: "TORONTO Taxi",
      images: [
        {
          url: `${CONFIG.url}/fleet-jpg/v-class.jpg`,
          width: 1200,
          height: 630,
          alt: perfectTitle,
        },
      ],
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: perfectTitle,
      description: perfectDescription,
      images: [`${CONFIG.url}/fleet-jpg/v-class.jpg`],
    },
  };
}

export default async function TransfersFrom({
  params,
}: {
  params: Promise<{ from: string }>;
}) {
  const { from } = await params;

  const fromLocation = initialPrediction.find(
    (prediction) =>
      urlSlugify(prediction.main_text.toLowerCase()) === from.toLowerCase(),
  );

  if (!fromLocation) {
    redirect("/transfers/calculator");
  }

  const dataFromTo = {
    pickupAddress: fromLocation.description,
    pickupPlaceId: fromLocation.place_id,
    dropoffAddress: "",
    dropoffPlaceId: "",
    passengers: 4,
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
    vehicleType: "",
    returnTrip: false,
    returnDate: "",
    returnTime: "",
    flightNumber: "",
    arrivalTime: "",
    arrivalHour: "",
    arrivalMinute: "",
    greetingService: false,
    greetingName: "",
  };



  const allPlaces = [...firstPlaces, ...secondPlaces];

  const relatedToLinks = allPlaces
    .filter(
      (place) =>
        urlSlugify(place.main_text.toLowerCase()) !== from.toLowerCase(),
    )
    .map((place) => ({
      href: `/transfers/${from}/${urlSlugify(place.main_text.toLowerCase())}`,
      title: `${fromLocation.main_text} → ${place.main_text}`,
      description: `Book a private transfer from ${fromLocation.main_text} to ${place.main_text}.`,
    }));

  return (
    <>
      <main>
        <TransferForm
          initialPrediction={initialPrediction}
          defaultFormData={dataFromTo}
        />

        <section className="mx-auto mt-10 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Popular destinations from {fromLocation.main_text}
            </h2>
            <p className="mt-2 max-w-2xl text-gray-600">
              Continue directly to available transfer routes from{" "}
              {fromLocation.main_text}.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedToLinks.map((link) => (
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
                    View route →
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