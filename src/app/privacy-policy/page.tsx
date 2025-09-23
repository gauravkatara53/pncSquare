"use client";

import { Footer } from "@/components/common/footer";
import {
  Shield,
  Eye,
  Lock,
  Database,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";
import { useState } from "react";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<string>("");
  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name, email address, and phone number when you register",
            "Educational background and academic preferences",
            "Profile information you choose to share",
            "Communication preferences and settings",
          ],
        },
        {
          subtitle: "Usage Information",
          items: [
            "Pages visited and time spent on our platform",
            "Search queries and filter preferences",
            "Device information and browser type",
            "IP address and general location data",
          ],
        },
        {
          subtitle: "College Information",
          items: [
            "College reviews and ratings you submit",
            "Questions posted on college forums",
            "Saved colleges and comparison lists",
            "Application tracking and status updates",
          ],
        },
      ],
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Platform Services",
          items: [
            "Provide personalized college recommendations",
            "Send relevant updates about colleges and admissions",
            "Facilitate communication between students and institutions",
            "Improve our search and recommendation algorithms",
          ],
        },
        {
          subtitle: "Communication",
          items: [
            "Send important account and service notifications",
            "Share educational content and admission updates",
            "Respond to your inquiries and support requests",
            "Provide updates about new platform features",
          ],
        },
        {
          subtitle: "Platform Improvement",
          items: [
            "Analyze usage patterns to enhance user experience",
            "Conduct research to improve our services",
            "Ensure platform security and prevent fraud",
            "Develop new features and functionalities",
          ],
        },
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Shield,
      content: [
        {
          subtitle: "With Colleges and Universities",
          items: [
            "Basic profile information when you express interest",
            "Application materials you choose to submit",
            "Academic qualifications for admission consideration",
            "Contact details for direct communication (with your consent)",
          ],
        },
        {
          subtitle: "With Service Providers",
          items: [
            "Technical service providers for platform maintenance",
            "Email service providers for communication",
            "Analytics providers for usage insights",
            "Payment processors for transaction handling",
          ],
        },
        {
          subtitle: "Legal Requirements",
          items: [
            "When required by law or legal process",
            "To protect our rights and prevent fraud",
            "To ensure platform safety and security",
            "In case of business transfers or mergers",
          ],
        },
      ],
    },
  ];

  const rights = [
    {
      title: "Access Your Data",
      description:
        "Request a copy of all personal information we have about you",
      icon: Eye,
    },
    {
      title: "Update Information",
      description: "Correct or update any inaccurate personal information",
      icon: CheckCircle,
    },
    {
      title: "Delete Data",
      description:
        "Request deletion of your personal information (subject to legal requirements)",
      icon: AlertCircle,
    },
    {
      title: "Data Portability",
      description: "Receive your data in a structured, machine-readable format",
      icon: Database,
    },
  ];

  const tableOfContents = [
    {
      id: "information-collection",
      title: "1. Information We Collect",
      icon: Database,
    },
    {
      id: "information-use",
      title: "2. How We Use Your Information",
      icon: Eye,
    },
    {
      id: "information-sharing",
      title: "3. Information Sharing",
      icon: Shield,
    },
    { id: "data-security", title: "4. Data Security", icon: Lock },
    { id: "your-rights", title: "5. Your Privacy Rights", icon: Settings },
    { id: "contact", title: "6. Contact Information", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button className="text-blue-600 hover:text-blue-700 transition-colors">
              Home
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last updated: December 15, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Quick Navigation
              </h2>
              <nav className="space-y-2">
                {tableOfContents.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-blue-50 ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600"
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="lg:w-2/3">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Our Commitment to Privacy
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Pncsquare, we are committed to protecting your privacy and
                  ensuring the security of your personal information. This
                  Privacy Policy describes how we collect, use, disclose, and
                  safeguard your information when you use our website and
                  services.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  By using our platform, you agree to the collection and use of
                  information in accordance with this policy. We will not use or
                  share your information with anyone except as described in this
                  Privacy Policy.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Calendar className="w-4 h-4" />
                  <span>Last updated: December 15, 2024 • Version 2.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                id={section.id}
                className="bg-white rounded-xl p-8 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">
                        {subsection.subtitle}
                      </h3>
                      <ul className="space-y-2">
                        {subsection.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Security */}
      <div id="data-security" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  4. Data Security
                </h2>
                <p className="text-green-600 text-sm">
                  How we protect your information
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              We implement industry-standard security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. Our security practices include:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">
                    SSL encryption for data transmission
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">
                    Secure data storage and backup systems
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">
                    Regular security audits and assessments
                  </span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">
                    Access controls and user authentication
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">
                    Employee training on data protection
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">
                    Incident response and monitoring systems
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">
                  Security Certifications
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                ISO 27001 Certified • SOC 2 Type II Compliant • GDPR Ready
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Rights */}
      <div id="your-rights" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              5. Your Privacy Rights
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              You have several rights regarding your personal information.
              Contact us to exercise any of these rights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {rights.map((right, index) => {
              const Icon = right.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {right.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{right.description}</p>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                        Request Now →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
