
/**
"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { waLink } from "../../../phone";
import { trackClick } from "@/lib/trackClick";

type Props = {
  phone: string;
  vehicleName: string;
  vehicle: string;
  company: string;
  driver: string;
  value: number;
  category?: string;
};

export default function WhatsAppLocationButton({
  phone,
  vehicleName,
  vehicle,
  company,
  driver,
  value,
  category = "taxi",
}: Props) {
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const messageBase = useMemo(() => {
    return `🚖 *IMMEDIATE PICKUP REQUEST*\n\n*VEHICLE:*\n• ${vehicleName}\n\n`;
  }, [vehicleName]);

  const getLocation = async (): Promise<GeolocationPosition> => {
    if (!navigator.geolocation) throw new Error("Geolocation not supported.");

    const maxAttempts = 2;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      if (pos.coords.accuracy <= 150 || attempt === maxAttempts) return pos;
    }

    throw new Error("Could not get location.");
  };

  const handleClick = async () => {
    setStatus("loading");
    setError("");

    try {
      await trackClick({
        category,
        fullPath: pathname,
        vehicle,
        company,
        driver,
        method: "whatsapp_location",
        value,
      });

      const pos = await getLocation();
      const { latitude, longitude } = pos.coords;

      const maps = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const text =
        messageBase +
        `📍 *MY CURRENT LOCATION:*\n• ${maps}\n\nPlease confirm you can pick me up here.`;

      window.open(waLink(phone, text), "_blank", "noopener,noreferrer");
      setStatus("idle");
    } catch (e: any) {
      setStatus("error");

      const msg =
        e?.code === 1
          ? "Location denied. Enable location permission in browser."
          : e?.code === 2
          ? "Location unavailable. Try again."
          : e?.code === 3
          ? "Location timeout. Try again."
          : "Could not get your location. You can share it manually.";

      setError(msg);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        disabled={status === "loading"}
        className={[
          "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold",
          "bg-green-600 text-white hover:bg-green-700 transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600",
          status === "loading" ? "opacity-60 cursor-not-allowed" : "",
        ].join(" ")}
      >
        {status === "loading" ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Getting location...
          </>
        ) : (
          <>
            <Image
              src="/icon/whatsapp.png"
              alt="WhatsApp"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            WhatsApp + Location
          </>
        )}
      </button>

      {status === "error" && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-700">{error}</p>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-blue-700 underline"
          >
            Open Google Maps and share location manually
          </a>
        </div>
      )}
    </div>
  );
}

 */

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { waLink } from "@/lib/phone";

type Props = {
  phone: string;
  vehicleName: string;
  vehicle: string;
  company: string;
  driver: string;
  value: number;
  category?: string;
};

export default function WhatsAppLocationButton({
  phone,
  vehicleName,
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const messageBase = useMemo(() => {
    return `🚖 *IMMEDIATE PICKUP REQUEST*\n\n*VEHICLE:*\n• ${vehicleName}\n\n`;
  }, [vehicleName]);

  const getLocation = async (): Promise<GeolocationPosition> => {
    if (!navigator.geolocation) throw new Error("Geolocation not supported.");

    const maxAttempts = 2;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      if (pos.coords.accuracy <= 150 || attempt === maxAttempts) return pos;
    }

    throw new Error("Could not get location.");
  };

  const handleClick = async () => {
    setStatus("loading");
    setError("");

    try {
      const pos = await getLocation();
      const { latitude, longitude } = pos.coords;

      const maps = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const text =
        messageBase +
        `📍 *MY CURRENT LOCATION:*\n• ${maps}\n\nPlease confirm you can pick me up here.`;

      window.open(waLink(phone, text), "_blank", "noopener,noreferrer");
      setStatus("idle");
    } catch (e: any) {
      setStatus("error");

      const msg =
        e?.code === 1
          ? "Location denied. Enable location permission in browser."
          : e?.code === 2
          ? "Location unavailable. Try again."
          : e?.code === 3
          ? "Location timeout. Try again."
          : "Could not get your location. You can share it manually.";

      setError(msg);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        disabled={status === "loading"}
        className={[
          "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold",
          "bg-green-600 text-white hover:bg-green-700 transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600",
          status === "loading" ? "opacity-60 cursor-not-allowed" : "",
        ].join(" ")}
      >
        {status === "loading" ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Getting location...
          </>
        ) : (
          <>
            <Image
              src="/icon/whatsapp.png"
              alt="WhatsApp"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            WhatsApp + Location
          </>
        )}
      </button>

      {status === "error" && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-700">{error}</p>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-blue-700 underline"
          >
            Open Google Maps and share location manually
          </a>
        </div>
      )}
    </div>
  );
}