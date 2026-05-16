import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const MotionDiv = motion.div;

// ─── Single Blog Card Component ───
const BlogCard = ({ post, index }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-accent-green/50 hover:shadow-xl transition-all duration-300 group flex flex-col"
  >
    
    <div className="h-48 w-full overflow-hidden shrink-0">
      <img
        src={post.cover}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-1">
      <span className="text-xs text-accent-green bg-accent-green-light px-3 py-1 rounded-full w-fit">
        {post.category}
      </span>

      <h3 className="font-bold text-lg text-foreground mt-3 mb-2 line-clamp-2 group-hover:text-accent-green transition-colors duration-300">
        {post.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>

     
      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {post.readTime}
        </div>
        <span className="text-xs text-muted-foreground">{post.date}</span>
      </div>
    </div>
  </MotionDiv>
);

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
        <Link to={`/blog/${blogPosts[0].id}`}>
          <div className="bg-card border border-border rounded-3xl overflow-hidden hover:border-accent-green/50 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto overflow-hidden">
                <img
                  src={blogPosts[0].cover}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="text-xs text-accent-green bg-accent-green-light px-3 py-1 rounded-full w-fit mb-4">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-accent-green transition-colors duration-300">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                    <span>·</span>
                    {blogPosts[0].date}
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent-green group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </MotionDiv>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(1).map((post, index) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="h-full">
            <BlogCard post={post} index={index} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
