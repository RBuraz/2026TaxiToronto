"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const menuItems = useMemo(
    () => [
      { name: "Taxi", href: "/taxi" },
      { name: "Transfers", href: "/transfers" },
      { name: "One-day trips", href: "/one-day-trips" },
      { name: "Contact", href: "/contact" },
    ],
    []
  );

  

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const whatsappNumber = "+385955086993";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}`;

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close when clicking outside the panel (mobile)
  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Brand */}
            <Link
              href="/"
              className="group flex flex-col leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              <span className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                Taxi & Transfers
              </span>
              <span className="text-sm text-gray-500">
                Best Taxi Service in Split
              </span>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-gray-50 p-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={[
                      "relative rounded-full px-4 py-2 text-sm font-semibold transition",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
                      isActive(item.href)
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-700 hover:text-blue-600 hover:bg-white",
                    ].join(" ")}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "ml-3 inline-flex items-center gap-2 rounded-full",
                  "bg-green-600 text-white px-4 py-2 text-sm font-semibold",
                  "hover:bg-green-700 transition-colors shadow-sm",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600",
                ].join(" ")}
              >
                <Image
                  src="/icon/whatsapp.png"
                  alt="WhatsApp"
                  width={18}
                  height={18}
                  className="h-5 w-5"
                />
                <span className="hidden lg:inline">+385 95 508 6993</span>
                <span className="lg:hidden">WhatsApp</span>
              </a>
            </div>

            {/* Mobile button */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className={[
                "md:hidden inline-flex items-center justify-center",
                "h-11 w-11 rounded-xl border border-gray-200 bg-white",
                "text-gray-800 hover:bg-gray-50 transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
              ].join(" ")}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay + drawer */}
      <div
        className={[
          "md:hidden fixed inset-0 z-50",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        {/* Overlay */}
        <div
          className={[
            "absolute inset-0 bg-black/30 transition-opacity",
            isOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <div
          id="mobile-menu"
          ref={panelRef}
          className={[
            "absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white",
            "shadow-2xl border-l border-gray-100",
            "transition-transform duration-200 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-5 h-20 border-b border-gray-100">
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold text-gray-900">
                Taxi & Transfers
              </span>
              <span className="text-xs text-gray-500">Split • Croatia</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={[
                "inline-flex items-center justify-center h-10 w-10 rounded-xl",
                "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
              ].join(" ")}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-4 py-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={[
                    "flex items-center justify-between rounded-xl px-4 py-3",
                    "text-base font-semibold transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-800 hover:bg-gray-50",
                  ].join(" ")}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <span>{item.name}</span>
                  <span
                    className={[
                      "h-2 w-2 rounded-full",
                      isActive(item.href) ? "bg-blue-600" : "bg-transparent",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className={[
                  "w-full inline-flex items-center justify-center gap-2 rounded-xl",
                  "bg-green-600 text-white px-4 py-3 font-semibold",
                  "hover:bg-green-700 transition-colors shadow-sm",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600",
                ].join(" ")}
              >
                <Image
                  src="/icon/whatsapp.png"
                  alt="WhatsApp"
                  width={18}
                  height={18}
                  className="h-5 w-5"
                />
                <span>+385 95 508 6993</span>
              </a>

              <p className="mt-3 text-xs text-gray-500 px-1">
                Quick booking via WhatsApp • 0–24
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}