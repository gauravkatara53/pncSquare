import type { Metadata } from "next";
import { apiService } from "@/ApiService/apiService";
import NewsArticleClient from "@/components/News/NewsArticleClient";

interface ArticleResponse {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  tags: string[];
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishDate: string;
  readTime: number;
  sections: {
    _id: string;
    heading: string;
    paragraphs: string[];
    image?: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  [key: string]: unknown;
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await apiService.get<ArticleResponse>(`/news/${slug}`);

    if (!article || !article.title) {
      return {
        title: "Article Not Found | PNC Square",
        description: "The requested news article could not be found.",
      };
    }

    return {
      title: article.title,
      description:
        article.summary?.slice(0, 160) || "News article from PNC Square",
      openGraph: {
        title: article.title,
        description: article.summary,
        type: "article",
        publishedTime: article.publishDate,
        url: `https://your-domain.com/newsarticle/${slug}`,
        images: [
          {
            url: article.coverImage,
            width: 800,
            height: 400,
            alt: article.title,
          },
        ],
        authors: [article.author.name],
        tags: article.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.summary,
        images: [article.coverImage],
      },
    };
  } catch (error) {
    console.error("Error in generateMetadata for slug:", slug, error);
    return {
      title: "Error | News Article",
      description: "There was an error fetching the news article details.",
    };
  }
}

export default async function NewsArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  return <NewsArticleClient slug={slug} />;
}
