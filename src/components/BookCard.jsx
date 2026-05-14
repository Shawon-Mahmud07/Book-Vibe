import useAuth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { BookmarkPlus, BookmarkCheck, ArrowUpRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MotionDiv = motion.div;

const StarRating = ({ rating }) => {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${
            star <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-muted-foreground/40"
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

const BookCard = ({ book, index, onToggle, isListed, showListButton = true }) => {
  const navigate = useNavigate();
const { currentUser } = useAuth();
  // onClick:
  const handleListToggle = (e) => {
    e.stopPropagation();
    // If user is not signed in, prompt them to sign in
    if (!currentUser) {
      toast.info("Please sign in to save books", {
        description: "Create a free account to build your reading list",
        action: {
          label: "Sign In",
          onClick: () => navigate("/signin"),
        },
      });
      return;
    }
    // Toggle the book in the user's list
    onToggle();
  };

  return (
    <MotionDiv
      onClick={() =>
        navigate(`/book/${book.id}`, {
          state: { cover: book.cover },
        })
      }
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative group w-full"
    >
      <div className="relative bg-card border border-border/50 rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:border-accent-green/40 hover:shadow-2xl hover:shadow-accent-green/5">
        {/* Top Section — Cover Area */}
        <div className="relative h-60 sm:h-72 w-full flex items-center justify-center p-6 bg-linear-to-br from-muted/30 to-transparent">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-accent-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Book Cover */}
          <MotionDiv
            whileHover={{ scale: 1.05 }}
            className="relative z-10 w-full h-full drop-shadow-2xl"
          >
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted rounded-xl border border-dashed border-border">
                <span className="text-muted-foreground text-xs">No Cover</span>
              </div>
            )}
          </MotionDiv>

          {/* Category Badge */}
          {book.categories?.[0] && (
            <div className="absolute top-4 left-4 z-20">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-accent-green bg-accent-green/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-accent-green/20">
                {book.categories[0]}
              </span>
            </div>
          )}

          {/* Bookmark Button */}
          {showListButton && (
            <button
              onClick={handleListToggle}
              className={`absolute top-4 right-4 z-30 p-2.5 rounded-2xl transition-all duration-300 shadow-lg border
                ${
                  isListed
                    ? "bg-accent-green border-accent-green text-white"
                    : "bg-background/80 backdrop-blur-md border-border text-foreground hover:bg-accent-green hover:text-white hover:border-accent-green"
                }`}
            >
              {isListed ? (
                <BookmarkCheck size={18} />
              ) : (
                <BookmarkPlus size={18} />
              )}
            </button>
          )}
        </div>

        {/* Bottom Section — Info Area */}
        <div className="p-5 sm:p-6">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-bold text-base sm:text-lg leading-snug text-foreground line-clamp-1 group-hover:text-accent-green transition-colors">
              {book.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-accent-green transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <p className="text-sm text-muted-foreground font-medium mb-4 truncate">
            By {book.authors?.[0] ?? "Unknown Author"}
          </p>

          <div className="flex items-center justify-between mb-4">
            <StarRating rating={book.rating} />
            {book.publishedDate && (
              <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {book.publishedDate.slice(0, 4)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase text-muted-foreground font-semibold">
                Pages
              </span>
              <span className="text-xs font-bold">
                {book.pageCount || "N/A"}
              </span>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[10px] uppercase text-muted-foreground font-semibold">
                Status
              </span>
              <span className="text-xs font-bold text-accent-green">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default BookCard;
