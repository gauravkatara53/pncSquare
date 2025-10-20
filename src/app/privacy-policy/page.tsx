"use client";

import { Footer } from "@/components/common/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center ">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last updated: October 15, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-12">
              <p className="text-gray-700">
                At pncsquare.in, the privacy and protection of our users&apos;
                data is of utmost importance to us. This Privacy Policy explains
                what type of information we collect, how we use it, and the
                measures we take to ensure that your personal information
                remains secure.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Log Files
              </h2>
              <p className="text-gray-700 mb-6">
                Like most websites, pncsquare.in uses log files as part of
                standard internet analytics. The information collected may
                include Internet Protocol (IP) addresses, browser type, Internet
                Service Provider (ISP), date and time stamp, referring/exit
                pages, and the number of clicks. This data helps us understand
                user trends, administer the website, track user navigation, and
                gather demographic insights. None of this information is linked
                to personally identifiable details.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Cookies and Web Beacons
              </h2>
              <p className="text-gray-700 mb-6">
                pncsquare.in uses cookies to store visitor preferences and
                record information about pages visited. This allows us to
                personalize web content and improve user experience based on
                browser type or other data sent through the browser.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Advertising Cookies
              </h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>
                  Google, as a third-party vendor, uses cookies to serve ads on
                  pncsquare.in.
                </li>
                <li>
                  Google&apos;s use of the DART cookie enables it to display ads
                  to users based on their visits to pncsquare.in and other
                  websites on the Internet.
                </li>
                <li>
                  Users may opt out of the use of the DART cookie by visiting{" "}
                  <a
                    href="https://www.google.com/privacy_ads.html"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Google&apos;s Advertising Privacy Policy
                  </a>
                  .
                </li>
              </ul>
              <p className="text-gray-700 mb-6">
                Our advertising partners, including Google AdSense, may use
                cookies and web beacons on our site. These technologies
                automatically transmit your IP address for ad delivery and
                monitoring purposes. Third-party ad networks may also use
                cookies or JavaScript to measure advertisement effectiveness and
                personalize content.
              </p>
              <p className="text-gray-700 mb-6">
                Pncsquare has no control or access over these third-party
                cookies. For more detailed information on their practices and
                how to opt out, please refer to the specific privacy policies of
                these third-party advertising partners.
              </p>
              <p className="text-gray-700 mb-6">
                To understand how Google uses your data, please visit{" "}
                <a
                  href="https://www.google.com/policies/privacy/partners/"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Cookie Management
              </h2>
              <p className="text-gray-700 mb-6">
                You can choose to disable cookies through your browser settings.
                More detailed instructions on cookie management can be found on
                your browser&apos;s official support page.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Your Consent
              </h2>
              <p className="text-gray-700 mb-6">
                By using our website, you consent to our Privacy Policy and
                agree to its terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Changes to This Policy
              </h2>
              <p className="text-gray-700 mb-6">
                Any future updates or changes to our Privacy Policy will be
                posted on this page. We encourage you to check this page
                periodically to stay informed.
              </p>
            </section>

            <section className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Contacting Us
              </h2>
              <p className="text-gray-700 mb-6">
                If you have any questions, concerns, or feedback regarding this
                Privacy Policy, please reach out to us using the details below:
              </p>
              <div className="text-gray-700">
                <p className="mb-2">
                  <a
                    href="https://pncsquare.in/contact"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    https://pncsquare.in/contact
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:contact@pncsquare.in"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    contact@pncsquare.in
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
