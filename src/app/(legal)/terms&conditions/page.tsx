import { CONFIG } from "@/data/config/company";

export const metadata = {
  title: `Terms and Conditions | ${CONFIG.company.companyShortName}`,
  description: `Terms and conditions of passenger transport services provided by ${CONFIG.company.companyShortName}`,
};

export default function TermsPage() {
  const c = CONFIG.company;
  const companyName = `${c.companyShortName} (${c.FullName})`;
  const address = `${c.adress}, ${c.postalCode} ${c.city}, ${c.country}`;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800 space-y-8">
      {" "}
      <h1 className="text-3xl font-bold">Terms and Conditions</h1>

      <p>
        These Terms and Conditions regulate the use of passenger transport
        services provided by {companyName}, located at {address}. By booking or
        using our services, the passenger confirms that they have read and
        accepted these terms.
      </p>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Services</h2>
        <p>We provide the following services:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>local taxi transport</li>
          <li>airport and long-distance transfers</li>
          <li>private one-day trips and sightseeing transport</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Taxi Service and Pricing</h2>
        <p>
          Taxi rides are charged according to the official taxi tariff available
          in the vehicle. The final price is determined exclusively by the
          taximeter at the end of the ride.
        </p>

        <p>
          Upon request, the driver may provide an estimated price. This estimate
          is informative only and may differ from the final taximeter price due
          to traffic, route changes, waiting time, or other circumstances.
        </p>

        <p>
          The passenger agrees to pay the taximeter amount shown at the end of
          the ride.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3. Transfers</h2>
        <p>
          Transfer prices shown on the website or transfer calculator refer only
          to the transportation service itself.
        </p>

        <p>
          Additional costs are not included in the base price, including but not
          limited to:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>toll roads</li>
          <li>ferry tickets</li>
          <li>tunnel fees</li>
          <li>parking fees</li>
          <li>waiting time or special requests</li>
        </ul>

        <p>
          The passenger will be informed of any known additional costs before
          the start of the transfer and is responsible for covering them.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4. One-Day Trips</h2>
        <p>
          The price of one-day trips includes transportation to and from the
          agreed destination only.
        </p>

        <p>The following are not included in the trip price:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>entrance tickets</li>
          <li>food and drinks</li>
          <li>ferry tickets</li>
          <li>tolls and parking</li>
          <li>guide services</li>
          <li>any personal expenses</li>
        </ul>

        <p>
          Passengers will be informed about any foreseeable additional costs.
          Unforeseeable external costs (e.g., changes in prices by third
          parties) are outside our control.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Passenger Conduct</h2>
        <p>
          Passengers must behave respectfully and follow driver safety
          instructions. Seat belts must be worn where required by law.
        </p>

        <p>
          We reserve the right to refuse or terminate the ride if a passenger:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>behaves aggressively or inappropriately</li>
          <li>is under severe influence of alcohol or drugs</li>
          <li>endangers the driver, vehicle, or other passengers</li>
          <li>causes damage to the vehicle</li>
        </ul>

        <p>
          The driver may refuse service when necessary for safety, legal
          compliance, or operational reasons.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">
          6. Images and Vehicle Representation
        </h2>
        <p>
          Images displayed on the website are for illustrative purposes only.
          Vehicles shown in photographs may not be the exact vehicle used for
          transport but represent the service category and comfort level.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7. Payment Methods</h2>
        <p>We accept the following payment methods:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>cash</li>
          <li>credit/debit card (if available in vehicle)</li>
          <li>bank transfer</li>
        </ul>

        <p>
          Bank transfer payments are possible only to the official business
          account (IBAN) provided by us upon request.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">8. Liability</h2>
        <p>
          We are not liable for delays caused by traffic conditions, road works,
          accidents, weather, ferry schedules, border controls, or other events
          beyond our reasonable control.
        </p>
      </section>
      <p className="text-sm text-gray-500 pt-4">Last updated: March 2026</p>
    </main>
  );
}
