/** 
"use client";

import { ClickMethod, trackClick } from "@/lib/trackClick";
import { usePathname } from "next/navigation";

type Props = {
  phone: string;
  vehicle: string;
  company: string;
  driver: string;
  value: number;
  category?: string;
  className?: string;
  children: React.ReactNode;
};

const toDigits = (phone: string) => phone.replace(/\D/g, "");

export default function CallButton({
  phone,
  vehicle,
  company,
  driver,
  value,
  category = "taxi",
  className,
  children,
}: Props) {
  const pathname = usePathname();

  const handleClick = async () => {
    const method: ClickMethod = "call";

    await trackClick({
      category,
      fullPath: pathname,
      vehicle,
      company,
      driver,
      method,
      value,
    });

    window.location.href = `tel:+${toDigits(phone)}`;
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

*/

"use client";

type Props = {
  phone: string;
  vehicle: string;
  company: string;
  driver: string;
  value: number;
  category?: string;
  className?: string;
  children: React.ReactNode;
};

const toDigits = (phone: string) => phone.replace(/\D/g, "");

export default function CallButton({
  phone,
  className,
  children,
}: Props) {
  const handleClick = () => {
    window.location.href = `tel:+${toDigits(phone)}`;
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}