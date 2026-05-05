import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Link } from "react-router-dom";

const MotionDiv = motion.div;

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === Number(id));

  // Not found
  if (!post) {
    return (
      <div className="px-6 md:px-10 py-12 min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Blog post not found.</p>
        <button
          onClick={() => navigate("/blog")}
          className="text-accent-green hover:underline"
        >
          ← Back to Blog
        </button>
      </div>
    );
  }

  // Related posts (same category, exclude current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="px-6 md:px-10 py-12">
      {/* Back Button */}
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-muted-foreground hover:text-accent-green transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Blog
        </button>
      </MotionDiv>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Category */}
          <span className="text-xs text-accent-green bg-accent-green-light px-3 py-1 rounded-full">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-accent-green" />
              {post.author}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-accent-green" />
              {post.date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent-green" />
              {post.readTime}
            </div>
          </div>
        </MotionDiv>

        {/* Cover Image */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 rounded-2xl overflow-hidden"
        >
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </MotionDiv>

        {/* Content */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="
            prose prose-lg max-w-none
            prose-headings:text-foreground
            prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-foreground
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Divider */}
        <div className="border-t border-border my-12" />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <Link key={related.id} to={`/blog/${related.id}`}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent-green/50 hover:shadow-lg transition-all duration-300 group">
                    <div className="h-36 overflow-hidden">
                      <img
                        src={related.cover}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-accent-green bg-accent-green-light px-2 py-0.5 rounded-full">
                        {related.category}
                      </span>
                      <h3 className="font-semibold text-foreground mt-2 line-clamp-2 group-hover:text-accent-green transition-colors duration-300">
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                        <Clock className="w-3 h-3" />
                        {related.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </MotionDiv>
        )}

        {/* Back to Blog CTA */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center bg-muted border border-border rounded-2xl p-8"
        >
          <BookOpen className="w-8 h-8 text-accent-green mx-auto mb-3" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            Enjoyed this post?
          </h3>
          <p className="text-muted-foreground mb-4">
            Check out more stories and insights from the Book Vibe team.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-xl font-semibold hover:bg-foreground/90 transition-colors duration-200"
          >
            <BookOpen className="w-4 h-4" />
            More Posts
          </Link>
        </MotionDiv>
      </div>
    </div>
  );
};

export default BlogDetail;
