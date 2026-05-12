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

export default function EmailButton({
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
      method: "email",
      value,
    });

    window.location.href = href;
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

export default function EmailButton({
  href,
  className,
  children,
}: Props) {
  const handleClick = () => {
    window.location.href = href;
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}