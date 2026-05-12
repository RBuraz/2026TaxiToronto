import type { Metadata } from "next";
import Link from "next/link";
import TransferForm from "@/components/transfersForm/transferClient";
import { CONFIG } from "@/data/config/company";
import { Distance, distances } from "@/data/distances";
import { firstPlaces } from "@/data/firstPlaces";
import { initialPrediction } from "@/data/initialPrediction";
import { secondPlaces } from "@/data/secendPlaces";
import { calculatePrice } from "@/lib/calculatePrice";
import {
  getOptimalDescription,
  getOptimalTitle,
} from "@/lib/titleAndDescriptionGenerator";
import { urlSlugify } from "@/lib/url";
import { redirect } from "next/navigation";
import { vehicleOptions } from "@/data/fleet";

export function generateStaticParams() {
  const fromLocations = [...firstPlaces, ...secondPlaces];

  return fromLocations.flatMap((from) =>
    initialPrediction
      .filter((to) => {
        const distance = (
          distances as Record<string, Record<string, Distance>>
        )[from.place_id]?.[to.place_id];

        return distance !== undefined;
      })
      .map((to) => ({
        from: urlSlugify(from.main_text.toLowerCase()),
        to: urlSlugify(to.main_text.toLowerCase()),
      })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ from: string; to: string }>;
}): Promise<Metadata> {
  const { from, to } = await params;

  const fromLocation = initialPrediction.find(
    (prediction) =>
      urlSlugify(prediction.main_text.toLowerCase()) === from.toLowerCase(),
  );

  const toLocation = initialPrediction.find(
    (prediction) =>
      urlSlugify(prediction.main_text.toLowerCase()) === to.toLowerCase(),
  );

  if (!fromLocation || !toLocation) {
    redirect("/transfers/calculator");
  }

  const distanceFromTo: Distance | undefined = (
    distances as Record<string, Record<string, Distance>>
  )[fromLocation.place_id]?.[toLocation.place_id];

  if (!distanceFromTo) {
    redirect("/transfers/calculator");
  }

  const calculatedPrice = calculatePrice(distanceFromTo, "standard car");

  const allTitle = [
    `From ${fromLocation.main_text} to ${toLocation.main_text} Taxi & Transfer`,
    `${fromLocation.main_text} to ${toLocation.main_text} taxi`,
    `Taxi ${fromLocation.main_text} to ${toLocation.main_text}`,
    `Private taxi & transfer from ${fromLocation.main_text} to ${toLocation.main_text}`,
    `Taxi from ${fromLocation.main_text} to ${toLocation.main_text}`,
    `${fromLocation.main_text} to ${toLocation.main_text} Private taxi car from €${calculatedPrice}`,
    `${fromLocation.main_text} to ${toLocation.main_text} Private car transfer from €${calculatedPrice}`,
    `Taxi Transfer from ${fromLocation.main_text} to ${toLocation.main_text}`,
    `From ${fromLocation.main_text} to ${toLocation.main_text} - Book Your Transfer Now!`,
    `From ${fromLocation.main_text} to ${toLocation.main_text}`,
    `Private transfer from ${fromLocation.main_text} to ${toLocation.main_text}`,
    `Book a taxi from ${fromLocation.main_text} to ${toLocation.main_text}`,
    `${fromLocation.main_text} to ${toLocation.main_text} taxi - fixed prices`,
    `Taxi - ${fromLocation.main_text} to ${toLocation.main_text} fixed prices`,
    `${fromLocation.main_text} to ${toLocation.main_text} transfer - book quickly and easily`,
    `Top 4 transport options: ${fromLocation.main_text} to ${toLocation.main_text}`,
    `4 Best Private Transfers from ${fromLocation.main_text} to ${toLocation.main_text}`,
    `How to get from ${fromLocation.main_text} to ${toLocation.main_text} - Best Transfer Options`,
    `How to get from ${fromLocation.main_text} to ${toLocation.main_text}? Taxi & Transfer Options`,
    `Top 4 Transfers from ${fromLocation.main_text} to ${toLocation.main_text}`,
    `4 Best Taxi & Transfer Options from ${fromLocation.main_text} to ${toLocation.main_text}`,
    `Best Taxi Options from ${fromLocation.main_text} to ${toLocation.main_text}`,
  ];

  const allDescription = [
    `${toLocation.main_text} taxi from ${fromLocation.main_text}. Fixed price ${calculatedPrice}€, professional drivers. Book your transfer now!`,
    `Need a taxi from ${fromLocation.main_text} to ${toLocation.main_text}? Fixed price ${calculatedPrice}€, no hidden fees. Book today!`,
    `Safe and reliable transfer from ${fromLocation.main_text} to ${toLocation.main_text}. English-speaking drivers, meet & greet included. Reserve now!`,
    `Travel stress-free from ${fromLocation.main_text} to ${toLocation.main_text}. Comfortable vehicles, professional drivers. Book online!`,
    `Quick transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Distance: ${distanceFromTo.distance}, time: ${distanceFromTo.duration}. Reserve online!`,
    `Book your transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Distance: ${distanceFromTo.distance} (${distanceFromTo.duration}). Fixed price from ${calculatedPrice}€, no surge pricing. Reserve now!`,
    `Professional taxi service from ${fromLocation.main_text} to ${toLocation.main_text}. English-speaking drivers, meet & greet, flight monitoring. Book your ride today!`,
    `Fixed price transfer from ${fromLocation.main_text} to ${toLocation.main_text}: only ${calculatedPrice}€. Free waiting time, luggage assistance, 24/7 availability. Book online!`,
    `Family-friendly transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Child seats available, spacious vehicles, friendly drivers. Reserve your ride!`,
    `Group transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Vans and minibuses for up to 8 passengers. Perfect for families and tours. Book now!`,
    `Professional transfer service from ${fromLocation.main_text} to ${toLocation.main_text}. English-speaking drivers, meet & greet, flight monitoring, free waiting time. Book your ride today!`,
    `Travel from ${fromLocation.main_text} to ${toLocation.main_text} stress-free. Comfortable vehicles, professional drivers, instant confirmation, free cancellation. Book your transfer now!`,
    `Business-class transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Punctual drivers, luxury vehicles, door-to-door service. Book your executive ride!`,
    `Premium transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Mercedes V-Class, leather seats, professional chauffeurs, water included. Experience luxury travel!`,
    `24/7 transfer service from ${fromLocation.main_text} to ${toLocation.main_text}. Customer support available, instant WhatsApp confirmation, flexible payment options. Book your ride!`,
    `Complete transfer solution from ${fromLocation.main_text} to ${toLocation.main_text}. Fixed price ${calculatedPrice}€, professional drivers, modern fleet, 24/7 customer support. Distance: ${distanceFromTo.distance} (${distanceFromTo.duration}). Reserve now!`,
    `Guaranteed best price for transfers from ${fromLocation.main_text} to ${toLocation.main_text}. Professional drivers, modern fleet, 24/7 support, free waiting time, flight tracking, meet & greet service. Book online today!`,
    `Premium transfer experience from ${fromLocation.main_text} to ${toLocation.main_text}. Luxury vehicles, professional chauffeurs, leather seats, complimentary water. Book your executive transfer!`,
    `Ready to travel from ${fromLocation.main_text} to ${toLocation.main_text}? Book your taxi online and enjoy a stress-free journey with professional drivers. Fixed price ${calculatedPrice}€, no hidden fees, instant confirmation. Book now!`,
    `Affordable luxury transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Premium vehicles at competitive prices (from ${calculatedPrice}€), professional service, 24/7 availability. Reserve your ride online!`,
    `Private taxi from ${fromLocation.main_text} to ${toLocation.main_text}. Choose from sedans, monovolumen, vans, Mercedes V-Class or minibuses. Fixed price ${calculatedPrice}€. Book online!`,
    `Family transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Spacious monovolumen with child seats available. Fixed price ${calculatedPrice}€, door-to-door service. Reserve your family ride!`,
    `Luxury transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Mercedes V-Class, leather seats, professional chauffeur, water included. Fixed price ${calculatedPrice}€. Experience premium travel!`,
    `Group transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Minibuses for larger groups. Competitive group rates, professional drivers. Book your group transfer now!`,
    `Airport transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Flight tracking, meet & greet, free waiting time. Fixed price ${calculatedPrice}€. Book your airport taxi!`,
    `Business transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Executive sedans, professional drivers, punctual service. Fixed price ${calculatedPrice}€. Book your business ride!`,
    `Night transfer from ${fromLocation.main_text} to ${toLocation.main_text}. 24/7 availability, safe drivers, fixed price ${calculatedPrice}€. Book your late night transfer online!`,
    `Transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Distance ${distanceFromTo.distance} in ${distanceFromTo.duration}. Fixed price ${calculatedPrice}€, professional drivers. Book online today!`,
    `Quick transfer from ${fromLocation.main_text} to ${toLocation.main_text}. Only ${distanceFromTo.duration} travel time, distance ${distanceFromTo.distance}. Fixed price ${calculatedPrice}€. Reserve now!`,
  ];

  const perfectTitle = getOptimalTitle(
    allTitle,
    fromLocation.main_text,
    toLocation.main_text,
  );

  const perfectDescription = getOptimalDescription(
    allDescription,
    fromLocation.main_text,
    toLocation.main_text,
  );

  const pageUrl = `${CONFIG.url}/transfers/${from}/${to}`;

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

export default async function TransfersFromTo({
  params,
}: {
  params: Promise<{ from: string; to: string }>;
}) {
  const { from, to } = await params;

  const fromLocation = initialPrediction.find(
    (prediction) =>
      urlSlugify(prediction.main_text.toLowerCase()) === from.toLowerCase(),
  );

  const toLocation = initialPrediction.find(
    (prediction) =>
      urlSlugify(prediction.main_text.toLowerCase()) === to.toLowerCase(),
  );

  if (!fromLocation || !toLocation) {
    redirect("/transfers/calculator");
  }

  const distanceFromTo: Distance | undefined = (
    distances as Record<string, Record<string, Distance>>
  )[fromLocation.place_id]?.[toLocation.place_id];

  if (!distanceFromTo) {
    redirect("/transfers/calculator");
  }

  const dataFromTo = {
    pickupAddress: fromLocation.description,
    pickupPlaceId: fromLocation.place_id,
    dropoffAddress: toLocation.description,
    dropoffPlaceId: toLocation.place_id,
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



  const vehicleOptionsWithPrice = vehicleOptions.map((vehicle) => ({
    ...vehicle,
    price: calculatePrice(distanceFromTo, vehicle.id),
  }));

  const vehiclesWithValidPrice = vehicleOptionsWithPrice.filter(
    (vehicle) => vehicle.price > 0 && vehicle.id !== "best option for my group",
  );

  const offers = vehiclesWithValidPrice.map((vehicle) => ({
    "@type": "Offer",
    name: `${vehicle.name} Transfer`,
    description: `${vehicle.description} from ${fromLocation.main_text} to ${toLocation.main_text}`,
    price: vehicle.price.toFixed(2),
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: `${CONFIG.url}/transfers/${from}/${to}`,
    itemOffered: {
      "@type": "Service",
      name: `${vehicle.name} transfer from ${fromLocation.main_text} to ${toLocation.main_text}`,
      description: vehicle.description,
    },
  }));

  const busVehicle = vehicleOptionsWithPrice.find(
    (vehicle) => vehicle.id === "bus",
  );

  if (busVehicle && busVehicle.price === 0) {
    offers.push({
      "@type": "Offer",
      name: "Bus Transfer (on request)",
      description: `${busVehicle.description} from ${fromLocation.main_text} to ${toLocation.main_text}`,
      price: "0.00",
      priceCurrency: "EUR",
      availability: "https://schema.org/PreOrder",
      url: `${CONFIG.url}/transfers/${from}/${to}`,
      itemOffered: {
        "@type": "Service",
        name: `Bus transfer from ${fromLocation.main_text} to ${toLocation.main_text}`,
        description: busVehicle.description,
      },
    });
  }



  const allPlaces = [...firstPlaces, ...secondPlaces];

  const relatedRouteLinks = allPlaces
    .filter((place) => {
      const placeSlug = urlSlugify(place.main_text.toLowerCase());

      if (placeSlug === to.toLowerCase()) return false;
      if (placeSlug === from.toLowerCase()) return false;

      const distance = (distances as Record<string, Record<string, Distance>>)[
        fromLocation.place_id
      ]?.[place.place_id];

      return distance !== undefined;
    })
    .map((place) => ({
      href: `/transfers/${from}/${urlSlugify(place.main_text.toLowerCase())}`,
      title: `${fromLocation.main_text} → ${place.main_text}`,
      description: `Explore another private transfer route from ${fromLocation.main_text} to ${place.main_text}.`,
    }));

  return (
    <>

      <main>
        <TransferForm
          initialPrediction={initialPrediction}
          precalculatedDistance={distanceFromTo}
          defaultFormData={dataFromTo}
        />

        <section className="mx-auto mt-10 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-gray-900">
              More routes from {fromLocation.main_text}
            </h2>
            <p className="mt-2 max-w-2xl text-gray-600">
              Explore other popular transfer routes starting from{" "}
              {fromLocation.main_text}.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedRouteLinks.map((link) => (
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
