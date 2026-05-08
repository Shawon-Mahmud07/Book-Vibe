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
    <div className="px-4 md:px-10 py-12 max-w-5xl mx-auto min-h-[80vh]">
      {/* Header Section */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-xs font-bold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
            </span>
            Library Collection
          </div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">
            Reading <span className="text-accent-green">List.</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            You've curated{" "}
            <span className="text-foreground font-bold">
              {listedBooks.length}
            </span>{" "}
            titles so far.
          </p>
        </div>

        {listedBooks.length > 0 && (
          <Button
            variant="outline"
            className="rounded-2xl border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all duration-300 gap-2 h-11"
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-32 text-center bg-muted/30 rounded-[3rem] border-2 border-dashed border-border"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-accent-green blur-3xl opacity-10 animate-pulse" />
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl">
              <BookOpen className="w-16 h-16 text-accent-green" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            No books saved yet
          </h2>
          <p className="text-muted-foreground max-w-xs mb-8 font-medium">
            Your collection is waiting to be filled with great stories.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-accent-green hover:bg-accent-green-hover text-white px-10 h-12 rounded-2xl shadow-xl shadow-accent-green/20 font-bold transition-all hover:-translate-y-1"
          >
            Start Exploring
          </Button>
        </MotionDiv>
      )}

      {/* Books List Layout */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {listedBooks.map((book, index) => (
            <MotionDiv
              key={book.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-card hover:bg-secondary/40 border border-border/60 rounded-[2.5rem] p-4 sm:p-6 flex gap-5 sm:gap-8 items-center transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            >
              {/* Left Side: Book Cover with 3D Effect */}
              <div
                onClick={() => navigate(`/book/${book.id}`)}
                className="relative shrink-0 w-24 h-36 sm:w-32 sm:h-48 cursor-pointer perspective-1000"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl group-hover:rotate-y-12 group-hover:scale-105 transition-all duration-500">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Middle Side: Content */}
              <div className="grow min-w-0 py-2">
                <div className="space-y-1 sm:space-y-2 mb-4">
                  <h3
                    onClick={() => navigate(`/book/${book.id}`)}
                    className="font-black text-lg sm:text-2xl text-foreground truncate cursor-pointer group-hover:text-accent-green transition-colors leading-tight"
                  >
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground font-semibold text-sm">
                    <span className="w-4 h-[2px] bg-accent-green/40" />
                    {book.authors?.[0] || "Unknown Author"}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur-sm rounded-xl border border-border/40 text-[11px] font-bold text-foreground/80 uppercase tracking-tight">
                    <BookText className="w-3.5 h-3.5 text-accent-green" />
                    {book.pageCount || "N/A"} Pages
                  </div>
                  {book.categories?.[0] && (
                    <div className="px-4 py-2 bg-accent-green/5 text-accent-green rounded-xl text-[11px] font-black uppercase tracking-widest border border-accent-green/10">
                      {book.categories[0]}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Smart Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => removeBook(book.id)}
                  className="p-3.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all duration-300 hover:rotate-12"
                  title="Remove book"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate(`/book/${book.id}`)}
                  className="p-3.5 bg-accent-green/5 text-accent-green hover:bg-accent-green hover:text-white rounded-2xl transition-all duration-300 shadow-sm"
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
