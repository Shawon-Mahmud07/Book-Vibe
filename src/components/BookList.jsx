import useBooks from "@/hooks/useBooks";
import useListedBooks from "@/hooks/useListedBooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import { useState } from "react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const BOOKS_PER_PAGE = 6;
const BookList = () => {
  const { books, isLoading, isError } = useBooks();
  const { addBook, removeBook, isListed } = useListedBooks();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Pagination calculation
  const totalPages = Math.ceil((books?.length || 0) / BOOKS_PER_PAGE);
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const currentBooks = books?.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll to top of book list on page change
    document.getElementById("books")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="books" className="px-6 md:px-10 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Popular Books
        </h2>
        {books && (
          <p className="text-muted-foreground">
            Showing {startIndex + 1}–
            {Math.min(startIndex + BOOKS_PER_PAGE, books.length)} of{" "}
            {books.length} books
          </p>
        )}
      </div>

      {/* Error */}
      {isError && (
        <div className="text-center text-red-500 py-10">
          Something went wrong! Please try again.
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <BookCardSkeleton key={`skeleton-${i}`} />
          ))}

        {!isLoading &&
          currentBooks?.map((book, index) => (
            <BookCard
              key={book.id}
              book={book}
              index={index}
              isListed={isListed(book.id)}
              onToggle={() =>
                isListed(book.id) ? removeBook(book.id) : addBook(book)
              }
            />
          ))}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2"
        >
          {/* Prev Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-muted border border-border text-foreground disabled:opacity-30 hover:border-accent-green hover:text-accent-green transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 border
                  ${
                    currentPage === page
                      ? "bg-accent-green text-white border-accent-green"
                      : "bg-muted border-border text-foreground hover:border-accent-green hover:text-accent-green"
                  }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-muted border border-border text-foreground disabled:opacity-30 hover:border-accent-green hover:text-accent-green transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </MotionDiv>
      )}
    </section>
  );
};

export default BookList;
