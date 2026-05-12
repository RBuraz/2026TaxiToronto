"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Users,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Baby,
  Accessibility,
  Bike,
  Snowflake,
  Plane,
  Building,
  Home,
  Hotel,
  Navigation,
  Briefcase,
  PawPrint,
  ArrowUp,
  ShoppingCart,
  User,
} from "lucide-react";
import debounce from "lodash.debounce";
import { autocompleteNovi } from "@/actions/autocomplete";
import { calculateDistance, DistanceResult } from "@/actions/distance";
import Image from "next/image";
import { calculatePrice } from "@/lib/calculatePrice";
//import { trackClick } from "@/lib/trackClick";
import {
  transferVehicleContacts,
  type TransferVehicleKey,
} from "@/data/transfers/transferContacts";

interface LocationSuggestion {
  description: string;
  place_id: string;
  types: string[];
  main_text: string;
  secondary_text: string;
}

interface TransferFormData {
  pickupAddress: string;
  pickupPlaceId: string;
  dropoffAddress: string;
  dropoffPlaceId: string;
  passengers: number;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
  vehicleType: string;
  returnTrip: boolean;
  returnDate: string;
  returnTime: string;
  flightNumber: string;
  arrivalTime: string;
  arrivalHour: string;
  arrivalMinute: string;
  greetingService: boolean;
  greetingName: string;
}

interface VehicleOption {
  id: TransferVehicleKey;
  pricingId: string;
  name: string;
  capacity: string;
  suitcases: string;
  image: string;
  description: string;
  returnDiscount: number;
}

interface ExtraOption {
  id: string;
  name: string;
  price: number;
  icon: React.ReactNode;
  description: string;
  perDay?: boolean;
}

export default function TransferForm({
  defaultFormData,
  precalculatedDistance,
  initialPrediction,
}: {
  defaultFormData?: Partial<TransferFormData>;
  precalculatedDistance?: DistanceResult;
  initialPrediction?: LocationSuggestion[];
}) {
  const pathname = usePathname();

  const [formData, setFormData] = useState<TransferFormData>(
    defaultFormData
      ? (defaultFormData as TransferFormData)
      : {
          pickupAddress: "",
          pickupPlaceId: "",
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
        },
  );

  const [pickupSuggestions, setPickupSuggestions] = useState<
    LocationSuggestion[]
  >([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<
    LocationSuggestion[]
  >([]);

  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [isPickupLoading, setIsPickupLoading] = useState(false);
  const [isDropoffLoading, setIsDropoffLoading] = useState(false);
  const [distanceResult, setDistanceResult] = useState<DistanceResult | null>(
    precalculatedDistance || null,
  );
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showExtraOptions, setShowExtraOptions] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>(
    {},
  );
  const [isAirportPickup, setIsAirportPickup] = useState(false);

  const [pickupError, setPickupError] = useState<string>("");
  const [dropoffError, setDropoffError] = useState<string>("");

  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (precalculatedDistance) {
      const hasValidData =
        precalculatedDistance.distanceMeters >= 0 &&
        precalculatedDistance.status === "OK";

      if (hasValidData) {
        setDistanceResult(precalculatedDistance);
        setShowResults(true);
      }
    }
  }, [precalculatedDistance]);

  useEffect(() => {
    const isAirport =
      formData.pickupAddress.toLowerCase().includes("airport") ||
      formData.pickupAddress.toLowerCase().includes("zračna luka") ||
      formData.pickupAddress.toLowerCase().includes("aerodrom");
    setIsAirportPickup(isAirport);
  }, [formData.pickupAddress]);

  const vehicleOptions: VehicleOption[] = [
    {
      id: "car",
      pricingId: "standard car",
      name: "Standard Car",
      capacity: "4",
      suitcases: "3",
      image: "/fleet-jpg/sedan.jpg",
      description: "Comfortable sedan for up to 4 passengers",
      returnDiscount: 10,
    },
    {
      id: "monovolumen",
      pricingId: "monovolumen",
      name: "Minivan",
      capacity: "4-6",
      suitcases: "0-6",
      image: "/fleet-jpg/monovolumen-new.jpg",
      description: "Spacious minivan for families or small groups",
      returnDiscount: 10,
    },
    {
      id: "sClass",
      pricingId: "S-class",
      name: "Mercedes S-class",
      capacity: "4",
      suitcases: "3",
      image: "/fleet-jpg/s-class.jpg",
      description: "Luxury sedan for premium comfort and executive travel.",
      returnDiscount: 10,
    },
    {
      id: "van",
      pricingId: "van",
      name: "Van",
      capacity: "8",
      suitcases: "6",
      image: "/fleet-jpg/van.jpg",
      description: "Perfect for larger groups with luggage",
      returnDiscount: 10,
    },
    {
      id: "vClass",
      pricingId: "V-class",
      name: "V-Class",
      capacity: "7",
      suitcases: "6",
      image: "/fleet-jpg/v-class.jpg",
      description: "Premium Mercedes V-Class for luxury travel",
      returnDiscount: 10,
    },
    {
      id: "minibus",
      pricingId: "minibus",
      name: "Minibus",
      capacity: "16",
      suitcases: "12",
      image: "/fleet-jpg/mini-bus.jpg",
      description: "Ideal for larger groups and tours",
      returnDiscount: 0,
    },
    {
      id: "bestOption",
      pricingId: "best option for my group",
      name: "Best Option for My Group",
      capacity: "50",
      suitcases: "?",
      image: "/fleet-jpg/trio.jpg",
      description: "Let us recommend the perfect vehicle for your group",
      returnDiscount: 0,
    },
    {
      id: "bus",
      pricingId: "bus",
      name: "Bus",
      capacity: "50",
      suitcases: "0",
      image: "/fleet-jpg/bus.jpg",
      description: "Full-size bus for large groups and events",
      returnDiscount: 10,
    },
  ];

  const PRICE_CONFIG = {
    "greeting service": 15.0,
  };

  const extraOptions: ExtraOption[] = [
    {
      id: "baby seat",
      name: "Baby Seat",
      price: 10.0,
      icon: <Baby className="w-5 h-5" />,
      description: "Rear-facing seat for infants and toddlers (0–3 years).",
    },
    {
      id: "child seat",
      name: "Child Seat",
      price: 10.0,
      icon: <User className="w-5 h-5" />,
      description: "Forward-facing seat for children approx. 4–12 years.",
    },
    {
      id: "booster seat",
      name: "Booster Seat",
      price: 10.0,
      icon: <ArrowUp className="w-5 h-5" />,
      description:
        "Seat booster for older children requiring proper seatbelt fit.",
    },
    {
      id: "extra stop (30 min)",
      name: "Extra Stop – 30 min",
      price: 15.0,
      icon: <ShoppingCart className="w-5 h-5" />,
      description:
        "Optional stop for shopping or errands during the transfer (maximum 30 minutes per stop).",
    },
    {
      id: "extra stop (60 min)",
      name: "Extra Stop – 60 min",
      price: 25.0,
      icon: <Clock className="w-5 h-5" />,
      description:
        "Extended stop for shopping or personal errands during the transfer (maximum 60 minutes per stop).",
    },
    {
      id: "ski equipment",
      name: "Ski Equipment",
      price: 5.0,
      icon: <Snowflake className="w-5 h-5" />,
      description:
        "Transport of skis and snowboards. Please specify quantity in advance.",
    },
    {
      id: "bicycle",
      name: "Bicycle",
      price: 15.0,
      icon: <Bike className="w-5 h-5" />,
      description:
        "Bicycle transport (per bike). Advance notice required to ensure suitable vehicle.",
    },
    {
      id: "wheelchair",
      name: "Wheelchair Accessible Vehicle",
      price: 0.0,
      icon: <Accessibility className="w-5 h-5" />,
      description:
        "Wheelchair-accessible vehicle with appropriate space and access support.",
    },
    {
      id: "pet on board",
      name: "Pet on Board",
      price: 0,
      icon: <PawPrint className="w-5 h-5" />,
      description:
        "Pet transport (must be in a suitable carrier). Please inform us in advance.",
    },
  ];

  const toDigits = (value: string) => (value || "").replace(/\D/g, "");

  const getVehicleContact = (vehicleId: TransferVehicleKey) => {
    return transferVehicleContacts[vehicleId];
  };

  const getTrackedValue = (
    vehicle: VehicleOption,
    totalOneWayPrice: number,
  ): number => {
    const isOnRequest = vehicle.id === "bus" || vehicle.id === "bestOption";
    if (isOnRequest) return 0;
    return Number(totalOneWayPrice.toFixed(2));
  };

