/** 
"use client";


import { usePathname } from "next/navigation";
import { trackClick } from "@/lib/trackClick";

type Props = {
  href: string;
  vehicle: string;
  company: string;
  driver: string;
  value: number;
  category?: string;
  className?: string;
  children: React.ReactNode;
};

export default function WhatsAppButton({
  href,
  vehicle,
  company,
  driver,
  value,
  category = "one_day_trip",
  className,
  children,
}: Props) {
  const pathname = usePathname();

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

    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
  */

"use client";

import type { ReactNode } from "react";

type Props = {
  href: string;
  vehicle: string;
  company: string;
  driver: string;
  value: number;
  category?: string;
  className?: string;
  children: ReactNode;
};

export default function WhatsAppButton({
  href,
  className,
  children,
}: Props) {
  const handleClick = () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}