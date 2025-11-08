"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent } from "../ui/tabs";
import { Footer } from "../common/footer";
import { Calendar, Clock, ExternalLink, TrendingUp } from "lucide-react";
import Image from "next/image";
import { apiService } from "@/ApiService/apiService";
import { useRouter } from "next/navigation";
import NewsSkeleton from "./NewsSkeleton";
import Link from "next/link";

// Types
interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  trending: boolean;
  coverImage: string;
  category: string;
  publishDate: string;
  readTime: number;
}
interface NewsApiResponse {
  articles: NewsArticle[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Pagination
const PAGE_SIZE = 6;

function Pagination({
  current,
  total,
  onPageChange,
}: {
  current: number;
  total: number;
  onPageChange: (p: number) => void;
}) {
  if (total <= 1) return null;

  const pages = [];
  const range = 2;
  for (
    let i = Math.max(1, current - range);
    i <= Math.min(total, current + range);
    i++
  ) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center items-center gap-2 py-8">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onPageChange(current - 1)}
        disabled={current <= 1}
        aria-label="Previous page"
      >
        &#8592;
      </Button>
      {pages[0] > 1 && (
        <>
          <Button size="sm" variant="ghost" onClick={() => onPageChange(1)}>
            1
          </Button>
          {pages[0] > 2 && <span className="mx-1 text-slate-400">…</span>}
        </>
      )}
      {pages.map((num) => (
        <Button
          key={num}
          size="sm"
          variant={num === current ? "default" : "ghost"}
          onClick={() => onPageChange(num)}
          aria-label={`Go to page ${num}`}
        >
          {num}
        </Button>
      ))}
      {pages[pages.length - 1] < total && (
        <>
          {pages[pages.length - 1] < total - 1 && (
            <span className="mx-1 text-slate-400">…</span>
          )}
          <Button size="sm" variant="ghost" onClick={() => onPageChange(total)}>
            {total}
          </Button>
        </>
      )}
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onPageChange(current + 1)}
        disabled={current >= total}
        aria-label="Next page"
      >
        &#8594;
      </Button>
    </nav>
  );
}

export default function NewsMainPage() {
  // Trending news state (fixed)
  const [trendingNews, setTrendingNews] = useState<NewsArticle[]>([]);
  // Standard paginated news state
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [pagination, setPagination] = useState<
    NewsApiResponse["pagination"] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // Fetch trending news only once on mount
  useEffect(() => {
    async function fetchTrending() {
      try {
        const response = await apiService.get<{
          data: { articles: NewsArticle[] };
          success: boolean;
        }>("/news/trending/1");
        if (response.success) {
          setTrendingNews(response.data.articles);
        }
      } catch {
        setTrendingNews([]);
      }
    }
    fetchTrending();
  }, []);

  // Fetch paginated news whenever page or category changes
  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);
        let url = `/news/all?page=${page}&limit=${PAGE_SIZE}`;
        if (category !== "all")
          url += `&category=${encodeURIComponent(category)}`;
        const response = await apiService.get<{
          data: NewsApiResponse;
          success: boolean;
          message: string;
        }>(url);
        if (response.success) {
          setNewsData(response.data.articles);
          setPagination(response.data.pagination);
          if (category === "all") {
            const cats = Array.from(
              new Set(response.data.articles.map((n) => n.category))
            );
            setAllCategories(cats);
          }
        } else {
          setError("Failed to load news articles.");
        }
      } catch {
        setError("Error fetching news articles.");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [page, category]);

  const router = useRouter();
  const goToDetails = (slug: string) => router.push(`/newsarticle/${slug}`);

  const handleTabChange = (tab: string) => {
    setCategory(tab);
    setPage(1);
  };
  const handlePageChange = (p: number) => setPage(p);

  if (loading) return <NewsSkeleton />;
  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-orange-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Latest College & Exam News
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto hidden sm:block">
              Stay updated with the latest developments in higher education,
              admissions, placements, and examination updates
            </p>
          </div>
          {/* Trending News */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <h2 className="font-semibold text-slate-900">Trending Now</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {trendingNews.map((news) => (
                <Link key={news._id} href={`/newsarticle/${news.slug}`}>
                  <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <Image
                          src={news.coverImage}
                          alt={news.title}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover flex-shrink-0"
                          style={{ width: "80px", height: "80px" }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-slate-900 line-clamp-2 mb-2">
                            {news.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="hidden sm:inline">
                              {new Date(news.publishDate).toLocaleDateString()}
                            </span>
                            <span>{news.readTime} min read</span>
                            <Badge variant="secondary" className="text-xs">
                              {news.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main News With Pagination & Tabs */}
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 sm:py-12 py-8">
        <Tabs
          defaultValue="all"
          value={category}
          onValueChange={handleTabChange}
          className="w-full mb-12"
        >
          <TabsContent value="all" className="sm:mt-12 mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsData.map((news) => (
                <Link key={news._id} href={`/newsarticle/${news.slug}`}>
                  <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={news.coverImage}
                          alt={news.title}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {news.category}
                          </Badge>
                          {news.trending && (
                            <Badge
                              variant="secondary"
                              className="bg-orange-100 text-orange-800 text-xs"
                            >
                              Trending
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {news.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {news.summary}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {new Date(
                                  news.publishDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{news.readTime} min read</span>
                            </div>
                          </div>
                          <span className="font-medium text-slate-600">
                            Education Desk
                          </span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <Button
                            onClick={() => goToDetails(news.slug)}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-between group-hover:bg-slate-50"
                          >
                            <span>Read More</span>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            {/* Modern Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                current={pagination.currentPage}
                total={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </TabsContent>
          {allCategories.map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData
                  .filter((news) => news.category === cat)
                  .map((news) => (
                    <Card
                      key={news._id}
                      className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                    >
                      <div className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden">
                          <Image
                            src={news.coverImage}
                            alt={news.title}
                            width={800}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {news.category}
                            </Badge>
                            {news.trending && (
                              <Badge
                                variant="secondary"
                                className="bg-orange-100 text-orange-800 text-xs"
                              >
                                Trending
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {news.title}
                          </h3>
                          <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                            {news.summary}
                          </p>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {new Date(
                                    news.publishDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{news.readTime} min read</span>
                              </div>
                            </div>
                            <span className="font-medium text-slate-600">
                              Education Desk
                            </span>
                          </div>
                          <div className="mt-4 pt-4 border-t border-slate-100">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-between group-hover:bg-slate-50"
                            >
                              <span>Read More</span>
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
              {pagination && pagination.totalPages > 1 && (
                <Pagination
                  current={pagination.currentPage}
                  total={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
