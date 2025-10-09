"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, Share2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/common/footer";
import { apiService } from "@/ApiService/apiService";

interface ArticleSection {
  _id: string;
  heading: string;
  paragraphs: string[];
  image?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
}

interface Author {
  name: string;
  avatar: string;
  role: string;
}

interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  tags: string[];
  category: string;
  author: Author;
  publishDate: string;
  readTime: number;
  views: number;
  comments: number;
  shares: number;
  helpfulVotes: number;
  sections: ArticleSection[];
  createdAt: string;
  updatedAt: string;
}

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
}

interface RelatedArticlesResponse {
  statusCode: number;
  data: {
    relatedArticles: RelatedArticle[];
    totalFound: number;
  };
  message: string;
  success: boolean;
  errors: null;
  timestamp: string;
}

// import { useParams } from "next/navigation";
import ScrollToTop from "@/components/ScrollToTop";
import CollegeHeroSkeleton from "@/components/colleges/CollegeSkeleton";
interface Props {
  slug: string;
}
export default function NewsArticleClient({ slug }: Props) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    if (!slug || typeof slug !== "string") {
      return;
    }

    async function fetchArticle() {
      try {
        setLoading(true);
        setError(null);

        // Fetch article - response is the article object directly
        const articleData = await apiService.get<NewsArticle>(`/news/${slug}`);

        // Check if articleData has valid required fields before setting state
        if (articleData && articleData._id) {
          setArticle(articleData);
        } else {
          console.warn("Article data invalid or incomplete:", articleData);
          setError("Failed to load article.");
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Error fetching article.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  // Fetch related articles after main article loads
  useEffect(() => {
    if (!article || relatedArticles.length > 0) return;

    const fetchRelatedArticles = async () => {
      try {
        console.log("🔍 Fetching related articles for slug:", slug);
        setRelatedLoading(true);

        interface RelatedArticlesApiResponse {
          data?: {
            relatedArticles: RelatedArticle[];
          };
          relatedArticles?: RelatedArticle[];
        }
        const response: RelatedArticlesApiResponse = await apiService.get(
          `/news/related/${slug}`
        );
        console.log("📄 Related articles API response:", response);

        // Check if the response has the expected structure based on your API format
        if (response && response.data && response.data.relatedArticles) {
          console.log(
            "✅ Found related articles:",
            response.data.relatedArticles.length
          );
          setRelatedArticles(response.data.relatedArticles);
        } else if (response && response.relatedArticles) {
          console.log(
            "✅ Found related articles (direct):",
            response.relatedArticles.length
          );
          setRelatedArticles(response.relatedArticles);
        } else {
          console.log("❌ No related articles found in response");
          console.log("Response structure:", Object.keys(response || {}));
        }
      } catch (error) {
        console.error("❌ Error fetching related articles:", error);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [article, slug, relatedArticles.length]);

  // Function to handle sharing - copies URL to clipboard and shows toast
  const handleShare = async () => {
    try {
      const currentUrl = window.location.href;

      // Try to use the modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      // Show toast notification
      setShowCopyToast(true);

      // Hide toast after 2 seconds
      setTimeout(() => {
        setShowCopyToast(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
      // Show error message (optional)
      alert("Failed to copy link. Please copy manually from address bar.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CollegeHeroSkeleton />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
          {/* <Button onClick={() => onNavigate("news")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button> */}
        </div>
      </div>
    );

  if (!article)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The article you&#39;re looking for doesn&#39;t exist.
          </p>
          {/* <Button onClick={() => onNavigate("news")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button> */}
        </div>
      </div>
    );

  // Function to process HTML content and handle links
  const processHtmlWithLinks = (htmlContent: string) => {
    // First check if content already contains HTML links
    if (htmlContent.includes("<a ") || htmlContent.includes("<A ")) {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: htmlContent.replace(
              /<a\s+([^>]*?)>/gi,
              '<a $1 target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium">'
            ),
          }}
        />
      );
    }

    // If no HTML links, check for plain text URLs
    const urlRegex = /(https?:\/\/[^\s<>"]+)/gi;
    if (urlRegex.test(htmlContent)) {
      const processedHtml = htmlContent.replace(
        urlRegex,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium break-all">Click</a>'
      );
      return <span dangerouslySetInnerHTML={{ __html: processedHtml }} />;
    }

    // If no URLs found, return as normal HTML
    return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  // Render article content sections (paragraphs, images, and tables)
  const renderSections = () =>
    article.sections.map((section) => (
      <section key={section._id} className="mb-8">
        <h2 className="sm:text-2xl text-xl font-semibold mb-4">
          {processHtmlWithLinks(section.heading)}
        </h2>
        {section.paragraphs.map((para, idx) => (
          <p key={idx} className="mb-4 leading-relaxed text-gray-700">
            {processHtmlWithLinks(para)}
          </p>
        ))}
        {section.image && (
          <div className="my-6">
            {/* <Image
              src={section.image}
              alt={section.heading}
              width={800}
              height={400}
              className="w-full rounded-lg shadow-md object-cover max-h-96"
            /> */}
          </div>
        )}
        {section.table && section.table.headers.length > 0 && (
          <div className="overflow-x-auto my-6">
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
              <thead>
                <tr>
                  {section.table.headers.map((header, idx) => (
                    <th
                      key={idx}
                      className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {processHtmlWithLinks(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    ));

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        {/* <div className="border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate("news")}
              className="hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>
          </div>
        </div> */}

        {/* Main Content with Sidebar Ads (Desktop Only) */}
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center gap-8">
            {/* Left Sidebar Ad (Desktop Only) */}
            <aside className="hidden xl:block w-64 flex-shrink-0">
              <div className="sticky top-8 space-y-6">
                {/* Exam Links Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200 p-6 shadow-sm">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Popular Exams
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                      onClick={() =>
                        window.open("/exam?exam=jee-main", "_self")
                      }
                    >
                      JEE Main
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                      onClick={() =>
                        window.open("/exam?exam=jee-advanced", "_self")
                      }
                    >
                      JEE Advanced
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                      onClick={() => window.open("/exam?exam=neet-ug", "_self")}
                    >
                      NEET UG
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left bg-white/70 hover:bg-white border border-blue-200 text-blue-700"
                      onClick={() => window.open("/exam?exam=gate", "_self")}
                    >
                      GATE
                    </Button>
                  </div>
                </div>

                {/* Follow Us Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-blue-600 border border-blue-200 hover:bg-blue-50"
                      onClick={() =>
                        window.open("https://facebook.com", "_blank")
                      }
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-blue-400 border border-blue-200 hover:bg-blue-50"
                      onClick={() =>
                        window.open("https://twitter.com", "_blank")
                      }
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      Twitter
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-blue-700 border border-blue-200 hover:bg-blue-50"
                      onClick={() =>
                        window.open("https://linkedin.com", "_blank")
                      }
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-pink-600 border border-pink-200 hover:bg-pink-50"
                      onClick={() =>
                        window.open("https://instagram.com", "_blank")
                      }
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.349-1.052-2.349-2.35 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.349 1.052 2.349 2.349 0 1.298-1.052 2.35-2.349 2.35zm7.718 0c-1.297 0-2.349-1.052-2.349-2.35 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.35 1.052 2.35 2.349 0 1.298-1.053 2.35-2.35 2.35z" />
                      </svg>
                      Instagram
                    </Button>
                  </div>
                </div>

                {/* Quick Navigation Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Quick Navigation
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                      onClick={() => window.open("/colleges", "_self")}
                    >
                      Colleges
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                      onClick={() => window.open("/courses", "_self")}
                    >
                      Courses
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                      onClick={() => window.open("/exam", "_self")}
                    >
                      Exams
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                      onClick={() => window.open("/cutoff", "_self")}
                    >
                      Cutoffs
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                      onClick={() => window.open("/review", "_self")}
                    >
                      Reviews
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-700 border border-gray-200 hover:bg-gray-50"
                      onClick={() => window.open("/placements", "_self")}
                    >
                      Placements
                    </Button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Article Content */}
            <article className="max-w-4xl flex-1 min-w-0">
              <header className="mb-8">
                {/* Category and Trending Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-sm">
                    {article.category}
                  </Badge>
                  {article.tags.includes("Trending") && (
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-800 text-sm"
                    >
                      Trending
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="sm:text-4xl text-2xl font-bold text-slate-900 mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Summary */}
                <p className="sm:text-xl text-lg text-slate-600 mb-8 leading-relaxed">
                  {article.summary}
                </p>

                {/* Article Meta */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-slate-900">
                        {article.author.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {article.author.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(article.publishDate).toLocaleDateString()}
                      </span>
                      <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="mb-8" />
              </header>

              {/* Featured Image */}
              <div className="mb-8">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-96 sm:-mt-0 sm:-mb-0 -mt-28 -mb-20  object-contain rounded-lg  bg-white"
                  priority
                />
              </div>

              {/* Article Sections */}
              {renderSections()}
            </article>

            {/* Right Sidebar Ad (Desktop Only) */}
            <aside className="hidden xl:block w-64 flex-shrink-0">
              <div className="sticky top-8 space-y-6">
                {/* 2025 Placement Data Section */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg border border-purple-200 p-6 shadow-sm relative overflow-hidden">
                  {/* Animated NEW badge */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-md text-gray-800 mb-2">
                      Placement Data
                    </h3>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      2025
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className=" w-full justify-start text-left bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm"
                      onClick={() =>
                        window.open(
                          "https://pncsquare.in/college/nit-allahabad#placements",
                          "_blank"
                        )
                      }
                    >
                      NIT Allahabad
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm"
                      onClick={() =>
                        window.open(
                          "https://pncsquare.in/college/nit-jamshedpur#placements",
                          "_blank"
                        )
                      }
                    >
                      NIT Jamshedpur
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm"
                      onClick={() =>
                        window.open(
                          "https://pncsquare.in/college/nit-jaipur#placements",
                          "_blank"
                        )
                      }
                    >
                      NIT Jaipur
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left bg-white/70 hover:bg-white border border-purple-200 text-purple-700 text-sm"
                      onClick={() =>
                        window.open(
                          "https://pncsquare.in/college/nit-kurukshetra#placements",
                          "_blank"
                        )
                      }
                    >
                      NIT Kurukshetra
                    </Button>
                  </div>
                </div>

                {/* Cutoff Section */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg border border-orange-200 p-6 shadow-sm">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        Exam Cutoffs
                      </h3>
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                        2025
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left bg-white/70 hover:bg-white border border-orange-200 text-orange-700 text-sm"
                      onClick={() =>
                        window.open(
                          "https://pncsquare.in/cutoff?examType=JEE-Advanced",
                          "_blank"
                        )
                      }
                    >
                      JEE Advanced
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left bg-white/70 hover:bg-white border border-orange-200 text-orange-700 text-sm"
                      onClick={() =>
                        window.open(
                          "https://pncsquare.in/cutoff?examType=JEE-Main",
                          "_blank"
                        )
                      }
                    >
                      JEE Main
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left bg-white/70 hover:bg-white border border-orange-200 text-orange-700 text-sm"
                      onClick={() =>
                        window.open(
                          "https://pncsquare.in/cutoff?examType=NEET-UG",
                          "_blank"
                        )
                      }
                    >
                      NEET UG
                    </Button>
                  </div>
                </div>

                {/* Need Help Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Have questions about colleges or admissions? Our experts are
                    here to help.
                  </p>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-gray-700 border border-gray-200 hover:bg-gray-50"
                      onClick={() => window.open("/help-center", "_self")}
                    >
                      Help Center
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-gray-700 border border-gray-200 hover:bg-gray-50"
                      onClick={() => window.open("/aboutus", "_self")}
                    >
                      About Us
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
        {/* Related Articles Section - Full Width Horizontal */}
        {relatedArticles.length > 0 && (
          <section className="bg-gray-50 py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedArticles.slice(0, 4).map((relatedArticle) => (
                  <div
                    key={relatedArticle.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group transform hover:-translate-y-1"
                    onClick={() =>
                      window.open(
                        `/newsarticle/${relatedArticle.slug}`,
                        "_self"
                      )
                    }
                  >
                    <div className="aspect-video w-full relative overflow-hidden">
                      <Image
                        src={relatedArticle.coverImage}
                        alt={relatedArticle.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-3 text-sm leading-relaxed group-hover:text-blue-600 transition-colors duration-200">
                        {relatedArticle.title}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500 font-medium">
                          Read More
                        </span>
                        <svg
                          className="w-4 h-4 text-blue-600 transform group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Loading state for related articles */}
        {relatedLoading && (
          <section className="bg-gray-50 py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="aspect-video w-full bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />

        {/* Copy Toast Notification */}
        {showCopyToast && (
          <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
            <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="font-medium">Link copied to clipboard!</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
