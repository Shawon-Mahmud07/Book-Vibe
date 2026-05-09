import { motion, AnimatePresence } from "framer-motion";
import {
  BookMarked,
  Trash2,
  BookOpen,
  Clock,
  ChevronRight,
  BookText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useListedBooks from "@/hooks/useListedBooks";
import { useNavigate } from "react-router-dom";

const MotionDiv = motion.div;

const ListedBooks = () => {
  const { listedBooks, removeBook, clearAll } = useListedBooks();
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-10 py-8 md:py-12 max-w-5xl mx-auto min-h-[80vh]">
      {/* Header Section */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
      >
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-[10px] font-bold uppercase tracking-widest mx-auto sm:mx-0">
            Collection
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground">
            Reading <span className="text-accent-green">List</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            You have{" "}
            <span className="text-foreground font-bold">
              {listedBooks.length}
            </span>{" "}
            books saved.
          </p>
        </div>

        {listedBooks.length > 0 && (
          <Button
            variant="outline"
            className="rounded-xl border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all gap-2 h-10 w-full sm:w-auto"
            onClick={clearAll}
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </MotionDiv>

      {/* Books List */}
      <div className="grid gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {listedBooks.map((book, index) => (
            <MotionDiv
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative bg-card border border-border/50 rounded-2xl sm:rounded-[2rem] p-4 flex flex-row items-center gap-4 sm:gap-8 transition-all hover:shadow-lg"
            >
              {/* Image: Fixed Size on Mobile */}
              <div
                onClick={() => navigate(`/book/${book.id}`)}
                className="relative shrink-0 w-20 h-28 sm:w-32 sm:h-44 cursor-pointer overflow-hidden rounded-xl shadow-md"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content Section: Flexible */}
              <div className="flex-1 min-w-0 py-1 flex flex-col justify-between h-28 sm:h-44">
                <div className="space-y-1">
                  <h3
                    onClick={() => navigate(`/book/${book.id}`)}
                    className="font-bold text-sm sm:text-xl text-foreground line-clamp-1 sm:line-clamp-2 cursor-pointer group-hover:text-accent-green transition-colors"
                  >
                    {book.title}
                  </h3>
                  <p className="text-xs sm:text-base text-muted-foreground font-medium truncate">
                    {book.authors?.[0] || "Unknown"}
                  </p>
                </div>

                {/* Badges & Meta: Grid/Flex fix for Mobile */}
                <div className="flex flex-wrap items-center gap-2 mt-auto">
                  <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-[9px] sm:text-[11px] font-bold uppercase tracking-tighter">
                    <BookText className="w-3 h-3 text-accent-green" />
                    {book.pageCount || "N/A"} P
                  </div>
                  {book.categories?.[0] && (
                    <div className="px-2 py-1 bg-accent-green/10 text-accent-green rounded-md text-[9px] sm:text-[11px] font-black uppercase truncate max-w-20 sm:max-w-none">
                      {book.categories[0]}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions: Vertical stacking on small screens */}
              <div className="flex flex-col justify-center gap-2 sm:gap-4 pl-2 border-l border-border/50">
                <button
                  onClick={() => removeBook(book.id)}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate(`/book/${book.id}`)}
                  className="sm:flex p-2 bg-accent-green/5 text-accent-green hover:bg-accent-green hover:text-white rounded-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </MotionDiv>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ListedBooks;
