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
interface NewsArticlePageProps {
  slug: string;
  onNavigate: (page: string, slug?: string) => void;
}

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
interface PageProps {
  params: { slug: string | string[] };
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

// import { useParams } from "next/navigation";
import ScrollToTop from "@/components/ScrollToTop";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading article...</p>
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

  // Render article content sections (paragraphs, images, and tables)
  const renderSections = () =>
    article.sections.map((section) => (
      <section key={section._id} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
        {section.paragraphs.map((para, idx) => (
          <p
            key={idx}
            className="mb-4 leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: para }}
          />
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
                        {cell}
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

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Summary */}
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {article.summary}
            </p>

            {/* Article Meta */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Image
                  src={
                    article.author.avatar ||
                    "data:image/png;base64,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"
                  }
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
                  <Button variant="ghost" size="sm">
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
              className="w-full h-96 object-contain rounded-lg  bg-white"
              priority
            />
          </div>

          {/* Article Sections */}
          {renderSections()}
        </article>

        <Footer />
      </div>
    </>
  );
}
