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

export default function NewsMainPage() {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.get<{
          data: NewsArticle[];
          success: boolean;
          message: string;
        }>("/news/all");
        if (response.success) {
          setNewsData(response.data);
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
  }, []);

  const trendingNews = newsData.filter((news) => news.trending);
  const router = useRouter();
  const goToDetails = (slug: string) => {
    router.push(`/newsarticle/${slug}`);
  };
  if (loading) return <div className="text-center py-20">Loading news...</div>;
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
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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
              {trendingNews.slice(0, 2).map((news) => (
                <Card
                  key={news._id}
                  onClick={() => goToDetails(news.slug)}
                  className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
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
                          <span>
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
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full mb-12">
          <TabsContent value="all" className="mt-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsData.map((news) => (
                <Card
                  key={news._id}
                  className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
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
                              {new Date(news.publishDate).toLocaleDateString()}
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
              ))}
            </div>
          </TabsContent>

          {/* Individual Category Tabs */}
          {Array.from(new Set(newsData.map((news) => news.category))).map(
            (category) => (
              <TabsContent
                key={category}
                value={category.toLowerCase()}
                className="mt-12"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {newsData
                    .filter((news) => news.category === category)
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
              </TabsContent>
            )
          )}
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="default" size="default">
            Load More Reviews
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
