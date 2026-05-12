import { CONFIG } from "@/data/config/company";
import Link from "next/link";

export const metadata = {
  title: `Privacy Policy | ${CONFIG.company.companyShortName}`,
  description: `Privacy Policy for ${CONFIG.company.companyShortName}`,
};

export default function PrivacyPolicyPage() {
  const c = CONFIG.company;

  const companyName = `${c.companyShortName} (${c.FullName})`;
  const address = `${c.adress}, ${c.postalCode} ${c.city}, ${c.country}`;
  const telHref = `tel:${c.phone.replace(/\s+/g, "")}`;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800 space-y-8">
      {" "}
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p>
        This Privacy Policy explains how {companyName} ("we", "us", "our")
        processes personal data when you contact us or use our passenger
        transport, transfer, or private tour services via the website{" "}
        <a href={CONFIG.url} className="text-blue-600 underline">
          {CONFIG.url}
        </a>
        .
      </p>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Data Controller</h2>
        <p>
          <strong>Business name:</strong> {c.FullName}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a className="text-blue-600 underline" href={telHref}>
            {c.phone}
          </a>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a className="text-blue-600 underline" href={`mailto:${c.email}`}>
            {c.email}
          </a>
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          2. What Personal Data We Collect
        </h2>
        <p>
          We do not collect personal data automatically through the website.
          Personal data is provided directly by you when you contact us by
          phone, SMS, WhatsApp, or email to request a ride, transfer, or private
          tour.
        </p>

        <p>Depending on your request, we may process:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>name (if provided)</li>
          <li>telephone number</li>
          <li>pickup location</li>
          <li>destination</li>
          <li>date and time of transport</li>
          <li>number of passengers</li>
          <li>additional information necessary to provide the service</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Purpose and Legal Basis</h2>
        <p>
          Personal data is processed solely for the purpose of organizing and
          providing the requested transport service.
        </p>

        <p>
          The legal basis for processing is{" "}
          <strong>
            performance of a contract or taking steps prior to entering into a
            contract
          </strong>{" "}
          (Article 6(1)(b) GDPR).
        </p>

        <p>
          We do not use your personal data for marketing and we do not create
          customer databases for advertising purposes.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. Sharing of Data</h2>
        <p>
          If we are unavailable to perform the requested service, your contact
          details and necessary ride information may be shared with trusted
          partner drivers solely for the purpose of completing the requested
          transport.
        </p>

        <p>
          These partners are independent transport providers and may act as
          separate data controllers. They are expected to handle personal data
          only for providing the agreed ride and not for marketing or other
          unrelated purposes.
        </p>

        <p>
          We do not sell, rent, or otherwise distribute personal data to third
          parties.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Communication Services</h2>
        <p>
          Communication may take place via telephone networks, SMS, email, or
          messaging applications such as WhatsApp. These services are provided
          by third-party providers and may transfer data outside the European
          Economic Area in accordance with their own privacy policies and
          applicable legal safeguards.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6. Data Retention</h2>
        <p>
          Personal data is kept only for as long as necessary to complete the
          requested service and handle potential follow-up communication related
          to the ride.
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>ride communication: up to 6 months</li>
          <li>
            accounting records (if an invoice is issued): according to legal
            obligations
          </li>
        </ul>

        <p>After this period, data is deleted or no longer actively used.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>access your personal data</li>
          <li>request correction</li>
          <li>request deletion</li>
          <li>restrict processing</li>
          <li>object to processing</li>
          <li>lodge a complaint with a data protection authority</li>
        </ul>

        <p>
          To exercise your rights, contact us at{" "}
          <a className="text-blue-600 underline" href={`mailto:${c.email}`}>
            {c.email}
          </a>
          .
        </p>
      </section>
      <section className="space-y-3 border-t pt-6">
        <h2 className="text-xl font-semibold">8. Related Pages</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <Link className="text-blue-600 underline" href="/cookie-policy">
              Cookie Policy
            </Link>
          </li>
          <li>
            <Link className="text-blue-600 underline" href="/contact">
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
