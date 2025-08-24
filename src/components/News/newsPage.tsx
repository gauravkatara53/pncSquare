"use client";
import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Footer } from "../common/footer";
import { Calendar, Clock, ExternalLink, TrendingUp } from "lucide-react";
import Image from 'next/image';
const newsData = [
  {
    id: 1,
    title:
      "IIT Bombay Achieves Record Placement Success with Average Package of ₹22.1 LPA",
    description:
      "The institute has set a new benchmark with 99.2% placement rate and participation from over 400 companies including top tech giants.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop",
    category: "Placement",
    date: "2 hours ago",
    readTime: "5 min read",
    author: "Education Desk",
    trending: true,
  },
  {
    id: 2,
    title: "JEE Advanced 2024 Registration Deadline Extended by One Week",
    description:
      "Due to technical issues faced by candidates, the Joint Admission Board has extended the registration deadline to May 16, 2024.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    category: "Exams",
    date: "6 hours ago",
    readTime: "3 min read",
    author: "Exam Updates",
    trending: false,
  },
  {
    id: 3,
    title:
      "New IIT Campus to be Established in Jammu with Focus on Technology Innovation",
    description:
      "The government has approved the establishment of a new IIT campus in Jammu, emphasizing research in emerging technologies.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop",
    category: "Admissions",
    date: "1 day ago",
    readTime: "4 min read",
    author: "Policy Reporter",
    trending: true,
  },
  {
    id: 4,
    title: "BITS Pilani Announces New Scholarship Program for Rural Students",
    description:
      "The prestigious institute launches 'Rural Excellence Scholarship' covering 100% tuition fees for meritorious students from rural backgrounds.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=250&fit=crop",
    category: "Admissions",
    date: "2 days ago",
    readTime: "6 min read",
    author: "Scholarship News",
    trending: false,
  },
  {
    id: 5,
    title:
      "NIT Trichy Organizes National Level Technical Symposium 'TECHFEST 2024'",
    description:
      "Over 10,000 students from 500+ colleges participate in this three-day technical extravaganza featuring competitions, workshops, and guest lectures.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    category: "Events",
    date: "3 days ago",
    readTime: "4 min read",
    author: "Campus Reporter",
    trending: false,
  },
  {
    id: 6,
    title: "Microsoft Partners with IIT Delhi for AI Research Lab",
    description:
      "The collaboration aims to advance artificial intelligence research and develop solutions for real-world problems in healthcare and education.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    category: "Placement",
    date: "4 days ago",
    readTime: "5 min read",
    author: "Tech Correspondent",
    trending: true,
  },
  {
    id: 7,
    title: "GATE 2024 Results Show 15% Increase in Qualifying Candidates",
    description:
      "This year's Graduate Aptitude Test in Engineering results reveal improved performance across all branches with higher qualifying scores.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    category: "Exams",
    date: "5 days ago",
    readTime: "3 min read",
    author: "Results Team",
    trending: false,
  },
  {
    id: 8,
    title:
      "VIT Vellore Launches India's First Undergraduate Program in Quantum Computing",
    description:
      "The university introduces a pioneering B.Tech program in Quantum Computing, aiming to prepare students for future technology challenges.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    category: "Admissions",
    date: "1 week ago",
    readTime: "7 min read",
    author: "Academic News",
    trending: true,
  },
];

export default function NewsMainPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["Placement", "Admissions", "Exams", "Events"];

  const filteredNews =
    selectedCategory === "all"
      ? newsData
      : newsData.filter((news) => news.category === selectedCategory);

  const trendingNews = newsData.filter((news) => news.trending);

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
                  key={news.id}
                  className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                


<Image
  src={news.image}
  alt={news.title}
  width={80}           // required: actual pixel width
  height={80}          // required: actual pixel height
  className="rounded-lg object-cover flex-shrink-0"
  style={{ width: '80px', height: '80px' }} // If using Tailwind, width prop won't impact CSS classes
/>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-900 line-clamp-2 mb-2">
                          {news.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{news.date}</span>
                          <span>{news.readTime}</span>
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
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
            <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>
              All News
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category.toLowerCase()}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news) => (
                <Card
                  key={news.id}
                  className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
  src={news.image}
  alt={news.title}
  width={500} // Replace with your actual pixel width
  height={500} // Replace with your actual pixel height
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
                        {news.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{news.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{news.readTime}</span>
                          </div>
                        </div>
                        <span className="font-medium text-slate-600">
                          {news.author}
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

          {/* Individual Category Tabs */}
          {categories.map((category) => (
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
                      key={news.id}
                      className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                    >
                      <div className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden">
                         <Image
                          src={news.image}
                          alt={news.title}
                          width={800} // set actual width in px
                          // height={600} // set actual height in px
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
                            {news.description}
                          </p>

                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{news.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{news.readTime}</span>
                              </div>
                            </div>
                            <span className="font-medium text-slate-600">
                              {news.author}
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
          ))}
        </Tabs>

        {/* Load More */}
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
