"use client";
import { Footer } from "@/components/common/footer";
import {
  Search,
  HelpCircle,
  BookOpen,
  Users,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", icon: HelpCircle },
    { id: "account", name: "Account & Profile", icon: Users },
    { id: "colleges", name: "College Information", icon: BookOpen },
    { id: "reviews", name: "Reviews & Ratings", icon: MessageCircle },
    { id: "admissions", name: "Admissions", icon: CheckCircle },
    { id: "technical", name: "Technical Support", icon: AlertCircle },
  ];

  const faqs = [
    {
      category: "account",
      question: "How do I create an account on Pncsquare?",
      answer:
        "Click the 'Sign Up' button in the top right corner, enter your email and basic information, verify your email address, and complete your profile setup.",
    },
    {
      category: "account",
      question: "I forgot my password. How can I reset it?",
      answer:
        "On the login page, click 'Forgot Password', enter your email address, check your email for a reset link, and follow the instructions to create a new password.",
    },
    {
      category: "colleges",
      question: "How often is college information updated?",
      answer:
        "We update college information regularly throughout the year. Admission details, fees, and placement data are typically updated before each admission season.",
    },
    {
      category: "colleges",
      question: "Can I suggest a college to be added to your database?",
      answer:
        "Yes! Use our 'Suggest a College' form or contact us directly. We review all suggestions and add eligible institutions to our platform.",
    },
    {
      category: "reviews",
      question: "How can I write a review for my college?",
      answer:
        "Navigate to your college's page, scroll to the reviews section, click 'Write a Review', fill in your honest experience, and submit for moderation.",
    },
    {
      category: "reviews",
      question: "Why was my review rejected?",
      answer:
        "Reviews may be rejected for containing inappropriate content, false information, or violating our community guidelines. Contact support for specific feedback.",
    },
    {
      category: "admissions",
      question: "Does Pncsquare help with college applications?",
      answer:
        "We provide information and guidance, but we don't handle applications directly. We can connect you with colleges and provide application deadlines and requirements.",
    },
    {
      category: "admissions",
      question: "How accurate are the cutoff scores shown?",
      answer:
        "Cutoff scores are based on previous year data from official sources. They're for reference only as actual cutoffs may vary each year.",
    },
    {
      category: "technical",
      question: "The website is not loading properly. What should I do?",
      answer:
        "Try refreshing the page, clearing your browser cache, checking your internet connection, or try a different browser. Contact us if the problem persists.",
    },
    {
      category: "technical",
      question: "Can I access Pncsquare on my mobile device?",
      answer:
        "Yes! Our website is fully responsive and works on all devices. We also have mobile apps available for iOS and Android.",
    },
  ];

  const guides = [
    {
      title: "Getting Started with Pncsquare",
      description: "Complete guide for new users",
      topics: [
        "Creating an account",
        "Searching for colleges",
        "Using filters",
        "Saving favorites",
      ],
    },
    {
      title: "Writing Effective College Reviews",
      description: "How to write helpful reviews",
      topics: [
        "Review guidelines",
        "What to include",
        "Rating criteria",
        "Review moderation",
      ],
    },
    {
      title: "Understanding College Rankings",
      description: "How our ranking system works",
      topics: [
        "Ranking methodology",
        "Data sources",
        "Update frequency",
        "Comparing colleges",
      ],
    },
    {
      title: "College Admission Process",
      description: "Navigate admissions successfully",
      topics: [
        "Application deadlines",
        "Required documents",
        "Entrance exams",
        "Merit lists",
      ],
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularArticles = [
    {
      title: "How to search for colleges effectively",
      category: "Getting Started",
      views: "15.2k views",
      rating: 4.8,
    },
    {
      title: "Understanding college rankings and ratings",
      category: "College Information",
      views: "12.1k views",
      rating: 4.9,
    },
    {
      title: "Writing honest and helpful reviews",
      category: "Reviews",
      views: "8.7k views",
      rating: 4.7,
    },
    {
      title: "Admission deadlines and requirements",
      category: "Admissions",
      views: "18.3k views",
      rating: 4.8,
    },
  ];

  const quickActions = [
    {
      title: "Start Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      action: "chat",
      available: true,
    },
    {
      title: "Submit Ticket",
      description: "Create a detailed support request",
      icon: Mail,
      action: "ticket",
      available: true,
    },
    {
      title: "Schedule Call",
      description: "Book a consultation call",
      icon: Phone,
      action: "call",
      available: false,
    },
    {
      title: "Community Forum",
      description: "Ask questions to our community",
      icon: Users,
      action: "forum",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/">
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                Home
              </button>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Help Center</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Help Center</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Find answers to common questions and get the support you need to
              make the most of Pncsquare.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white text-gray-900 rounded-xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Quick Actions
            </h2>
            <p className="text-gray-600">Choose the fastest way to get help</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  className={`bg-gray-50 p-6 rounded-xl text-center transition-all hover:shadow-lg ${
                    action.available
                      ? "hover:scale-105 cursor-pointer"
                      : "opacity-60"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      action.available ? "bg-blue-50" : "bg-gray-200"
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        action.available ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {action.description}
                  </p>
                  {action.available && (
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 text-xs font-medium">
                        Available
                      </span>
                    </div>
                  )}
                  {!action.available && (
                    <span className="text-gray-400 text-xs">
                      Currently unavailable
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Popular Articles */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-slate-900">
                Popular Articles
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {popularArticles.map((article, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 mb-1">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          {article.category}
                        </span>
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {article.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              {filteredFaqs.length} questions found
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== "all" &&
                ` in ${
                  categories.find((c) => c.id === selectedCategory)?.name
                }`}
            </p>
          </div>

          <div className="space-y-6">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-col items-center gap-2">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <span className="text-xs text-gray-400">Helpful?</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {categories.find((c) => c.id === faq.category)?.name}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Updated recently</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No results found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search terms or category filter
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Guides */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              User Guides
            </h2>
            <p className="text-gray-600">
              Comprehensive guides to help you get the most out of Pncsquare
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {guide.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Zap className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">
                        Quick Start Guide
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{guide.description}</p>
                <div className="space-y-3">
                  <p className="font-medium text-slate-800 text-sm mb-3">
                    What you&#39;ll learn:
                  </p>
                  {guide.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                  Read Guide
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
