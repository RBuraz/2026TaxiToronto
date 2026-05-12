// lib/phone.ts
export const toE164Digits = (phone: string) => phone.replace(/\D/g, ""); // only digits

export const formatPhoneHR = (phone: string) => {
  const d = toE164Digits(phone); // e.g. 385955690132
  const parts = [
    d.slice(0, 3),
    d.slice(3, 5),
    d.slice(5, 8),
    d.slice(8, 10),
    d.slice(10, 12),
  ];
  return parts.filter(Boolean).join(" ");
};

export const waLink = (phone: string, text?: string) => {
  const digits = toE164Digits(phone);
  const base = `https://wa.me/${digits}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
};
