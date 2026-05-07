import { motion, AnimatePresence } from "framer-motion";
import {
  BookMarked,
  Trash2,
  BookOpen,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useListedBooks from "@/hooks/useListedBooks";
import { useNavigate } from "react-router-dom";

const MotionDiv = motion.div;

const ListedBooks = () => {
  const { listedBooks, removeBook, clearAll } = useListedBooks();
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-10 py-12 max-w-5xl mx-auto min-h-[70vh]">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-foreground flex items-center gap-3">
            <div className="p-2 bg-accent-green/10 rounded-xl">
              <BookMarked className="w-8 h-8 text-accent-green" />
            </div>
            Your Reading List
          </h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-2">
            You have
            <span className="text-foreground font-bold mx-1">
              {listedBooks.length}
            </span>
            books in your collection
          </p>
        </div>

        {listedBooks.length > 0 && (
          <Button
            variant="ghost"
            className="text-destructive hover:bg-destructive/10 gap-2 self-start sm:self-center transition-colors"
            onClick={clearAll}
          >
            <Trash2 className="w-4 h-4" />
            Clear Collection
          </Button>
        )}
      </MotionDiv>

      {/* Empty State */}
      {listedBooks.length === 0 && (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-32 text-center bg-secondary/20 rounded-[3rem] border border-dashed border-border"
        >
          <div className="bg-accent-green/10 rounded-full p-8 mb-6">
            <BookOpen className="w-16 h-16 text-accent-green/40" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Your list is empty
          </h2>
          <p className="text-muted-foreground max-w-xs mb-8">
            Explore our library and save your favorite books to read them later.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-accent-green hover:bg-accent-green-hover text-white px-8 rounded-full shadow-lg shadow-accent-green/20"
          >
            Browse Books
          </Button>
        </MotionDiv>
      )}

      {/* Books List Layout */}
      <div className="flex flex-col gap-5">
        <AnimatePresence mode="popLayout">
          {listedBooks.map((book, index) => (
            <MotionDiv
              key={book.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative group bg-card hover:bg-accent/5 border border-border/50 rounded-3xl p-4 sm:p-5 flex gap-4 sm:gap-6 items-center transition-all duration-300 hover:shadow-xl hover:shadow-black/5"
            >
              {/* Book Cover Container */}
              <div
                onClick={() => navigate(`/book/${book.id}`)}
                className="relative w-20 h-28 sm:w-24 sm:h-36 shrink-0 cursor-pointer overflow-hidden rounded-xl shadow-md group-hover:scale-105 transition-transform duration-500"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Info Section */}
              <div className="grow min-w-0">
                <div className="flex justify-between items-start">
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    <h3 className="font-bold text-base sm:text-xl text-foreground line-clamp-1 group-hover:text-accent-green transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium mb-2">
                      {book.authors?.[0]}
                    </p>
                  </div>
                </div>

                {/* Badges & Meta */}
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-lg text-[11px] font-bold text-foreground/70 uppercase tracking-tight">
                    <Clock className="w-3 h-3" />
                    {book.pageCount || 0} pages
                  </span>
                  {book.categories?.[0] && (
                    <span className="px-3 py-1 bg-accent-green/10 text-accent-green rounded-lg text-[11px] font-bold uppercase tracking-tight border border-accent-green/20">
                      {book.categories[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => removeBook(book.id)}
                  className="p-2.5 sm:p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all duration-300"
                  title="Remove from list"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate(`/book/${book.id}`)}
                  className="hidden sm:flex p-2.5 sm:p-3 text-muted-foreground hover:text-accent-green hover:bg-accent-green/10 rounded-2xl transition-all duration-300"
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
