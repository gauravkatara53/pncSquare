import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  BookmarkPlus,
  Eye,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Footer } from "../common/footer";

interface NewsArticlePageProps {
  articleId: number;
  onNavigate: (page: string, id?: number) => void;
}

// Extended news data with full content
const fullNewsData = {
  1: {
    id: 1,
    title:
      "IIT Bombay Achieves Record Placement Success with Average Package of ₹22.1 LPA",
    description:
      "The institute has set a new benchmark with 99.2% placement rate and participation from over 400 companies including top tech giants.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop",
    category: "Placement",
    date: "December 15, 2024",
    readTime: "5 min read",
    author: "Education Desk",
    authorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    trending: true,
    views: "12.5K",
    comments: 45,
    content: `
      <p>IIT Bombay has achieved a remarkable milestone in its placement season 2024, recording the highest average package in its history at ₹22.1 LPA. This represents a significant 18% increase from the previous year's average of ₹18.7 LPA.</p>
      
      <p>The placement drive, which concluded last week, witnessed participation from over 400 companies, including global technology leaders like Google, Microsoft, Amazon, Apple, and several leading consulting firms. The placement rate stood at an impressive 99.2%, with only a handful of students opting out to pursue higher studies or entrepreneurial ventures.</p>
      
      <h2>Record-Breaking Statistics</h2>
      <p>The highest package offered this year reached ₹2.1 crore per annum, offered by a leading technology company for an AI research position. The median package also saw a substantial increase to ₹19.8 LPA, indicating overall improvement in compensation across all sectors.</p>
      
      <p>Engineering departments showed particularly strong performance:</p>
      <ul>
        <li><strong>Computer Science & Engineering:</strong> Average package of ₹28.5 LPA</li>
        <li><strong>Electrical Engineering:</strong> Average package of ₹24.2 LPA</li>
        <li><strong>Mechanical Engineering:</strong> Average package of ₹21.8 LPA</li>
        <li><strong>Chemical Engineering:</strong> Average package of ₹20.5 LPA</li>
      </ul>
      
      <h2>Industry Participation</h2>
      <p>The placement season saw robust participation from diverse sectors including technology, consulting, finance, and core engineering. Notable first-time recruiters included several emerging fintech companies and AI startups, reflecting the growing demand for IIT Bombay graduates in cutting-edge technology sectors.</p>
      
      <p>"This year's placement success is a testament to the quality of education and research excellence at IIT Bombay," said Prof. Subhasis Chaudhuri, Director of IIT Bombay. "Our students' adaptability to emerging technologies and strong foundational skills continue to make them highly sought after by industry leaders."</p>
      
      <h2>International Opportunities</h2>
      <p>International placements also reached new heights with 28% of placed students receiving offers from global companies. Silicon Valley tech giants, European consulting firms, and Asian technology companies showed strong interest in recruiting from the campus.</p>
      
      <p>The institute's career development cell worked tirelessly throughout the year to prepare students for the placement process, conducting mock interviews, group discussions, and technical workshops. Special focus was given to emerging technologies like artificial intelligence, machine learning, and sustainable engineering solutions.</p>
      
      <p>With these outstanding results, IIT Bombay continues to set benchmarks in engineering education and career outcomes, reinforcing its position as one of India's premier technical institutions.</p>
    `,
  },
  2: {
    id: 2,
    title: "JEE Advanced 2024 Registration Deadline Extended by One Week",
    description:
      "Due to technical issues faced by candidates, the Joint Admission Board has extended the registration deadline to May 16, 2024.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    category: "Exams",
    date: "December 14, 2024",
    readTime: "3 min read",
    author: "Exam Updates",
    authorImage:
      "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=100&h=100&fit=crop&crop=face",
    trending: false,
    views: "8.2K",
    comments: 23,
    content: `
      <p>The Joint Admission Board (JAB) has announced a one-week extension for JEE Advanced 2024 registration, moving the deadline from May 9 to May 16, 2024. This decision comes following widespread technical difficulties experienced by candidates during the initial registration period.</p>
      
      <h2>Technical Issues Addressed</h2>
      <p>The extension was necessitated after thousands of eligible JEE Main qualified candidates reported difficulties accessing the registration portal. Issues included server timeouts, payment gateway failures, and document upload problems that prevented many students from completing their applications.</p>
      
      <p>"We understand the anxiety and frustration caused by these technical glitches during such a crucial time," said a JAB spokesperson. "The extension ensures that no eligible candidate is disadvantaged due to technical issues beyond their control."</p>
      
      <h2>Registration Process Updates</h2>
      <p>The board has implemented several measures to improve the registration experience:</p>
      <ul>
        <li>Enhanced server capacity to handle concurrent user load</li>
        <li>Multiple payment gateway options for fee submission</li>
        <li>Improved document upload interface with better error handling</li>
        <li>Extended customer support hours during peak registration times</li>
      </ul>
      
      <h2>Important Reminders for Candidates</h2>
      <p>Candidates are advised to complete their registration well before the extended deadline to avoid last-minute technical issues. The registration fee remains ₹2,800 for general category candidates and ₹1,400 for SC, ST, and PwD candidates.</p>
      
      <p>Required documents include JEE Main admit card, qualifying examination certificates, category certificates (if applicable), and PwD certificates where relevant. All documents must be uploaded in prescribed formats and sizes.</p>
      
      <p>The JEE Advanced 2024 examination is scheduled for May 26, 2024, and will be conducted in computer-based test (CBT) mode across multiple cities nationwide. Candidates who successfully register will be able to download their admit cards from May 20, 2024.</p>
      
      <p>For any queries or technical support, candidates can contact the helpdesk through the official JEE Advanced website or the dedicated helpline numbers provided on the portal.</p>
    `,
  },
  3: {
    id: 3,
    title:
      "New IIT Campus to be Established in Jammu with Focus on Technology Innovation",
    description:
      "The government has approved the establishment of a new IIT campus in Jammu, emphasizing research in emerging technologies.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop",
    category: "Admissions",
    date: "December 13, 2024",
    readTime: "4 min read",
    author: "Policy Reporter",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    trending: true,
    views: "15.3K",
    comments: 67,
    content: `
      <p>The Ministry of Education has announced the approval for establishing a new Indian Institute of Technology (IIT) campus in Jammu, Jammu and Kashmir. This strategic decision aims to boost higher education infrastructure in the region while focusing on cutting-edge technology research and innovation.</p>
      
      <h2>Strategic Vision</h2>
      <p>The new IIT Jammu will be the 24th IIT in the country and the first full-fledged IIT campus in the union territory of Jammu and Kashmir. The institute is expected to play a crucial role in the region's technological advancement and economic development.</p>
      
      <p>Union Education Minister emphasized, "This new IIT will not only provide world-class engineering education to students from the region but also serve as a catalyst for technological innovation and entrepreneurship in Jammu and Kashmir."</p>
      
      <h2>Infrastructure and Investment</h2>
      <p>The government has allocated ₹1,500 crores for the development of the campus infrastructure over the next five years. The campus will be spread across 500 acres and is planned to accommodate up to 5,000 students once fully operational.</p>
      
      <p>Key features of the proposed campus include:</p>
      <ul>
        <li>State-of-the-art laboratories and research facilities</li>
        <li>Residential facilities for students and faculty</li>
        <li>Technology incubation centers</li>
        <li>Industry collaboration spaces</li>
        <li>Sustainable and green building infrastructure</li>
      </ul>
      
      <h2>Academic Focus Areas</h2>
      <p>IIT Jammu will specialize in emerging technology domains that align with national priorities and regional strengths:</p>
      <ul>
        <li><strong>Artificial Intelligence and Machine Learning:</strong> Advanced research in AI applications for defense and civilian use</li>
        <li><strong>Renewable Energy Technologies:</strong> Focus on solar, wind, and hydroelectric power systems</li>
        <li><strong>Cybersecurity:</strong> Development of robust security solutions for digital infrastructure</li>
        <li><strong>Biotechnology:</strong> Research in pharmaceutical and agricultural biotechnology</li>
        <li><strong>Materials Science:</strong> Advanced materials for aerospace and defense applications</li>
      </ul>
      
      <h2>Timeline and Admissions</h2>
      <p>The institute is expected to start its first academic session by 2026, initially operating from a temporary campus while the permanent infrastructure is under construction. The first batch will comprise 200 students across four engineering disciplines.</p>
      
      <p>Admissions to IIT Jammu will follow the standard JEE Advanced route, with additional seats reserved for candidates from the local region to ensure regional representation and development.</p>
      
      <h2>Regional Impact</h2>
      <p>The establishment of IIT Jammu is expected to create significant employment opportunities in the region, both directly through the institute and indirectly through the technology ecosystem it will foster. Industry experts predict that the campus will attract technology companies to set up operations in the region, creating a tech hub in northern India.</p>
      
      <p>Local government officials have expressed enthusiasm about the project, highlighting its potential to retain local talent and attract students from across the country to the region.</p>
    `,
  },
  // Add more articles as needed
};

