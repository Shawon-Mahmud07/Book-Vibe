import { motion } from "framer-motion";
import { BookmarkPlus, BookmarkCheck, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MotionDiv = motion.div;

// StarRating component to display book ratings with stars
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
              : "fill-none text-muted-foreground"
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};
const BookCard = ({
  book,
  index,
  onToggle,
  isListed,
  showListButton = true,
}) => {
  const navigate = useNavigate();

  const handleListToggle = (e) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <MotionDiv
      onClick={() => navigate(`/book/${book.id}`)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group perspective-1000"
    >
      <div className="relative bg-secondary/30 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 group-hover:border-accent-green/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] shadow-xl">
        {/* Top Section — Fancy Display */}
        <div className="relative h-72 w-full flex items-center justify-center p-6 bg-linear-to-br from-muted/50 to-secondary/20 overflow-hidden">
          {/* Animated Background Glow */}
          <div className="absolute -inset-1 bg-linear-to-r from-accent-green/20 to-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Book Cover with Tilt Effect */}
          <MotionDiv
            whileHover={{
              scale: 1.05,
              z: 50,
            }}
            transition={{ type: "keyframes", stiffness: 300, damping: 10 }}
            className="relative z-10 w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
          >
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-contain rounded-md transform transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted rounded-md border border-dashed border-border">
                <span className="text-muted-foreground text-xs font-medium">
                  No Cover
                </span>
              </div>
            )}
          </MotionDiv>

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {book.categories?.[0] && (
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent-green bg-accent-green/10 backdrop-blur-md border border-accent-green/20 px-3 py-1 rounded-lg">
                {book.categories[0]}
              </span>
            )}
          </div>

          {/* Bookmark Action */}
          {showListButton && (
            <button
              onClick={handleListToggle}
              className={`absolute top-4 right-4 z-30 p-2.5 rounded-xl backdrop-blur-xl transition-all duration-300 shadow-lg border 
                ${
                  isListed
                    ? "bg-accent-green border-accent-green text-white scale-110 shadow-accent-green/20"
                    : "bg-white/5 border-white/10 text-white hover:bg-accent-green hover:border-accent-green"
                }`}
            >
              {isListed ? (
                <BookmarkCheck size={18} />
              ) : (
                <BookmarkPlus size={18} className="text-muted-foreground" />
              )}
            </button>
          )}

          {/* Year Indicator */}
          {book.publishedDate && (
            <div className="absolute bottom-4 right-4 z-20 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
              <span className="text-[10px] font-bold text-white/60 bg-black/40 px-2 py-1 rounded-md">
                {book.publishedDate.slice(0, 4)}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Section — Information */}
        <div className="p-5 bg-linear-to-b from-transparent to-black/20">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-1 group-hover:text-accent-green transition-colors duration-300">
              {book.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent-green md:opacity-0 md:group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
          </div>

          <p className="text-sm text-muted-foreground font-medium mb-4 flex items-center gap-1">
            <span className="w-4 h-px bg-muted-foreground/30"></span>
            {book.authors?.[0] ?? "Unknown Author"}
          </p>
          {/* Rating */}
          <div className="mb-4">
            {book.rating ? (
              <StarRating rating={book.rating} />
            ) : (
              <span className="text-xs text-muted-foreground/50">
                No ratings yet
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground tracking-tighter">
                Length
              </span>
              <span className="text-xs font-semibold text-foreground/80">
                {book.pageCount ? `${book.pageCount} Pages` : "N/A"}
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase text-muted-foreground tracking-tighter">
                Availability
              </span>
              <span className="text-xs font-semibold text-accent-green">
                In Stock
              </span>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default BookCard;
