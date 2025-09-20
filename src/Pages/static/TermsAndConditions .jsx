const TermsAndConditions = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 text-gray-800">
      <h1 className="mb-8 text-center text-3xl font-bold">
        📑 Terms & Conditions
      </h1>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By using this website, you agree to abide by these Terms and
          Conditions. If you do not agree, please do not use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">2. Services Offered</h2>
        <p>
          Astrology consultations, puja bookings, and related spiritual services
          are provided subject to availability of Gurujis. We reserve the right
          to accept, decline, or reschedule bookings.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">3. Payments & Refunds</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            All bookings must be paid in advance via secure payment gateway.
          </li>
          <li>
            Once a puja/consultation is performed or scheduled, fees are
            non-refundable, except in cases where the service cannot be
            delivered due to technical issues or unavailability of Gurujis.
          </li>
          <li>
            Any refund (if applicable) will be processed within 7–10 business
            days.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">4. User Responsibilities</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Users must provide accurate information for astrology readings and
            bookings.
          </li>
          <li>
            Users must not misuse the website or attempt to disrupt services.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          5. Limitation of Liability
        </h2>
        <p>
          We are not responsible for any direct, indirect, or incidental damages
          arising from use of our website or services. Astrology and puja
          services are faith-based practices; results cannot be guaranteed.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">6. Changes to Terms</h2>
        <p>
          We may update these Terms & Conditions anytime. Continued use of the
          website means you accept the changes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">7. Governing Law</h2>
        <p>
          These terms are governed by the laws of India, and any disputes will
          be subject to the jurisdiction of courts in Hyderabad, Telangana.
        </p>
      </section>

      <p className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Astrology Website. All rights
        reserved.
      </p>
    </div>
  );
};

export default TermsAndConditions;