// Related articles data
const relatedArticles = [
  {
    id: 4,
    title: "BITS Pilani Announces New Scholarship Program for Rural Students",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=300&h=200&fit=crop",
    category: "Admissions",
    date: "2 days ago",
  },
  {
    id: 5,
    title:
      "NIT Trichy Organizes National Level Technical Symposium 'TECHFEST 2024'",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop",
    category: "Events",
    date: "3 days ago",
  },
  {
    id: 6,
    title: "Microsoft Partners with IIT Delhi for AI Research Lab",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop",
    category: "Placement",
    date: "4 days ago",
  },
];

export function NewsArticlePage({
  articleId,
  onNavigate,
}: NewsArticlePageProps) {
  const article = fullNewsData[articleId as keyof typeof fullNewsData];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => onNavigate("news")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="border-b border-slate-200">
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
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          {/* Category and Trending Badge */}
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-sm">
              {article.category}
            </Badge>
            {article.trending && (
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

          {/* Description */}
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            {article.description}
          </p>

          {/* Article Meta */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Image
                src={article.authorImage}
                alt={article.author}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-slate-900">{article.author}</p>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{article.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{article.comments} comments</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <BookmarkPlus className="h-4 w-4 mr-1" />
                  Save
                </Button>
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
            src={article.image}
            alt={article.title}
            width={1200}
            height={400}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            priority
          />
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <Separator className="mb-8" />

        {/* Article Actions */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">
              Found this article helpful?
            </span>
            <Button variant="ghost" size="sm">
              👍 Helpful
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share Article
            </Button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Related Articles
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Card
                key={relatedArticle.id}
                className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => onNavigate("news", relatedArticle.id)}
              >
                <div className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <Badge variant="outline" className="text-xs mb-2">
                      {relatedArticle.category}
                    </Badge>

                    <h3 className="font-medium text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {relatedArticle.title}
                    </h3>

                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="h-3 w-3" />
                      <span>{relatedArticle.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
