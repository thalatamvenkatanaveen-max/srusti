const Disclaimer = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 text-gray-800">
      <h1 className="mb-8 text-center text-3xl font-bold">📜 Disclaimer</h1>

      <section className="mb-6">
        <p>
          The content, astrology readings, predictions, or guidance provided on
          this website are for spiritual and informational purposes only.
        </p>
      </section>

      <section className="mb-6">
        <p>
          We do not guarantee the accuracy, completeness, or outcomes of any
          astrological or religious services. Results may vary for each
          individual.
        </p>
      </section>

      <section className="mb-6">
        <p>
          Our services are not a substitute for medical, legal, financial, or
          professional advice. Please consult qualified professionals for such
          matters.
        </p>
      </section>

      <section className="mb-6">
        <p>
          By using this website, you agree that you are doing so at your own
          free will and risk.
        </p>
      </section>

      <section className="mb-6">
        <p>
          The website, its owners, and associated Gurujis are not liable for any
          loss, harm, or consequences resulting from the use of our services.
        </p>
      </section>

      <p className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Astrology Website. All rights
        reserved.
      </p>
    </div>
  );
};

export default Disclaimer;
