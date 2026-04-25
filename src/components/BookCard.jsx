import { motion } from "framer-motion";

const MotionDiv = motion.div;
const BookCard = ({ book, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card text-card-foreground rounded-2xl p-4 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
    >
      {/* Cover Image */}
      <div className="bg-muted rounded-xl flex justify-center items-center h-52 mb-4 overflow-hidden">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-muted-foreground text-sm">No Cover</div>
        )}
      </div>

      {/* Category Tags */}
      {book.categories?.length > 0 && (
        <div className="flex gap-2 mb-2 flex-wrap">
          {book.categories.slice(0, 2).map((cat, i) => (
            <span
              key={i}
              className="text-xs text-foreground bg-muted px-2 py-1 rounded-full border border-border"
            >
              {cat.length > 15 ? cat.slice(0, 15) + "…" : cat}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className="font-bold text-base mb-1 line-clamp-1 text-foreground group-hover:text-muted-foreground transition-colors duration-300">
        {book.title}
      </h3>

      {/* Author */}
      <p className="text-sm text-muted-foreground mb-3">
        By: {book.authors?.[0] ?? "Unknown Author"}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        {book.publishedDate && (
          <span className="text-xs text-muted-foreground">
            {book.publishedDate.slice(0, 4)}
          </span>
        )}
        {book.pageCount && (
          <span className="text-xs text-muted-foreground">
            {book.pageCount} pages
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
