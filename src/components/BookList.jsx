import useBooks from "@/hooks/useBooks";
import useListedBooks from "@/hooks/useListedBooks";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { getUniqueGenres } from "@/hooks/useBooks";
import { useState } from "react";

const MotionDiv = motion.div;

const BookList = () => {
  const { books, isLoading, isError } = useBooks();
  const { addBook, removeBook, isListed } = useListedBooks();

  const [activeGenre, setActiveGenre] = useState("Juvenile Fiction");
  const genres =
    books?.length > 0 ? ["All", ...getUniqueGenres(books)] : ["All"];

  const filteredBooks =
    activeGenre === "All"
      ? books
      : books?.filter((b) => b.categories?.includes(activeGenre));

  return (
    <section id="books" className="px-4 md:px-10 py-12 max-w-7xl mx-auto">
      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-extrabold text-foreground mb-3 tracking-tight">
          Popular Books
        </h2>
      </MotionDiv>

      {/* Optimized Genre Buttons for Mobile */}
      <div className="relative mb-10">
        <div className="flex gap-3 overflow-x-auto  lg:pb-4 sm:pb-0 sm:flex-wrap sm:justify-center no-scrollbar items-center">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 whitespace-nowrap relative
                ${
                  activeGenre === g
                    ? "bg-accent-green text-white border-accent-green shadow-lg shadow-accent-green/20"
                    : "bg-card border-border text-muted-foreground hover:border-accent-green hover:text-accent-green"
                }`}
            >
              {g}
              {activeGenre === g && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-accent-green -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
        {/* Mobile Scroll Indicator Gradient */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-background to-transparent sm:hidden" />
      </div>

      {/* Error State */}
      {isError && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-500 py-20 bg-red-50/5 rounded-2xl border border-red-500/20"
        >
          <p className="text-lg font-medium">Something went wrong!</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm underline"
          >
            Try again
          </button>
        </MotionDiv>
      )}

      {/* Grid with Motion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <AnimatePresence mode="popLayout">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <BookCardSkeleton key={`skeleton-${i}`} />
              ))
            : filteredBooks?.map((book, index) => (
                <MotionDiv
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <BookCard
                    book={book}
                    index={index}
                    isListed={isListed(book.id)}
                    onToggle={() =>
                      isListed(book.id) ? removeBook(book.id) : addBook(book)
                    }
                  />
                </MotionDiv>
              ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BookList;
