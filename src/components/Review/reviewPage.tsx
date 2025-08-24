"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Footer } from "../common/footer";
import { Star, Filter, ThumbsUp, MessageSquare } from "lucide-react";

const reviewsData = [
  {
    id: 1,
    studentName: "Rahul Sharma",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    college: "IIT Delhi",
    course: "Computer Science Engineering",
    year: "2020-2024",
    rating: 4.8,
    review:
      "Excellent faculty and research opportunities. The campus culture is vibrant and there are numerous clubs and societies to explore. Placement support is outstanding with top tech companies visiting regularly.",
    tags: ["Placements", "Faculty", "Campus Life"],
    date: "2 days ago",
    helpful: 23,
    verified: true,
  },
  {
    id: 2,
    studentName: "Priya Singh",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b60a8ff8?w=150&h=150&fit=crop",
    college: "BITS Pilani",
    course: "Electronics and Communication",
    year: "2019-2023",
    rating: 4.6,
    review:
      "Great infrastructure and modern facilities. The hostel accommodation is comfortable and food quality is good. However, fees are on the higher side compared to government colleges.",
    tags: ["Infrastructure", "Hostel", "Fees"],
    date: "1 week ago",
    helpful: 18,
    verified: true,
  },
  {
    id: 3,
    studentName: "Arjun Patel",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    college: "NIT Trichy",
    course: "Mechanical Engineering",
    year: "2021-2025",
    rating: 4.4,
    review:
      "Balanced academic environment with focus on both theoretical and practical knowledge. Good industry connections and internship opportunities. Library facilities are excellent.",
    tags: ["Academics", "Library", "Internships"],
    date: "3 days ago",
    helpful: 15,
    verified: true,
  },
  {
    id: 4,
    studentName: "Sneha Reddy",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    college: "VIT Vellore",
    course: "Information Technology",
    year: "2020-2024",
    rating: 4.2,
    review:
      "Diverse student community from all over India. Multiple programming competitions and hackathons throughout the year. Placement cell is very active and supportive.",
    tags: ["Diversity", "Competitions", "Placements"],
    date: "5 days ago",
    helpful: 12,
    verified: false,
  },
  {
    id: 5,
    studentName: "Karthik Kumar",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    college: "IIT Bombay",
    course: "Chemical Engineering",
    year: "2018-2022",
    rating: 4.9,
    review:
      "World-class research facilities and renowned faculty members. The alumni network is incredibly strong and helpful for career guidance. Campus festivals are amazing!",
    tags: ["Research", "Alumni", "Festivals"],
    date: "1 day ago",
    helpful: 31,
    verified: true,
  },
  {
    id: 6,
    studentName: "Ananya Joshi",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    college: "DTU Delhi",
    course: "Civil Engineering",
    year: "2019-2023",
    rating: 4.1,
    review:
      "Good college with affordable fees structure. Faculty is experienced and helpful. However, infrastructure needs some improvement in certain departments.",
    tags: ["Faculty", "Fees", "Infrastructure"],
    date: "1 week ago",
    helpful: 9,
    verified: true,
  },
];

export default function ReviewsMainPage() {
  const [selectedCollege, setSelectedCollege] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredReviews = reviewsData.filter((review) => {
    return (
      (selectedCollege === "all" || review.college === selectedCollege) &&
      (selectedRating === "all" ||
        review.rating >= parseFloat(selectedRating)) &&
      (selectedCourse === "all" || review.course.includes(selectedCourse))
    );
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : index < rating
            ? "fill-yellow-200 text-yellow-400"
            : "text-slate-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              What Students Say About Colleges
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real experiences and honest reviews from students across top
              engineering colleges in India
            </p>
          </div>

          {/* Review Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl border border-slate-200">
              <div className="text-3xl font-bold text-slate-900 mb-2">
                12,450+
              </div>
              <div className="text-slate-600">Total Reviews</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-slate-200">
              <div className="text-3xl font-bold text-slate-900 mb-2">4.6</div>
              <div className="text-slate-600">Average Rating</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-slate-200">
              <div className="text-3xl font-bold text-slate-900 mb-2">250+</div>
              <div className="text-slate-600">Colleges Reviewed</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-slate-200">
              <div className="text-3xl font-bold text-slate-900 mb-2">98%</div>
              <div className="text-slate-600">Verified Reviews</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <Card className="border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-slate-600" />
            <h3 className="font-semibold text-slate-900">Filter Reviews</h3>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                College
              </label>
              <Select
                value={selectedCollege}
                onValueChange={setSelectedCollege}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Colleges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  <SelectItem value="IIT Delhi">IIT Delhi</SelectItem>
                  <SelectItem value="IIT Bombay">IIT Bombay</SelectItem>
                  <SelectItem value="BITS Pilani">BITS Pilani</SelectItem>
                  <SelectItem value="NIT Trichy">NIT Trichy</SelectItem>
                  <SelectItem value="VIT Vellore">VIT Vellore</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Course
              </label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="Computer Science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Rating
              </label>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger>
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                  <SelectItem value="3.0">3.0+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="helpful">Most Helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-slate-900 hover:bg-slate-800">
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              Student Reviews
            </h2>
            <p className="text-slate-600">
              Showing {filteredReviews.length} reviews
            </p>
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card
              key={review.id}
              className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={review.avatar} alt={review.studentName} />
                    <AvatarFallback>
                      {review.studentName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900">
                            {review.studentName}
                          </h3>
                          {review.verified && (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800 text-xs"
                            >
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">
                          {review.course} • {review.college} • {review.year}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {renderStars(review.rating)}
                          <span className="text-sm font-medium text-slate-900 ml-1">
                            {review.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{review.date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-slate-700 leading-relaxed">
                    {review.review}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
                      <MessageSquare className="h-4 w-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

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
