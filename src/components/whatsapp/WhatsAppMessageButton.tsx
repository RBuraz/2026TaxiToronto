
/**
"use client";

import { useMemo } from "react";
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
  children?: React.ReactNode;
};

export default function WhatsAppMessageButton({
  phone,
  vehicleName,
  vehicle,
  company,
  driver,
  value,
  category = "taxi",
  children,
}: Props) {
  const pathname = usePathname();

  const message = useMemo(() => {
    return `🚖 *TAXI REQUEST*

*VEHICLE:*
• ${vehicleName}

*WHEN & WHERE:*
• example: as soon as possible, Matice hrvatska 1
• or: today 18:30, Matice hrvatska 1`;
  }, [vehicleName]);

  const handleClick = async () => {
    await trackClick({
      category,
      fullPath: pathname,
      vehicle,
      company,
      driver,
      method: "whatsapp",
      value,
    });

    window.open(waLink(phone, message), "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 transition"
    >
      <Image
        src="/icon/whatsapp.png"
        alt="WhatsApp"
        width={20}
        height={20}
        className="h-5 w-5"
      />
      {children ?? "WhatsApp"}
    </button>
  );
}

 */



"use client";

import { useMemo } from "react";
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
  children?: React.ReactNode;
};

export default function WhatsAppMessageButton({
  phone,
  vehicleName,
  children,
}: Props) {
  const message = useMemo(() => {
    return `🚖 *TAXI REQUEST*

*VEHICLE:*
• ${vehicleName}

*WHEN & WHERE:*
• example: as soon as possible, Matice hrvatska 1
• or: today 18:30, Matice hrvatska 1`;
  }, [vehicleName]);

  const handleClick = () => {
    window.open(waLink(phone, message), "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 transition"
    >
      <Image
        src="/icon/whatsapp.png"
        alt="WhatsApp"
        width={20}
        height={20}
        className="h-5 w-5"
      />
      {children ?? "WhatsApp"}
    </button>
  );
}