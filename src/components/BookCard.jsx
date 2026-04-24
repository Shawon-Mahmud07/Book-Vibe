import { Download } from "lucide-react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;
const BookCard = ({ book, index }) => {
  const title = book.title;
  const author = book.authors[0]?.name || "Unknown Author";
  const cover = book.formats["image/jpeg"] || "";
  const subject = book.subjects[0] || "Fiction";

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.4 , delay: index * 0.1 }} 
      className="
      bg-card text-card-foreground
      rounded-2xl p-4 border border-border
      hover:shadow-xl hover:-translate-y-2
      transition-all duration-300
      cursor-pointer group
    "
    >
      {/* Book Cover */}
      <div className="bg-muted rounded-xl flex justify-center items-center h-52 mb-4 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-contain rounded-xl
                       group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-muted-foreground text-sm">No Cover</div>
        )}
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-2">
        {book.subjects.slice(0, 2).map((subject, i) => (
          <span
            key={i}
            className="text-xs text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full"
          >
            {subject.length > 15 ? subject.slice(0, 15) + "…" : subject}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3
        className=" font-bold text-base mb-1 line-clamp-1
        text-foreground
        group-hover:text-green-500
        transition-colors duration-300"
      >
        {title}
      </h3>

      {/* Author */}
      <p className="text-sm text-muted-foreground mb-3">By : {author}</p>

      {/* Bottom */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm text-muted-foreground">
          {subject.slice(0, 20)}
        </span>
        <div className="flex items-center gap-1">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Download className="h-3 w-3" />
            {book.download_count.toLocaleString()}
          </span>
        </div>
      </div>
    </MotionDiv>
  );
};

export default BookCard;
