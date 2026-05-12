import { CONFIG } from "@/data/config/company";
import Link from "next/link";

export const metadata = {
  title: `Cookie Policy | ${CONFIG.company.companyShortName}`,
  description: `Cookie Policy for ${CONFIG.company.companyShortName} website.`,
};

function formatBusinessName(fullName: string, shortName: string) {
  // Ako želiš, možeš prikazati samo shortName ili oba.
  return `${shortName} (${fullName})`;
}

export default function CookiePolicyPage() {
  const companyName = formatBusinessName(
    CONFIG.company.FullName,
    CONFIG.company.companyShortName,
  );

  const fullAddress = `${CONFIG.company.adress}, ${CONFIG.company.postalCode} ${CONFIG.company.city}, ${CONFIG.company.country}`;

  const websiteUrl = CONFIG.url;

  // tel: link treba bez razmaka
  const telHref = `tel:${CONFIG.company.phone.replace(/\s+/g, "")}`;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800 space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Cookie Policy</h1>
        <p>
          This Cookie Policy explains how {companyName} ("we", "us", "our") uses
          cookies and similar technologies on the website{" "}
          <a
            className="text-blue-600 underline"
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {websiteUrl}
          </a>{" "}
          (the "Website").
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. What are cookies?</h2>
        <p>
          Cookies are small text files stored on your device (computer, tablet
          or mobile phone) when you visit a website. Cookies can be used to
          enable core site functionality, improve user experience, measure
          traffic, or support advertising.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Cookies we set</h2>
        <p>
          We do not set cookies ourselves and we do not use analytics, marketing
          or profiling cookies on the Website.
        </p>
        <p>
          The Website is designed to function without requiring cookie consent
          banners or cookie preference tools.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Advertising</h2>
        <p>
          We may run advertising campaigns that direct users to the Website (for
          example via ad platforms such as Google). The Website itself does not
          load advertising tags by default and does not include advertising
          scripts in the Website&apos;s <code>&lt;head&gt;</code>.
        </p>
        <p>
          Any advertising measurement (such as click or impression reporting) is
          handled by the advertising platforms in their own environments and is
          governed by their policies and documentation.
        </p>
        <p>
          We do not control whether third parties set cookies in their own
          contexts (for example, within their services, apps, or on their
          domains). For details, please consult the relevant provider&apos;s
          documentation (e.g., Google).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Managing cookies</h2>
        <p>
          You can manage and delete cookies through your browser settings.
          Please note that restricting cookies may affect certain Website
          features.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Contact</h2>
        <p>
          If you have questions about this Cookie Policy or personal data
          protection, contact:
        </p>
        <div className="space-y-1">
          <p className="font-semibold">{companyName}</p>
          <p>{fullAddress}</p>
          <p>
            Phone:{" "}
            <a className="text-blue-600 underline" href={telHref}>
              {CONFIG.company.phone}
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              className="text-blue-600 underline"
              href={`mailto:${CONFIG.company.email}`}
            >
              {CONFIG.company.email}
            </a>
          </p>
        </div>
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="text-xl font-semibold">6. Related documents</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <Link href="/privacy-policy" className="text-blue-600 underline">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-blue-600 underline">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/terms&conditions" className="text-blue-600 underline">
              Terms & Conditions
            </Link>
          </li>
        </ul>
      </section>

      <p className="text-sm text-gray-500 pt-4">Last updated: March 2026</p>
    </main>
  );
}
