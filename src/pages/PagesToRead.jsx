import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useListedBooks from "@/hooks/useListedBooks";
import { useMemo } from "react";

const MotionDiv = motion.div;

const PagesToRead = () => {
  const { listedBooks, removeBook } = useListedBooks();

  const totalPages = useMemo(
    () => listedBooks.reduce((sum, b) => sum + (b.pageCount || 0), 0),
    [listedBooks],
  );

  // Average reading speed: 300 pages per day (casual)
  const daysToFinish = Math.ceil(totalPages / 300);

  return (
    <div className="px-6 md:px-10 py-12 min-h-[60vh]">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3 mb-2">
          <Clock className="w-8 h-8" />
          Pages to Read
        </h1>
        <p className="text-muted-foreground">Track your reading progress</p>
      </MotionDiv>

      {/* Stats Cards */}
      {listedBooks.length > 0 && (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          <div className="bg-muted rounded-2xl p-5 text-center border border-border">
            <div className="text-3xl font-bold text-foreground">
              {listedBooks.length}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Books in List
            </div>
          </div>
          <div className="bg-muted rounded-2xl p-5 text-center border border-border">
            <div className="text-3xl font-bold text-foreground">
              {totalPages.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Total Pages
            </div>
          </div>
          <div className="bg-muted rounded-2xl p-5 text-center border border-border">
            <div className="text-3xl font-bold text-foreground">
              ~{daysToFinish}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Days to Finish
            </div>
          </div>
        </MotionDiv>
      )}

      {/* Empty State */}
      {listedBooks.length === 0 && (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="bg-muted rounded-full p-6 mb-6">
            <BookOpen className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Reading list is empty
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Save books from the Home page to see your reading stats here.
          </p>
        </MotionDiv>
      )}

      {/* Book List */}
      {listedBooks.length > 0 && (
        <div className="space-y-4">
          {listedBooks.map((book, index) => (
            <MotionDiv
              key={book.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Cover */}
              <div className="bg-muted rounded-xl w-14 h-20 shrink-0 overflow-hidden">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {book.authors?.[0] ?? "Unknown"}
                </p>
                {book.pageCount && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex-1 bg-muted rounded-full h-1.5 max-w-xs">
                      <div className="bg-foreground h-1.5 rounded-full w-0" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {book.pageCount} pages
                    </span>
                  </div>
                )}
              </div>

              {/* Status + Remove */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                  <Clock className="w-3 h-3" />
                  To Read
                </div>
                <button
                  onClick={() => removeBook(book.id)}
                  className="text-muted-foreground hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </MotionDiv>
          ))}
        </div>
      )}
    </div>
  );
};

export default PagesToRead;