const handleTrackedAction = async ({
  vehicle,
  method,
  href,
  totalOneWayPrice,
  target = "_self",
}: {
  vehicle: VehicleOption;
  method: "call" | "whatsapp" | "email";
  href: string;
  totalOneWayPrice: number;
  target?: "_self" | "_blank";
}) => {
  const contact = getVehicleContact(vehicle.id);

  /*
  await trackClick({
    category: "transfer",
    fullPath: pathname,
    fromLocation: formData.pickupAddress,
    toLocation: formData.dropoffAddress,
    vehicle: vehicle.id,
    company: contact.company,
    driver: contact.driver,
    method,
    value: getTrackedValue(vehicle, totalOneWayPrice),
  });
  */

  if (target === "_blank") {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }

  window.location.href = href;
};

  const getLocationIcon = (types: string[] = [], description: string = "") => {
    const descLower = description.toLowerCase();

    if (
      types.includes("airport") ||
      descLower.includes("zračna luka") ||
      descLower.includes("airport")
    ) {
      return <Plane className="w-4 h-4 text-blue-500" />;
    }
    if (types.includes("train_station") || descLower.includes("željeznička")) {
      return <Navigation className="w-4 h-4 text-orange-500" />;
    }
    if (
      types.includes("bus_station") ||
      descLower.includes("autobusni kolodvor")
    ) {
      return <Briefcase className="w-4 h-4 text-green-500" />;
    }
    if (types.includes("hotel") || descLower.includes("hotel")) {
      return <Hotel className="w-4 h-4 text-purple-500" />;
    }
    if (types.includes("restaurant") || types.includes("cafe")) {
      return <Home className="w-4 h-4 text-red-500" />;
    }
    return <Building className="w-4 h-4 text-gray-500" />;
  };

  const searchInInitialPredictions = (
    input: string,
    initialPredictions?: LocationSuggestion[],
  ): LocationSuggestion[] => {
    if (!initialPredictions || input.length === 0) return [];

    const searchTerm = input.toLowerCase();

    return initialPredictions.filter((suggestion) =>
      suggestion.main_text.toLowerCase().startsWith(searchTerm),
    );
  };

  const fetchPickupSuggestions = useCallback(
    debounce(async (input: string) => {
      if (input.length >= 1) {
        const initialMatches = searchInInitialPredictions(
          input,
          initialPrediction,
        );

        if (initialMatches.length > 0) {
          setPickupSuggestions(initialMatches.slice(0, 5));
          setShowPickupSuggestions(true);

          const isAirport = initialMatches
            .slice(0, 5)
            .some(
              (suggestion) =>
                suggestion.types?.includes("airport") ||
                suggestion.description.toLowerCase().includes("airport") ||
                suggestion.description.toLowerCase().includes("zračna luka"),
            );
          setIsAirportPickup(isAirport);

          if (input.length < 3) {
            return;
          }
        } else if (input.length < 3) {
          setPickupSuggestions([]);
          setShowPickupSuggestions(false);
          return;
        }
      }

      if (input.length < 3) {
        setShowResults(false);
        setPickupSuggestions([]);
        return;
      }

      setIsPickupLoading(true);

      const initialMatches = searchInInitialPredictions(
        input,
        initialPrediction,
      );
      const initialMatchesCount = initialMatches.length;

      if (initialMatchesCount >= 5) {
        setPickupSuggestions(initialMatches.slice(0, 5));
        setShowPickupSuggestions(true);

        const isAirport = initialMatches
          .slice(0, 5)
          .some(
            (suggestion) =>
              suggestion.types?.includes("airport") ||
              suggestion.description.toLowerCase().includes("airport") ||
              suggestion.description.toLowerCase().includes("zračna luka"),
          );
        setIsAirportPickup(isAirport);
        setIsPickupLoading(false);
      } else {
        try {
          const apiSuggestions = (await autocompleteNovi(
            input,
          )) as LocationSuggestion[];

          const allSuggestions = [...initialMatches];

          for (const apiSuggestion of apiSuggestions) {
            const exists = allSuggestions.some(
              (s) => s.place_id === apiSuggestion.place_id,
            );
            if (!exists && allSuggestions.length < 5) {
              allSuggestions.push(apiSuggestion);
            }
            if (allSuggestions.length >= 5) break;
          }

          setPickupSuggestions(allSuggestions);
          setShowPickupSuggestions(true);

          const isAirport = allSuggestions.some(
            (suggestion) =>
              suggestion.types?.includes("airport") ||
              suggestion.description.toLowerCase().includes("airport") ||
              suggestion.description.toLowerCase().includes("zračna luka"),
          );
          setIsAirportPickup(isAirport);
        } catch {
          setPickupSuggestions(initialMatches);
          setShowPickupSuggestions(initialMatches.length > 0);

          const isAirport = initialMatches.some(
            (suggestion) =>
              suggestion.types?.includes("airport") ||
              suggestion.description.toLowerCase().includes("airport") ||
              suggestion.description.toLowerCase().includes("zračna luka"),
          );
          setIsAirportPickup(isAirport);
        } finally {
          setIsPickupLoading(false);
        }
      }
    }, 500),
    [initialPrediction],
  );

  const fetchDropoffSuggestions = useCallback(
    debounce(async (input: string) => {
      if (input.length >= 1) {
        const initialMatches = searchInInitialPredictions(
          input,
          initialPrediction,
        );

        if (initialMatches.length > 0) {
          setDropoffSuggestions(initialMatches.slice(0, 5));
          setShowDropoffSuggestions(true);

          if (input.length < 3) {
            return;
          }
        } else if (input.length < 3) {
          setDropoffSuggestions([]);
          setShowDropoffSuggestions(false);
          return;
        }
      }

      if (input.length < 3) {
        setShowResults(false);
        setDropoffSuggestions([]);
        return;
      }

      setIsDropoffLoading(true);

      const initialMatches = searchInInitialPredictions(
        input,
        initialPrediction,
      );
      const initialMatchesCount = initialMatches.length;

      if (initialMatchesCount >= 5) {
        setDropoffSuggestions(initialMatches.slice(0, 5));
        setShowDropoffSuggestions(true);
        setIsDropoffLoading(false);
      } else {
        try {
          const apiSuggestions = (await autocompleteNovi(
            input,
          )) as LocationSuggestion[];

          const allSuggestions = [...initialMatches];

          for (const apiSuggestion of apiSuggestions) {
            const exists = allSuggestions.some(
              (s) => s.place_id === apiSuggestion.place_id,
            );
            if (!exists && allSuggestions.length < 5) {
              allSuggestions.push(apiSuggestion);
            }
            if (allSuggestions.length >= 5) break;
          }

          setDropoffSuggestions(allSuggestions);
          setShowDropoffSuggestions(true);
        } catch {
          setDropoffSuggestions(initialMatches);
          setShowDropoffSuggestions(initialMatches.length > 0);
        } finally {
          setIsDropoffLoading(false);
        }
      }
    }, 500),
    [initialPrediction],
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checkbox.checked,
      }));

      if (name === "greetingService" && !checkbox.checked) {
        setFormData((prev) => ({
          ...prev,
          greetingName: "",
        }));
      }
    } else {
      if (name === "pickupAddress") {
        setShowResults(false);

        setFormData((prev) => ({
          ...prev,
          [name]: value,
          pickupPlaceId: "",
        }));
        setPickupError("");
        fetchPickupSuggestions(value);
      } else if (name === "dropoffAddress") {
        setShowResults(false);
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          dropoffPlaceId: "",
        }));
        setDropoffError("");
        fetchDropoffSuggestions(value);
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const handleSuggestionClick = (
    field: "pickup" | "dropoff",
    suggestion: LocationSuggestion,
  ) => {
    if (field === "pickup") {
      setFormData((prev) => ({
        ...prev,
        pickupAddress: suggestion.description,
        pickupPlaceId: suggestion.place_id,
      }));
      setShowPickupSuggestions(false);
      setPickupSuggestions([]);
      setPickupError("");

      const isAirport =
        suggestion.types?.includes("airport") ||
        suggestion.description.toLowerCase().includes("airport") ||
        suggestion.description.toLowerCase().includes("zračna luka");
      setIsAirportPickup(isAirport);
    } else {
      setFormData((prev) => ({
        ...prev,
        dropoffAddress: suggestion.description,
        dropoffPlaceId: suggestion.place_id,
      }));
      setShowDropoffSuggestions(false);
      setDropoffSuggestions([]);
      setDropoffError("");
    }
  };

  const validateAddress = (field: "pickup" | "dropoff"): boolean => {
    const address =
      field === "pickup" ? formData.pickupAddress : formData.dropoffAddress;
    const placeId =
      field === "pickup" ? formData.pickupPlaceId : formData.dropoffPlaceId;

    if (address.trim() === "") {
      return true;
    }

    if (placeId && placeId !== "") {
      return true;
    }

    setTimeout(() => {
      if (field === "pickup") {
        const input = pickupInputRef.current;
        if (input && input === document.activeElement) {
          return;
        }
        if (address.trim() !== "" && !formData.pickupPlaceId) {
          setPickupError(
            "Please select an address from the dropdown for accurate service",
          );
        }
      } else {
        const input = dropoffInputRef.current;
        if (input && input === document.activeElement) {
          return;
        }
        if (address.trim() !== "" && !formData.dropoffPlaceId) {
          setDropoffError(
            "Please select an address from the dropdown for accurate service",
          );
        }
      }
    }, 1000);

    return false;
  };

  const handleInputBlur = (field: "pickup" | "dropoff") => {
    setTimeout(() => {
      validateAddress(field);
    }, 200);
  };

  const handleExtraOptionToggle = (id: string) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const calculateTotalExtrasPrice = (): number => {
    let total = extraOptions.reduce((total, extra) => {
      return total + (selectedExtras[extra.id] ? extra.price : 0);
    }, 0);

    if (formData.greetingService) {
      total += PRICE_CONFIG["greeting service"];
    }

    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pickupError || dropoffError) {
      return;
    }

    if (formData.pickupAddress.trim() !== "" && !formData.pickupPlaceId) {
      setPickupError(
        "Please select an address from the dropdown for accurate service",
      );
      pickupInputRef.current?.focus();
      return;
    }

    if (formData.dropoffAddress.trim() !== "" && !formData.dropoffPlaceId) {
      setDropoffError(
        "Please select an address from the dropdown for accurate service",
      );
      dropoffInputRef.current?.focus();
      return;
    }

    if (!formData.pickupPlaceId || !formData.dropoffPlaceId) {
      alert(
        "Please select both pickup and dropoff locations from the dropdown",
      );
      return;
    }

    setIsCalculating(true);
    setShowResults(false);

    try {
      const result = await calculateDistance(
        formData.pickupPlaceId,
        formData.dropoffPlaceId,
      );
      setDistanceResult(result);
      setShowResults(true);
    } catch {
      alert("Error calculating distance. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  const generateWhatsAppMessage = (vehicle: VehicleOption): string => {
    let message = `Hello! I'm interested in a transfer service:\n\n`;

    if (vehicle.id === "bus" || vehicle.id === "bestOption") {
      const date = new Date(formData.date);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      message += `*TRANSFER QUOTE REQUEST:*\n\n`;
      message += `*From:* ${formData.pickupAddress}\n`;
      message += `*To:* ${formData.dropoffAddress}\n`;
      message += `*Date:* ${formattedDate}\n`;
      message += `*Time:* ${formData.time}\n`;
      message += `*Passengers:* ${formData.passengers}\n`;
      message += `*Vehicle type:* ${vehicle.id === "bus" ? "Bus" : "Best option for group"}\n`;

      if (formData.returnTrip) {
        const returnDate = new Date(formData.returnDate);
        const formattedReturnDate = returnDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        message += `\n*RETURN TRIP:*\n`;
        message += `*From:* ${formData.dropoffAddress}\n`;
        message += `*To:* ${formData.pickupAddress}\n`;
        message += `*Date:* ${formattedReturnDate}\n`;
        message += `*Time:* ${formData.returnTime}\n`;
      }

      message += `\n*Could you please provide:*\n`;
      message += `• Price quote for this transfer\n`;
      message += `• Available vehicle options\n\n`;
    } else {
      const date = new Date(formData.date);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const basePriceOneWay = calculatePrice(distanceResult, vehicle.pricingId);
      const extrasPrice = calculateTotalExtrasPrice();
      const totalOneWayPrice = basePriceOneWay + extrasPrice;

      message += `*TRANSFER BOOKING REQUEST:*\n\n`;
      message += `*Booking Details:*\n`;
      message += `• *From:* ${formData.pickupAddress}\n`;
      message += `• *To:* ${formData.dropoffAddress}\n`;
      message += `• *Vehicle:* ${vehicle.name}\n`;
      message += `• *Passengers:* ${formData.passengers}\n`;
      message += `• *Date:* ${formattedDate}\n`;
      message += `• *Time:* ${formData.time}\n`;

      const selectedExtraOptions = extraOptions.filter(
        (extra) => selectedExtras[extra.id],
      );

      if (selectedExtraOptions.length > 0 || formData.greetingService) {
        message += `\n*Additional Services:*\n`;
        selectedExtraOptions.forEach((extra) => {
          message += `• ${extra.name}\n`;
        });
        if (formData.greetingService) {
          message += `• Greeting service\n`;
        }
      }

      if (isAirportPickup && formData.flightNumber) {
        message += `\n*Flight Information:*\n`;
        message += `• Flight number: ${formData.flightNumber}\n`;
        if (formData.greetingService && formData.greetingName) {
          message += `• Greeting service name: ${formData.greetingName}\n`;
        }
      }

      message += `\n*Price Estimate:*\n`;
      message += `• One-way trip: *${totalOneWayPrice.toFixed(2)}€*\n`;

      if (formData.returnTrip) {
        const returnDate = new Date(formData.returnDate);
        const formattedReturnDate = returnDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const discountAmount = basePriceOneWay * (vehicle.returnDiscount / 100);
        const discountedBasePrice = basePriceOneWay - discountAmount;
        const totalReturnPrice = discountedBasePrice + extrasPrice;

        message += `\n*Return Trip Details:*\n`;
        message += `• *From:* ${formData.dropoffAddress}\n`;
        message += `• *To:* ${formData.pickupAddress}\n`;
        message += `• *Date:* ${formattedReturnDate}\n`;
        message += `• *Time:* ${formData.returnTime}\n`;
        message += `• *Return trip price:* ${totalReturnPrice.toFixed(2)}€ (includes ${vehicle.returnDiscount}% discount)\n`;

        const totalBothWays = totalOneWayPrice + totalReturnPrice;
        message += `\n*Total for both trips:* ${totalBothWays.toFixed(2)}€\n`;
      }

      message += `\n*Could you please confirm:*\n`;
      message += `1. Availability for this date and time\n`;
      message += `2. Final price confirmation\n`;
      message += `3. Vehicle details and driver information\n\n`;
    }

    message += `Looking forward to your confirmation.\n`;
    message += `Thank you!`;

    return encodeURIComponent(message);
  };

  const generateEmailBody = (vehicle: VehicleOption): string => {
    let message = `Hello Toronto Taxi & Transfers,\n\n`;
    message += `I'm interested in booking a transfer service with you.\n\n`;

    if (vehicle.id === "bus" || vehicle.id === "bestOption") {
      const date = new Date(formData.date);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      message += `TRANSFER QUOTE REQUEST:\n`;
      message += `======================\n\n`;
      message += `From: ${formData.pickupAddress}\n`;
      message += `To: ${formData.dropoffAddress}\n`;
      message += `Date: ${formattedDate}\n`;
      message += `Time: ${formData.time}\n`;
      message += `Passengers: ${formData.passengers}\n`;
      message += `Vehicle type: ${vehicle.id === "bus" ? "Bus" : "Best option for group"}\n\n`;

      if (formData.returnTrip) {
        const returnDate = new Date(formData.returnDate);
        const formattedReturnDate = returnDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        message += `RETURN TRIP:\n`;
        message += `From: ${formData.dropoffAddress}\n`;
        message += `To: ${formData.pickupAddress}\n`;
        message += `Date: ${formattedReturnDate}\n`;
        message += `Time: ${formData.returnTime}\n\n`;
      }

      message += `Could you please provide:\n`;
      message += `• Price quote for this transfer\n`;
      message += `• Available vehicle options\n\n`;
    } else {
      const date = new Date(formData.date);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const basePriceOneWay = calculatePrice(distanceResult, vehicle.pricingId);
      const extrasPrice = calculateTotalExtrasPrice();
      const totalOneWayPrice = basePriceOneWay + extrasPrice;

      message += `BOOKING REQUEST:\n`;
      message += `================\n\n`;
      message += `From: ${formData.pickupAddress}\n`;
      message += `To: ${formData.dropoffAddress}\n`;
      message += `Vehicle: ${vehicle.name}\n`;
      message += `Passengers: ${formData.passengers}\n`;
      message += `Date: ${formattedDate}\n`;
      message += `Time: ${formData.time}\n`;

      const selectedExtraOptions = extraOptions.filter(
        (extra) => selectedExtras[extra.id],
      );

      if (selectedExtraOptions.length > 0 || formData.greetingService) {
        message += `\nAdditional Services:\n`;
        selectedExtraOptions.forEach((extra) => {
          message += `• ${extra.name} (+${extra.price.toFixed(2)}€)\n`;
        });
        if (formData.greetingService) {
          message += `• Greeting service (+${PRICE_CONFIG["greeting service"].toFixed(2)}€)${formData.greetingName ? ` (Name: ${formData.greetingName})` : ""}\n`;
        }
      }

      if (isAirportPickup && formData.flightNumber) {
        message += `\nFlight Information:\n`;
        message += `• Flight number: ${formData.flightNumber}\n`;
      }

      message += `\nPrice Estimate:\n`;
      message += `• One-way trip: ${totalOneWayPrice.toFixed(2)}€\n`;

      if (formData.returnTrip) {
        const returnDate = new Date(formData.returnDate);
        const formattedReturnDate = returnDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const discountAmount = basePriceOneWay * (vehicle.returnDiscount / 100);
        const discountedBasePrice = basePriceOneWay - discountAmount;
        const totalReturnPrice = discountedBasePrice + extrasPrice;

        message += `\nReturn Trip Details:\n`;
        message += `• From: ${formData.dropoffAddress}\n`;
        message += `• To: ${formData.pickupAddress}\n`;
        message += `• Date: ${formattedReturnDate}\n`;
        message += `• Time: ${formData.returnTime}\n`;
        message += `• Return trip price: ${totalReturnPrice.toFixed(2)}€ (includes ${vehicle.returnDiscount}% discount)\n`;

        const totalBothWays = totalOneWayPrice + totalReturnPrice;
        message += `\nTotal for both trips: ${totalBothWays.toFixed(2)}€\n`;
      }
    }

    message += `\nLooking forward to your confirmation.\n`;
    message += `Thank you!\n\n`;
    message += `---\n`;
    message += `Sent from Toronto Taxi & Transfers booking form`;

    return encodeURIComponent(message);
  };

  const generateEmailSubject = (vehicle: VehicleOption): string => {
    return encodeURIComponent(
      `Transfer Booking Request - ${formData.pickupAddress.split(",")[0]} to ${formData.dropoffAddress.split(",")[0]} - ${vehicle.name}`,
    );
  };

  const getEmailLink = (vehicle: VehicleOption): string => {
    const contact = getVehicleContact(vehicle.id);
    const subject = generateEmailSubject(vehicle);
    const body = generateEmailBody(vehicle);

    return `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const getWhatsAppLink = (vehicle: VehicleOption): string => {
    const contact = getVehicleContact(vehicle.id);
    const message = generateWhatsAppMessage(vehicle);

    return `https://wa.me/${toDigits(contact.whatsApp)}?text=${message}`;
  };

  const getCallLink = (vehicle: VehicleOption): string => {
    const contact = getVehicleContact(vehicle.id);
    return `tel:+${toDigits(contact.phone)}`;
  };

  useEffect(() => {
    if (!formData.date) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const defaultDate = tomorrow.toISOString().split("T")[0];

      setFormData((prev) => ({
        ...prev,
        date: defaultDate,
        time: "12:00",
      }));
    }
  }, [formData.date]);

  useEffect(() => {
    if (formData.date) {
      const dateObj = new Date(formData.date);
      dateObj.setDate(dateObj.getDate() + 1);
      const nextDay = dateObj.toISOString().split("T")[0];
      if (!formData.returnDate || formData.returnDate < formData.date) {
        setFormData((prev) => ({
          ...prev,
          returnDate: nextDay,
          returnTime: "12:00",
        }));
      }
    }
  }, [formData.date, formData.returnDate]);

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 pt-4 px-1">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Transfer Booking
          </h1>
          <p className="text-gray-600">
            Book your comfortable and reliable transfer
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label
                      htmlFor="pickupAddress"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pickup Location *
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10"
                        aria-label="Pickup location"
                      />
                      <input
                        id="pickupAddress"
                        ref={pickupInputRef}
                        type="text"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleChange}
                        onFocus={() => {
                          if (
                            formData.pickupAddress.length >= 1 &&
                            pickupSuggestions.length > 0
                          ) {
                            setShowPickupSuggestions(true);
                          }
                        }}
                        onBlur={() => {
                          setTimeout(
                            () => setShowPickupSuggestions(false),
                            200,
                          );
                          handleInputBlur("pickup");
                        }}
                        required
                        placeholder="Enter pickup address"
                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                          pickupError ? "border-red-500" : "border-gray-300"
                        }`}
                        autoComplete="off"
                      />
                      {isPickupLoading && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                        </div>
                      )}

                      {formData.pickupAddress && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              pickupAddress: "",
                              pickupPlaceId: "",
                            }));
                            setIsAirportPickup(false);
                            setShowResults(false);
                            setPickupError("");
                            setPickupSuggestions([]);
                            setShowPickupSuggestions(false);
                            pickupInputRef.current?.focus();
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
                          aria-label="Clear pickup address"
                          title="Clear address"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {pickupError && (
                      <div className="mt-1">
                        <p className="text-sm text-red-600 flex items-center">
                          <span className="mr-1">⚠</span>
                          {pickupError}
                        </p>
                      </div>
                    )}

                    {showPickupSuggestions && pickupSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        <div className="px-3 py-2 bg-blue-50 border-b border-blue-100">
                          <p className="text-xs text-blue-700 font-medium">
                            Select from location list
                          </p>
                        </div>
                        {pickupSuggestions.map((suggestion) => (
                          <div
                            key={suggestion.place_id}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-start gap-3"
                            onMouseDown={() =>
                              handleSuggestionClick("pickup", suggestion)
                            }
                          >
                            <div className="shrink-0 mt-1">
                              {getLocationIcon(
                                suggestion.types,
                                suggestion.description,
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">
                                {suggestion.main_text}
                              </div>
                              <div className="text-sm text-gray-600">
                                {suggestion.secondary_text}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="dropoffAddress"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Dropoff Location *
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10"
                        aria-label="Dropoff location"
                      />
                      <input
                        id="dropoffAddress"
                        ref={dropoffInputRef}
                        type="text"
                        name="dropoffAddress"
                        value={formData.dropoffAddress}
                        onChange={handleChange}
                        onFocus={() => {
                          if (
                            formData.dropoffAddress.length >= 1 &&
                            dropoffSuggestions.length > 0
                          ) {
                            setShowDropoffSuggestions(true);
                          }
                        }}
                        onBlur={() => {
                          setTimeout(
                            () => setShowDropoffSuggestions(false),
                            200,
                          );
                          handleInputBlur("dropoff");
                        }}
                        required
                        placeholder="Enter dropoff address"
                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                          dropoffError ? "border-red-500" : "border-gray-300"
                        }`}
                        autoComplete="off"
                      />
                      {isDropoffLoading && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                        </div>
                      )}

                      {formData.dropoffAddress && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              dropoffAddress: "",
                              dropoffPlaceId: "",
                            }));
                            setDropoffError("");
                            setDropoffSuggestions([]);
                            setShowDropoffSuggestions(false);
                            setShowResults(false);
                            dropoffInputRef.current?.focus();
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
                          aria-label="Clear dropoff address"
                          title="Clear address"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {dropoffError && (
                      <div className="mt-1">
                        <p className="text-sm text-red-600 flex items-center">
                          <span className="mr-1">⚠</span>
                          {dropoffError}
                        </p>
                      </div>
                    )}

                    {showDropoffSuggestions &&
                      dropoffSuggestions.length > 0 && (
                        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                          <div className="px-3 py-2 bg-blue-50 border-b border-blue-100">
                            <p className="text-xs text-blue-700 font-medium">
                              Select from location list
                            </p>
                          </div>
                          {dropoffSuggestions.map((suggestion) => (
                            <div
                              key={suggestion.place_id}
                              className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-start gap-3"
                              onMouseDown={() =>
                                handleSuggestionClick("dropoff", suggestion)
                              }
                            >
                              <div className="shrink-0 mt-1">
                                {getLocationIcon(
                                  suggestion.types,
                                  suggestion.description,
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-800">
                                  {suggestion.main_text}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {suggestion.secondary_text}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>

                {isAirportPickup && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-bold text-blue-700 mb-3 flex items-center text-lg">
                      <Plane className="mr-2 w-5 h-5" />
                      Airport Pickup Information
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="flightNumber"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Flight Number
                        </label>
                        <input
                          id="flightNumber"
                          type="text"
                          name="flightNumber"
                          value={formData.flightNumber}
                          onChange={handleChange}
                          placeholder="e.g. OU123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="bg-white p-3 rounded border">
                        <label className="flex items-center cursor-pointer">
                          <input
                            id="greetingService"
                            type="checkbox"
                            name="greetingService"
                            checked={formData.greetingService}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <div className="ml-3">
                            <div className="font-medium">
                              Greeting Service with Name Sign{" "}
                              <span className="text-green-600">
                                {PRICE_CONFIG["greeting service"]} €
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Driver will wait with a name sign at arrivals
                            </p>
                          </div>
                        </label>

                        {formData.greetingService && (
                          <div className="mt-3">
                            <label
                              htmlFor="greetingName"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Name on Sign *
                            </label>
                            <input
                              id="greetingName"
                              type="text"
                              name="greetingName"
                              value={formData.greetingName}
                              onChange={handleChange}
                              placeholder="Enter name for the sign"
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="passengers"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Number of Passengers *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        id="passengers"
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      >
                        {Array.from({ length: 50 }, (_, i) => i + 1).map(
                          (num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "passenger" : "passengers"}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pickup Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pickup Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="time"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label
                    htmlFor="returnTrip"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      id="returnTrip"
                      type="checkbox"
                      name="returnTrip"
                      checked={formData.returnTrip}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 font-medium">
                      I need a return trip
                    </span>
                  </label>

                  {formData.returnTrip && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="returnDate"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Return Date *
                        </label>
                        <input
                          id="returnDate"
                          type="date"
                          name="returnDate"
                          value={formData.returnDate}
                          onChange={handleChange}
                          required
                          min={
                            formData.date ||
                            new Date().toISOString().split("T")[0]
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="returnTime"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Return Time *
                        </label>
                        <input
                          id="returnTime"
                          type="time"
                          name="returnTime"
                          value={formData.returnTime}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowExtraOptions(!showExtraOptions)}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                    aria-expanded={showExtraOptions}
                    aria-controls="extraOptions"
                  >
                    <span className="font-medium">Additional Services</span>
                    {showExtraOptions ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  {showExtraOptions && (
                    <div id="extraOptions" className="p-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {extraOptions.map((extra) => (
                          <div
                            key={extra.id}
                            className={`border rounded-lg p-3 cursor-pointer transition-all ${
                              selectedExtras[extra.id]
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handleExtraOptionToggle(extra.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleExtraOptionToggle(extra.id);
                              }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-pressed={selectedExtras[extra.id]}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start">
                                <div
                                  className={`p-2 rounded-lg mr-3 ${
                                    selectedExtras[extra.id]
                                      ? "bg-blue-100 text-blue-600"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {extra.icon}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {extra.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {extra.description}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-green-600">
                                  {extra.price.toFixed(2)} €
                                </div>
                                <div
                                  className={`w-5 h-5 rounded border flex items-center justify-center mt-2 ${
                                    selectedExtras[extra.id]
                                      ? "bg-blue-500 border-blue-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {selectedExtras[extra.id] && (
                                    <span className="text-white text-sm">
                                      ✓
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 text-right">
                        <span className="font-medium text-gray-700">
                          Extras Total:{" "}
                          <span className="text-green-600">
                            {calculateTotalExtrasPrice().toFixed(2)} €
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    isPickupLoading ||
                    isDropoffLoading ||
                    isCalculating ||
                    pickupError !== "" ||
                    dropoffError !== "" ||
                    !formData.pickupPlaceId ||
                    !formData.dropoffPlaceId
                  }
                  className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating
                    ? "Calculating..."
                    : isPickupLoading || isDropoffLoading
                      ? "Loading..."
                      : "View Vehicle Options"}
                </button>
              </form>
            </div>

            {showResults && distanceResult && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <p className="text-2xl font-bold text-gray-800 mb-6">
                  Transfer Details
                </p>

                <div className="mb-8">
                  <p className="text-lg font-semibold text-gray-700 mb-4">
                    From: {formData.pickupAddress}
                  </p>
                  <p className="text-lg font-semibold text-gray-700 mb-4">
                    To: {formData.dropoffAddress}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50 p-4 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Distance</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {distanceResult.distance}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 mb-2">
                        Estimated Time
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {distanceResult.duration}
                      </p>
                    </div>
                  </div>
                </div>

                {(Object.keys(selectedExtras).length > 0 ||
                  formData.greetingService) && (
                  <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg font-bold text-gray-800 mb-4">
                      Selected Additional Services
                    </p>

                    {isAirportPickup && formData.greetingService && (
                      <div className="mb-4">
                        <p className="font-medium text-gray-700 mb-2">
                          Airport Services
                        </p>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li className="font-medium text-blue-600">
                            • Greeting Service: €{" "}
                            {PRICE_CONFIG["greeting service"].toFixed(2)}
                            {formData.greetingName &&
                              ` (Name: ${formData.greetingName})`}
                          </li>
                        </ul>
                      </div>
                    )}

                    {Object.keys(selectedExtras).length > 0 && (
                      <div>
                        <p className="font-medium text-gray-700 mb-2">
                          Extra Equipment
                        </p>
                        <ul className="space-y-2">
                          {extraOptions
                            .filter((extra) => selectedExtras[extra.id])
                            .map((extra) => (
                              <li
                                key={extra.id}
                                className="flex justify-between items-center"
                              >
                                <span className="text-gray-600">
                                  {extra.name}
                                </span>
                                <span className="font-medium text-green-600">
                                  {extra.price.toFixed(2)} €
                                </span>
                              </li>
                            ))}
                        </ul>
                        <div className="mt-3 pt-3 border-t border-gray-300 flex justify-between font-bold">
                          <span>Extras Total</span>
                          <span className="text-green-600">
                            {calculateTotalExtrasPrice().toFixed(2)} €
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-8">
                  <p className="text-xl font-bold text-gray-800 mb-4">
                    Choose Your Vehicle
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicleOptions
                      .filter(
                        (vehicle) =>
                          parseInt(vehicle.capacity) >= formData.passengers,
                      )
                      .map((vehicle) => {
                        const isOnRequest =
                          vehicle.id === "bus" || vehicle.id === "bestOption";

                        const basePriceOneWay = isOnRequest
                          ? 0
                          : calculatePrice(distanceResult, vehicle.pricingId);

                        const extrasPrice = calculateTotalExtrasPrice();
                        const totalOneWayPrice = isOnRequest
                          ? 0
                          : basePriceOneWay + extrasPrice;

                        const discountAmount = isOnRequest
                          ? 0
                          : basePriceOneWay * (vehicle.returnDiscount / 100);

                        const discountedBasePrice = isOnRequest
                          ? 0
                          : basePriceOneWay - discountAmount;

                        const totalReturnPrice = isOnRequest
                          ? 0
                          : discountedBasePrice + extrasPrice;

                        return (
                          <div
                            key={vehicle.id}
                            className={`border-2 rounded-xl overflow-hidden transition-all duration-200 ${
                              formData.vehicleType === vehicle.id
                                ? "border-blue-500 ring-2 ring-blue-200"
                                : "border-gray-200 hover:border-blue-300 hover:shadow-lg"
                            }`}
                          >
                            <div className="relative h-48 w-full">
                              <Image
                                src={vehicle.image}
                                alt={vehicle.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>

                            <div className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <p className="font-bold text-gray-800 text-lg">
                                    {vehicle.name}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {vehicle.description}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-3 mb-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600">
                                    Capacity
                                  </span>
                                  <span className="font-medium bg-blue-50 px-2 py-1 rounded">
                                    {vehicle.capacity} passengers
                                  </span>
                                </div>

                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600">
                                    Suitcases
                                  </span>
                                  <span className="font-medium bg-blue-50 px-2 py-1 rounded">
                                    {vehicle.suitcases}
                                  </span>
                                </div>

                                {isOnRequest ? (
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Price</span>
                                    <span className="text-xl font-bold text-green-600">
                                      On Request
                                    </span>
                                  </div>
                                ) : (
                                  <div className="pt-2 border-t border-gray-200">
                                    <div className="mb-2">
                                      <div className="flex justify-between items-center">
                                        <span className="text-gray-700 font-medium">
                                          One-way trip
                                        </span>
                                        <span className="font-bold text-green-600">
                                          {totalOneWayPrice.toFixed(2)} €
                                        </span>
                                      </div>

                                      <details className="mt-1">
                                        <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                                          Price details
                                        </summary>
                                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                                          <div className="flex justify-between">
                                            <span>Base ride</span>
                                            <span>
                                              {basePriceOneWay.toFixed(2)} €
                                            </span>
                                          </div>

                                          {extrasPrice > 0 && (
                                            <div className="flex justify-between">
                                              <span>Additional services</span>
                                              <span>
                                                +{extrasPrice.toFixed(2)} €
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </details>
                                    </div>

                                    {formData.returnTrip && (
                                      <div className="mb-2 pt-2 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                          <span className="text-gray-600">
                                            Return trip (
                                            {vehicle.returnDiscount}% discount)
                                          </span>
                                          <span className="font-medium text-green-600">
                                            {totalReturnPrice.toFixed(2)} €
                                          </span>
                                        </div>

                                        <details className="mt-1">
                                          <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                                            Price details
                                          </summary>
                                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                                            <div className="flex justify-between">
                                              <span>Base ride</span>
                                              <span>
                                                {basePriceOneWay.toFixed(2)} €
                                              </span>
                                            </div>

                                            <div className="flex justify-between">
                                              <span>
                                                Discount{" "}
                                                {vehicle.returnDiscount}%:
                                              </span>
                                              <span className="text-red-500">
                                                -{discountAmount.toFixed(2)} €
                                              </span>
                                            </div>

                                            <div className="flex justify-between font-medium">
                                              <span>After discount</span>
                                              <span>
                                                {discountedBasePrice.toFixed(2)}{" "}
                                                €
                                              </span>
                                            </div>

                                            {extrasPrice > 0 && (
                                              <div className="flex justify-between">
                                                <span>Additional services</span>
                                                <span>
                                                  +{extrasPrice.toFixed(2)} €
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </details>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleTrackedAction({
                                      vehicle,
                                      method: "whatsapp",
                                      href: getWhatsAppLink(vehicle),
                                      totalOneWayPrice,
                                      target: "_blank",
                                    })
                                  }
                                  className="w-full py-2 px-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
                                >
                                  <Image
                                    src="/icon/whatsapp.png"
                                    alt="WhatsApp icon"
                                    width={16}
                                    height={16}
                                  />
                                  Contact via WhatsApp
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleTrackedAction({
                                      vehicle,
                                      method: "email",
                                      href: getEmailLink(vehicle),
                                      totalOneWayPrice,
                                    })
                                  }
                                  className="w-full py-2 px-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <rect
                                      x="2"
                                      y="4"
                                      width="20"
                                      height="16"
                                      rx="2"
                                    ></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                  </svg>
                                  Contact via Email
                                </button>
                              </div>

                              {formData.vehicleType === vehicle.id && (
                                <div className="mt-4 pt-3 border-t border-blue-200 text-center">
                                  <span className="text-sm text-blue-600 font-medium">
                                    Currently Selected
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {vehicleOptions.every(
                    (vehicle) =>
                      parseInt(vehicle.capacity) < formData.passengers,
                  ) && (
                    <div className="text-center py-4 text-red-600 bg-red-50 rounded-lg">
                      <p className="font-medium">
                        No vehicle available for {formData.passengers}{" "}
                        passengers
                      </p>
                      <p className="text-sm mt-1">
                        Please contact us for special arrangements
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-2xl p-6">
              <p className="text-xl font-bold text-gray-800 mb-4">
                What You Need to Know
              </p>

              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Confirmation via WhatsApp within 60 minutes</span>
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Driver contact details sent the day before pickup</span>
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>15 minutes free waiting time included</span>
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Pay by cash or card to the driver</span>
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Available 24/7, 365 days a year</span>
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Up to 10% discount on return trips</span>
                </li>

                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>
                    By booking, you agree to our{" "}
                    <a
                      href="/terms-and-conditions"
                      className="font-semibold text-blue-700 hover:underline"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy-policy"
                      className="font-semibold text-blue-700 hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
