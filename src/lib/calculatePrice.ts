import { DistanceResult } from "@/actions/distance";

const pricePerVehicle = {
  "standard car": {
    start: 6,
    minPrice: 20,
    pricePerKm: 1.5,
    pricePerMinute: 0.08,
  },
  monovolumen: {
    start: 8,
    minPrice: 25,
    pricePerKm: 1.6,
    pricePerMinute: 0.09,
  },
  "S-class": {
    start: 12,
    minPrice: 40,
    pricePerKm: 2,
    pricePerMinute: 0.12,
  },
  van: {
    start: 10,
    minPrice: 30,
    pricePerKm: 1.7,
    pricePerMinute: 0.1,
  },
  "V-class": {
    start: 12,
    minPrice: 40,
    pricePerKm: 2,
    pricePerMinute: 0.12,
  },
  minibus: {
    start: 20,
    minPrice: 100,
    pricePerKm: 3.4,
    pricePerMinute: 0.15,
  },
  "best option for my group": {
    start: 0,
    minPrice: 0,
    pricePerKm: 0,
    pricePerMinute: 0,
  },
  bus: {
    start: 0,
    minPrice: 0,
    pricePerKm: 0,
    pricePerMinute: 0,
  },
};

export const calculatePrice = (
  distanceResult: DistanceResult | null,
  vehicle: string,
): number => {
  if (!distanceResult) return 0;

  const max_discount_percentage = 0.33;
  const discount_per_10km = 0.011;

  // Dohvati podatke za odabrano vozilo
  const vehicleData = pricePerVehicle[vehicle as keyof typeof pricePerVehicle];
  
  // Ako vozilo ne postoji, vrati 0
  if (!vehicleData) return 0;

  const distanceKm = distanceResult.distanceMeters / 1000;
  const durationMinutes = distanceResult.durationMinutes;

  // Surcharge for short distances (< 150 km)
  let adjustedPricePerKm = vehicleData.pricePerKm;

  if (distanceKm < 4) {
    adjustedPricePerKm = vehicleData.pricePerKm * 1.3;
  } else if (distanceKm < 8) {
    adjustedPricePerKm = vehicleData.pricePerKm * 1.25;
  } else if (distanceKm < 12) {
    adjustedPricePerKm = vehicleData.pricePerKm * 1.2;
  } else if (distanceKm < 16) {
    adjustedPricePerKm = vehicleData.pricePerKm * 1.15;
  } else if (distanceKm < 20) {
    adjustedPricePerKm = vehicleData.pricePerKm * 1.1;
  } else if (distanceKm < 100) {
    const basePercentage = 10;
    const percentageSurcharge = basePercentage * (1 - distanceKm / 100);
    adjustedPricePerKm =
      vehicleData.pricePerKm * (1 + percentageSurcharge / 100);
  }

  // Calculate base price (distance + time)
  let price =
    distanceKm * adjustedPricePerKm +
    durationMinutes * vehicleData.pricePerMinute;

  // Dodaj startnu cijenu
  price += vehicleData.start;

  // Apply discount for longer distances
  const discountGroups = Math.floor(distanceKm / 10);
  const discountPercentage = Math.min(
    discountGroups * discount_per_10km,
    max_discount_percentage,
  );

  if (discountPercentage > 0) {
    price = price * (1 - discountPercentage);
  }

  // Apply minimum price
  if (price < vehicleData.minPrice) {
    price = vehicleData.minPrice;
  }

  return Number(Math.round(price).toFixed(2));
};
