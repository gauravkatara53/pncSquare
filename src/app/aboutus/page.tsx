"use client";
import { Footer } from "@/components/common/footer";
import {
  Award,
  Users,
  BookOpen,
  Target,
  Heart,
  Shield,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function AboutUsPage() {
  const stats = [
    { number: "100+", label: "Colleges Listed", icon: BookOpen },
    { number: "5000+", label: "Students Helped", icon: Users },
    { number: "500+", label: "Expert Reviews", icon: Award },
    { number: "98%", label: "Success Rate", icon: Target },
  ];

  const values = [
    {
      icon: Heart,
      title: "Student First",
      description:
        "Every decision we make prioritizes student success and wellbeing",
    },
    {
      icon: Shield,
      title: "Transparency",
      description:
        "Honest, unbiased information to help students make informed choices",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Committed to maintaining the highest standards in everything we do",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building a supportive ecosystem for students, parents, and educators",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Home
            </Link>

            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-yellow-400">Pncsquare</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Empowering students across India to discover their perfect college
              match through comprehensive data, honest reviews, and expert
              guidance since 2024.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To democratize access to quality higher education by providing
                comprehensive, accurate, and unbiased information about
                colleges, courses, and career paths across India.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe every student deserves the opportunity to make
                informed decisions about their future, regardless of their
                background or location.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To become India&#39;s most trusted platform for higher education
                guidance, connecting students with their ideal colleges and
                helping institutions reach the right candidates.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where every student has access to
                personalized guidance and transparent information to achieve
                their educational goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our commitment
              to students and educators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Story
            </h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              Pncsquare began in 2024 with a clear purpose: picking the right
              college should never be left to chance. Our founders saw that
              students lacked reliable, comparable, and up-to-date data —
              especially rankings and placement insights — so we built a
              platform to fix that.
            </p>

            <p>
              What began as a focused database of colleges quickly grew into a
              comprehensive higher-education resource. Today, Pncsquare.in hosts
              detailed profiles and rank data for thousands of colleges across
              India, helping millions of students every year make informed
              choices about entrance exams, courses, and careers.
            </p>

            <p>
              We combine advanced data collection with human verification:
              authentic student reviews, verified placement statistics, entrance
              cutoff trends, and college rankings — all updated regularly. Our
              platform empowers students with clear comparisons, actionable
              insights, and personalized recommendations.
            </p>

            <p>
              Looking ahead, Pncsquare is expanding into international guidance,
              skill-development programs, and AI-driven career matching. Our
              mission is simple and steady: to give every student the facts and
              context they need to choose the best path forward.
            </p>
          </div>
        </div>
      </div>

      {/* Recognition & Awards */}
      {/* <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Recognition & Awards
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by leading
              organizations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Best EdTech Platform 2024
              </h3>
              <p className="text-gray-600 text-sm">
                Ministry of Education, Government of India
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                5 Million+ Happy Users
              </h3>
              <p className="text-gray-600 text-sm">
                Trusted by students across India
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Education Excellence Award
              </h3>
              <p className="text-gray-600 text-sm">
                India Education Summit 2023
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Contact CTA */}
      {/* <div className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Have questions or want to partner with us? We&#39;d love to hear
              from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold mb-2">Our Office</h3>
              <p className="text-gray-300 text-sm">New Delhi, India 110001</p>
            </div>

            <div className="text-center">
              <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold mb-2">Join Our Team</h3>
              <p className="text-gray-300 text-sm">
                <a
                  href="mailto:careers@collegepravesh.com"
                  className="underline"
                >
                  careers@collegepravesh.com
                </a>
              </p>
            </div>

            <div className="text-center">
              <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold mb-2">Partnership</h3>
              <p className="text-gray-300 text-sm">
                <a
                  href="mailto:partners@collegepravesh.com"
                  className="underline"
                >
                  partners@collegepravesh.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNavigate("contact")}
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNavigate("help")}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Help Center
            </button>
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
}
