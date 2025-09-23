"use client";

import React from "react";
import {
  FileText,
  AlertTriangle,
  Scale,
  Shield,
  Users,
  Gavel,
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>("");
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: FileText,
      content: `By accessing and using CollegePravesh, you accept and agree to be bound by these Terms of Service. 
      If you do not agree to these terms, please do not use our platform. These terms apply to all visitors, 
      users, and others who access or use our service.`,
    },
    {
      id: "platform-use",
      title: "Platform Use",
      icon: Users,
      content: `CollegePravesh is an educational information platform designed to help students find and 
      evaluate colleges and universities. You may use our platform for lawful purposes only and in accordance 
      with these Terms. You are responsible for your use of the platform and for any content you provide.`,
    },
    {
      id: "user-accounts",
      title: "User Accounts",
      icon: Shield,
      content: `To access certain features, you may need to create an account. You are responsible for 
      maintaining the security of your account and password. You agree to provide accurate, current, and 
      complete information during registration and to update such information as necessary.`,
    },
    {
      id: "content-guidelines",
      title: "Content Guidelines",
      icon: Scale,
      content: `Users may submit reviews, ratings, and other content. All content must be honest, accurate, 
      and respectful. You retain ownership of your content but grant us a license to use it on our platform. 
      We reserve the right to remove content that violates our guidelines.`,
    },
    {
      id: "prohibited-activities",
      title: "Prohibited Activities",
      icon: AlertTriangle,
      content: `You may not use our platform for illegal purposes, spam, harassment, or any activity that 
      could harm our service or other users. This includes submitting false reviews, attempting to manipulate 
      rankings, or violating the intellectual property rights of others.`,
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: Gavel,
      content: `CollegePravesh provides information for educational purposes. We do not guarantee admission 
      to any institution or the accuracy of all information. Our liability is limited to the maximum extent 
      permitted by law. Users are responsible for verifying information independently.`,
    },
  ];

  const guidelines = [
    {
      category: "Reviews and Ratings",
      rules: [
        "Base reviews on personal experience only",
        "Provide honest and constructive feedback",
        "Avoid profanity, hate speech, or discriminatory language",
        "Do not include personal information of others",
        "One review per college per user account",
      ],
    },
    {
      category: "Forum Participation",
      rules: [
        "Stay on topic and be respectful to other users",
        "Do not share false or misleading information",
        "Respect privacy and confidentiality",
        "No spam, advertising, or self-promotion",
        "Report inappropriate content to moderators",
      ],
    },
    {
      category: "Data Usage",
      rules: [
        "Do not scrape or extract data automatically",
        "Personal use only - no commercial redistribution",
        "Respect copyright and intellectual property",
        "Do not attempt to reverse engineer our platform",
        "Follow our API terms if using developer features",
      ],
    },
  ];

  const tableOfContents = [
    { id: "acceptance", title: "1. Acceptance of Terms", icon: FileText },
    { id: "platform-use", title: "2. Platform Use", icon: Users },
    { id: "user-accounts", title: "3. User Accounts", icon: Shield },
    { id: "content-guidelines", title: "4. Content Guidelines", icon: Scale },
    {
      id: "prohibited-activities",
      title: "5. Prohibited Activities",
      icon: AlertTriangle,
    },
    { id: "liability", title: "6. Limitation of Liability", icon: Gavel },
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
            <span className="text-gray-600">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Scale className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Please read these terms carefully before using CollegePravesh.
              They outline your rights and responsibilities as a user.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last updated: December 15, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Table of Contents & Introduction */}
      <div className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Table of Contents
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
                    <Scale className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Welcome to CollegePravesh
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms of Service (&quot;Terms&quot;) govern your use of
                  the CollegePravesh website and services. By using our
                  platform, you agree to these terms and our Privacy Policy.
                  These terms constitute a legally binding agreement between you
                  and CollegePravesh.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We may update these terms from time to time. Continued use of
                  our platform after changes constitutes acceptance of the new
                  terms. Please review these terms periodically for updates.
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Calendar className="w-4 h-4" />
                    <span>Last updated: December 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Version 3.2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Terms Sections */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const sectionNumber = index + 1;
            return (
              <div
                key={index}
                id={section.id}
                className="bg-white rounded-xl p-8 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {sectionNumber}. {section.title.replace(/^\d+\.\s*/, "")}
                    </h2>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Effective from December 15, 2024</span>
                    </div>
                  </div>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User Guidelines */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Community Guidelines
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              To maintain a positive environment for all users, please follow
              these guidelines when participating in our community.
            </p>
          </div>

          <div className="space-y-8">
            {guidelines.map((guideline, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {guideline.category}
                </h3>
                <ul className="space-y-3">
                  {guideline.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="py-16 bg-yellow-50 border-t border-b border-yellow-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Important Disclaimer
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                CollegePravesh is an information platform only. We do not
                guarantee admission to any educational institution, nor do we
                represent any college or university. All information is provided
                for educational purposes and should be verified independently.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Rankings, ratings, and reviews represent opinions and
                experiences of users and our editorial team. Individual
                experiences may vary. Always conduct your own research and
                consult with educational advisors before making important
                decisions about your education.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intellectual Property */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Intellectual Property
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                The CollegePravesh platform, including its design,
                functionality, and content, is protected by copyright,
                trademark, and other intellectual property laws. You may not
                reproduce, distribute, or create derivative works without our
                written permission.
              </p>
              <p>
                College logos, names, and trademarks remain the property of
                their respective institutions. We use them solely for
                identification and informational purposes under fair use
                provisions.
              </p>
              <p>
                User-generated content remains the property of the user, but by
                submitting content, you grant CollegePravesh a non-exclusive,
                royalty-free license to use, display, and distribute the content
                on our platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact and Support */}
      <div className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            If you have questions about these Terms of Service or need
            clarification on any point, our legal team is here to help.
          </p>

          <div className="bg-slate-800 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Legal Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-gray-300 mb-2">
                  <strong>Email:</strong> legal@collegepravesh.com
                </p>
                <p className="text-gray-300 mb-2">
                  <strong>Phone:</strong> 1800-572-9877
                </p>
              </div>
              <div>
                <p className="text-gray-300 mb-2">
                  <strong>Address:</strong> CollegePravesh Legal Department
                </p>
                <p className="text-gray-300">New Delhi, India 110001</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors">
              Privacy Policy
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Help Center
            </button>
          </div>

          <p className="text-gray-400 text-sm mt-8">
            By using CollegePravesh, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
