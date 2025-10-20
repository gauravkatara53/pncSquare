"use client";

import { Footer } from "@/components/common/footer";
import { Mail, Building2, HeadphonesIcon } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with our team for any inquiries or support needs.
              We&apos;re here to help!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Business Enquiries */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <Building2 className="w-8 h-8 text-blue-600 mr-4" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Business Enquiries
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                For partnership opportunities, collaborations, or
                advertising-related queries, please reach out to us at:
              </p>
              <a
                href="mailto:contact@pncsquare.in"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <Mail className="w-5 h-5 mr-2" />
                contact@pncsquare.in
              </a>
            </div>

            {/* Support Enquiries */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <HeadphonesIcon className="w-8 h-8 text-blue-600 mr-4" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Support Enquiries
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                For technical support, feedback, or general assistance, feel
                free to contact our support team at:
              </p>
              <a
                href="mailto:contact@pncsquare.in"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <Mail className="w-5 h-5 mr-2" />
                contact@pncsquare.in
              </a>
            </div>
          </div>

          {/* Additional Contact Information */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Connect With Us
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600 mb-6">
                Our team typically responds within 24-48 hours during business
                days. For immediate assistance, please ensure to include
                relevant details in your email to help us serve you better.
              </p>
              <p className="text-gray-600">
                Visit our{" "}
                <a
                  href="/help-center"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Help Center
                </a>{" "}
                for quick answers to common questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
