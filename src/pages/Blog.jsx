import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MotionDiv = motion.div;
const posts = [
  {
    id: 1,
    title: "Top 10 Must-Read Books of 2025",
    excerpt:
      "Discover the most talked-about books of the year, from gripping thrillers to heartwarming fiction that captured readers worldwide.",
    category: "Recommendations",
    readTime: "5 min read",
    date: "December 15, 2025",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "How to Build a Reading Habit That Sticks",
    excerpt:
      "Struggling to read consistently? Here are proven strategies from avid readers that will help you build a sustainable reading routine.",
    category: "Tips & Tricks",
    readTime: "4 min read",
    date: "November 28, 2025",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Classic Books That Every Reader Should Experience",
    excerpt:
      "From Tolstoy to Austen, these timeless classics have shaped literature and continue to resonate with modern readers around the world.",
    category: "Classics",
    readTime: "6 min read",
    date: "November 10, 2025",
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "Science Fiction Books That Predicted the Future",
    excerpt:
      "These remarkable sci-fi novels foresaw technologies and social changes that became reality. A fascinating look at literature's prophetic power.",
    category: "Science Fiction",
    readTime: "7 min read",
    date: "October 22, 2025",
    cover:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    title: "The Best Biographies to Read Right Now",
    excerpt:
      "Learn from the world's most fascinating people through these compelling biographies that read like the best fiction.",
    category: "Biography",
    readTime: "5 min read",
    date: "October 5, 2025",
    cover:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    title: "Why Reading Before Bed Changes Everything",
    excerpt:
      "Science backs it up: reading before sleep improves memory, reduces stress, and helps you fall asleep faster. Here's what you need to know.",
    category: "Lifestyle",
    readTime: "3 min read",
    date: "September 18, 2025",
    cover:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=250&fit=crop",
  },
];

const Blog = () => {
  return (
    <div className="px-6 md:px-10 py-16">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-accent-green-light text-accent-green text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <BookOpen className="w-4 h-4" />
          Book Vibe Blog
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Stories & Insights
        </h1>
        <p className="text-muted-foreground text-lg">
          Book recommendations, reading tips, and literary insights from the
          Book Vibe team.
        </p>
      </MotionDiv>

      {/* Featured Post */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <div className="bg-card border border-border rounded-3xl overflow-hidden hover:border-accent-green/50 hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-64 md:h-auto overflow-hidden">
              <img
                src={posts[0].cover}
                alt={posts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs text-accent-green bg-accent-green-light px-3 py-1 rounded-full w-fit mb-4">
                {posts[0].category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-accent-green transition-colors duration-300">
                {posts[0].title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {posts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {posts[0].readTime}
                  <span>·</span>
                  {posts[0].date}
                </div>
                <ArrowRight className="w-5 h-5 text-accent-green group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(1).map((post, index) => (
          <MotionDiv
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent-green/50 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <span className="text-xs text-accent-green bg-accent-green-light px-3 py-1 rounded-full">
                {post.category}
              </span>
              <h3 className="font-bold text-lg text-foreground mt-3 mb-2 line-clamp-2 group-hover:text-accent-green transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
                <span className="text-xs text-muted-foreground">
                  {post.date}
                </span>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default Blog;
