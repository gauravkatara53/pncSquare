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

  // Render article content sections (paragraphs, images, and tables)
  const renderSections = () =>
    article.sections.map((section) => (
      <section key={section._id} className="mb-8">
        <h2 className="sm:text-2xl text-xl font-semibold mb-4">
          {section.heading}
        </h2>
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
              className="w-full h-96 sm:-mt-0 sm:-mb-0 -mt-28 -mb-20  object-contain rounded-lg  bg-white"
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
