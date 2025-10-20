"use client";

import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 sm:px-12 lg:px-32">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Use</h1>

        <section className="mb-8">
          <p className="text-gray-600 mb-4">
            Please read these terms carefully before using this website.
          </p>
          <p className="text-gray-600">
            By accessing or using{" "}
            <Link
              href="https://pncsquare.in"
              className="text-blue-600 hover:text-blue-800"
            >
              pncsquare.in
            </Link>{" "}
            (&quot;Pncsquare&quot;), you are deemed to have read, understood,
            and accepted these Terms of Use. These terms govern your access to
            and use of this website and its services. Pncsquare reserves the
            right to modify or update these terms at any time without prior
            notice. Continued use of the website following any such changes
            constitutes your acceptance of the revised Terms of Use.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Usage and Content Ownership
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              All content, data, graphics, and other materials available on{" "}
              <Link
                href="https://pncsquare.in"
                className="text-blue-600 hover:text-blue-800"
              >
                pncsquare.in
              </Link>{" "}
              are the exclusive property of Pncsquare.in ,
              except for publicly available information under the fair usage
              policy.
            </p>
            <p>
              The content on this website is intended solely for personal use
              and may not be reproduced, distributed, or commercially exploited
              without prior written consent from Pncsquare. Proper credit,
              including a link to the original source, must be provided for any
              permitted usage.
            </p>
            <p>
              The Pncsquare trademark or branding cannot be used for commercial
              or non-commercial purposes without express permission. Any content
              downloaded from the site does not transfer ownership or rights for
              commercial use.
            </p>
            <p>
              Data mining, scraping, crawling, or republishing of our data is
              strictly prohibited unless explicitly authorized by Pncsquare in
              writing.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Payment Terms for Paid Services
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Before any payment is made, all applicable charges for paid
              products or services—such as memberships, counseling plans, or
              premium content—will be clearly displayed to the user. Unless
              stated otherwise, payment must be completed in full prior to
              accessing any paid services.
            </p>
            <p>
              Users are responsible for evaluating the suitability and relevance
              of any product or service purchased through Pncsquare. In case of
              suspension or termination of access due to a breach of these Terms
              of Use, any payment made shall be forfeited with immediate effect.
            </p>
            <p>
              Payments may be processed through third-party providers integrated
              into the platform. Pncsquare does not store any sensitive payment
              information such as credit/debit card or bank details. By making a
              payment, you agree to be bound by the terms and conditions of the
              chosen payment provider.
            </p>
            <p>
              Failure to complete payment may result in the immediate suspension
              or cancellation of access to products or services. Transactions
              may be subject to exchange fees or regional payment restrictions,
              depending on the method and location. All applicable taxes will be
              calculated based on billing details provided at the time of
              purchase.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Refund and Cancellation Policy
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              All payments made for services or products on Pncsquare are{" "}
              <strong>non-refundable and non-transferable</strong> under any
              circumstances.
            </p>
            <p>
              Our support team is available to assist you with any
              service-related queries or technical concerns. For assistance,
              please contact us at{" "}
              <Link
                href="mailto:contact@pncsquare.in"
                className="text-blue-600 hover:text-blue-800"
              >
                contact@pncsquare.in
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Indemnification and Warranties
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Pncsquare shall not be liable for any direct, indirect,
              incidental, or consequential damages arising out of the use,
              inability to use, or reliance on any content, service, or
              information provided on the website. This includes but is not
              limited to damages for data loss, business interruptions, or lost
              profits.
            </p>
            <p>
              You agree to indemnify and hold Pncsquare, its officers,
              employees, and affiliates harmless against any claims, damages, or
              expenses (including reasonable legal fees) resulting from your
              misuse of the website&apos;s content or services.
            </p>
            <p>
              While Pncsquare strives to ensure the accuracy and reliability of
              its content, it provides all information on an &quot;as is&quot;
              basis without warranties of any kind—express or implied—including
              those of merchantability, fitness for a specific purpose, and
              non-infringement.
            </p>
            <div className="pl-6 space-y-2">
              <p>Pncsquare makes no guarantees that:</p>
              <ul className="list-disc pl-6">
                <li>the site will meet your requirements,</li>
                <li>the site will operate uninterrupted or error-free, or</li>
                <li>
                  the results obtained from site usage will be accurate or
                  dependable.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            General Disclaimer
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              While every effort is made to maintain accuracy, the website may
              contain technical or typographical errors. Pncsquare reserves the
              right to update, correct, or modify the website, its content, or
              functionality at any time without prior notice.
            </p>
            <p>
              All information is provided in good faith and based on the latest
              available sources. However, Pncsquare disclaims all implied
              warranties, including those of merchantability and fitness for
              specific purposes. Under no circumstances shall Pncsquare or its
              licensors be held liable for any damages, whether direct or
              consequential, arising from the use or performance of the website
              or its content.
            </p>
          </div>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            For questions or further information, please contact us at{" "}
            <Link
              href="mailto:contact@pncsquare.in"
              className="text-blue-600 hover:text-blue-800"
            >
              contact@pncsquare.in
            </Link>
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}
