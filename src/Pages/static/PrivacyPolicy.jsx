const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 text-gray-800">
      <h1 className="mb-8 text-center text-3xl font-bold">🔒 Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Information We Collect</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Personal details (name, phone, email, date of birth) provided during
            registration or booking.
          </li>
          <li>
            Payment details (processed securely via third-party gateways like
            Razorpay).
          </li>
          <li>
            Non-personal info such as browser type, device, and usage logs.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          How We Use Your Information
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>To confirm astrology appointments and puja bookings.</li>
          <li>
            To send updates, reminders, and spiritual content (with consent).
          </li>
          <li>To process payments and maintain records.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Data Protection</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>We do not sell, rent, or trade your personal data.</li>
          <li>
            Data is shared only with authorized Gurujis or staff for service
            fulfillment.
          </li>
          <li>Payments are processed securely through encrypted gateways.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Cookies & Tracking</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Our website may use cookies to improve user experience.</li>
          <li>You may disable cookies in your browser settings.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">User Rights</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            You may request correction or deletion of your personal data by
            contacting us.
          </li>
          <li>You may opt-out of promotional emails anytime.</li>
        </ul>
      </section>

      <p className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Astrology Website. All rights
        reserved.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
