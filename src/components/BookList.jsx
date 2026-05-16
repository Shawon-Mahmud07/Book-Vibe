import useBooks from "@/hooks/useBooks";
import useListedBooks from "@/context/ListedBooksContext";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { getUniqueGenres } from "@/hooks/useBooks";
import { useState } from "react";

const MotionDiv = motion.div;
const ITEMS_PER_PAGE = 6;
const BookList = () => {
  const { books, isLoading, isError } = useBooks();
  const { addBook, removeBook, isListed } = useListedBooks();
  const [currentPage, setCurrentPage] = useState(1);

  const [activeGenre, setActiveGenre] = useState("All");
  const genres =
    books?.length > 0 ? ["All", ...getUniqueGenres(books)] : ["All"];

  const filteredBooks =
    activeGenre === "All"
      ? books
      : books?.filter((b) => b.categories?.includes(activeGenre));

  // Pagination slice
  const totalPages = Math.ceil((filteredBooks?.length || 0) / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
// Handle genre change and reset to first page
  const handleGenreChange = (genre) => {
    setActiveGenre(genre);
    setCurrentPage(1);
  };

  const getPageNumbers = (current, total) => {
// If total pages are 5 or less, show all
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    // Always show first, last, current, and neighbors
    const pages = new Set([1, total, current]);
    if (current - 1 > 1) pages.add(current - 1);
    if (current + 1 < total) pages.add(current + 1);
// Sort and insert ellipses
    const sorted = [...pages].sort((a, b) => a - b);

    // Insert "..." where there are gaps
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
        result.push("...");
      }
      result.push(sorted[i]);
    }
    return result;
  };

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
              onClick={() => handleGenreChange(g)}
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
            : paginatedBooks?.map((book, index) => (
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
      {/* Smart Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-8 flex-wrap">
          {/* Prev */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-xl border border-border text-sm font-medium disabled:opacity-40 hover:border-accent-green transition"
          >
            ←
          </button>

          {/* Smart page numbers */}
          {getPageNumbers(currentPage, totalPages).map((page, index) =>
            page === "..." ? (
              <span
                key={`dots-${index}`}
                className="w-9 h-9 flex items-center justify-center text-muted-foreground text-sm"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-sm font-semibold border transition
            ${
              currentPage === page
                ? "bg-accent-green text-white border-accent-green"
                : "border-border hover:border-accent-green text-foreground"
            }`}
              >
                {page}
              </button>
            ),
          )}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-xl border border-border text-sm font-medium disabled:opacity-40 hover:border-accent-green transition"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

export default BookList;
