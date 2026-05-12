import { CONFIG } from "@/data/config/company";
import Link from "next/link";

export const metadata = {
  title: "Contact | TORONTO Taxi",
  description:
    "Contact TORONTO Taxi passenger transport service in Kaštel Sućurac, Croatia.",
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">

      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <p className="mb-8">
        If you have any questions about our transport services, bookings, or the
        processing of your personal data, you can contact us using the details
        below.
      </p>
      <section className="space-y-3 mb-12">
        <h2 className="text-xl font-semibold">Company Information</h2>

        <p>
          <strong>Business Name:</strong>
          <br />
          TORONTO, obrt za prijevoz putnika i usluge, vl. Tomislav Baričević,
          Kaštel Sućurac, Petrina ulica 10A
        </p>

        <p>
          <strong>Trading Name:</strong>
          <br />
          TORONTO Taxi
        </p>

        <p>
          <strong>Address:</strong>
          <br />
          Petrina ulica 10A
          <br />
          21211 Kaštel Sućurac
          <br />
          Croatia
        </p>

        <p>
          <strong>Phone:</strong>
          <br />
          <a href="tel:+385955086993" className="text-blue-600 underline">
            +385 95 508 6993
          </a>
        </p>

        <p>
          <strong>Email:</strong>
          <br />
          <a
            href={`mailto:${CONFIG.company.email}`}
            className="text-blue-600 underline"
          >
            {CONFIG.company.email}
          </a>
        </p>
      </section>
      <section className="space-y-4 mb-12">
        <h2 className="text-xl font-semibold">Data Protection</h2>

        <p>
          For any requests related to personal data (access, correction,
          deletion, restriction of processing, or complaints), please contact us
          via email. We will respond within the legally prescribed period under
          the General Data Protection Regulation (GDPR).
        </p>
      </section>
      <section className="space-y-3 border-t pt-8">
        <h2 className="text-xl font-semibold">Legal Documents</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link href="/privacy-policy" className="text-blue-600 underline">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/cookie-policy" className="text-blue-600 underline">
              Cookie Policy
            </Link>
          </li>
          <li>
            <Link href="/terms&conditions" className="text-blue-600 underline">
              Terms & Conditions
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
