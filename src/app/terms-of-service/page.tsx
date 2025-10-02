"use client";

import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 sm:px-12 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-4">
          Welcome to <span className="font-semibold">Pncsquare</span>. By using
          our platform, you agree to the following Terms of Service. Please read
          them carefully.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600">
            By accessing or using Pncsquare, you agree to be bound by these
            Terms. If you do not agree, please stop using our services
            immediately.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Eligibility
          </h2>
          <p className="text-gray-600">
            You must be at least 13 years old to use Pncsquare. By using our
            platform, you represent that you meet this requirement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. User Responsibilities
          </h2>
          <p className="text-gray-600">
            You agree not to misuse Pncsquare. This includes posting harmful,
            unlawful, or misleading content, attempting to hack or disrupt
            services, or infringing on intellectual property rights.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Content Ownership
          </h2>
          <p className="text-gray-600">
            All content you upload remains yours, but you grant Pncsquare a
            license to use, display, and distribute it as needed for providing
            our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-600">
            Pncsquare is not liable for any damages, data loss, or issues
            arising from use of the platform. Use at your own risk.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Changes to Terms
          </h2>
          <p className="text-gray-600">
            We may update these Terms from time to time. Continued use of the
            platform means you accept the revised terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Contact Us
          </h2>
          <p className="text-gray-600">
            If you have questions about these Terms, contact us at{" "}
            <Link
              href="mailto:info@pncsquare.in"
              className="text-indigo-600 underline"
            >
              info@pncsquare.in
            </Link>
            .
          </p>
        </section>

        <p className="text-gray-500 text-sm mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}
