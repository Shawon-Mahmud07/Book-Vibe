import useBooks from "@/hooks/useBooks";
import useListedBooks from "@/hooks/useListedBooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const MotionDiv = motion.div;

const BOOKS_PER_PAGE = 6;
const BookList = () => {
  const { books, isLoading, isError } = useBooks();
  const { addBook, removeBook, isListed } = useListedBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  
  // Pagination calculation
  const totalPages = Math.ceil((books?.length || 0) / BOOKS_PER_PAGE);
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const currentBooks = books?.slice(startIndex, startIndex + BOOKS_PER_PAGE);

 const goToPage = (page) => {
   setSearchParams({ page });
   setTimeout(() => {
     document.getElementById("books")?.scrollIntoView({
       behavior: "smooth",
       block: "start",
     });
   }, 100);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
          className="flex items-center justify-center gap-1.5 mt-8 "
        >
          {/* Prev Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-muted border border-border text-foreground disabled:opacity-30 hover:border-accent-green hover:text-accent-green transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Smart Page Numbers */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;

            // Show first, last, current, and adjacent pages only
            const showPage =
              page === 1 ||
              page === totalPages ||
              page === currentPage ||
              page === currentPage - 1 ||
              page === currentPage + 1;

            // Show dots .... if there's a gap of 2 pages before or after the current page
            const showDotsBefore = page === currentPage - 2 && currentPage > 3;
            const showDotsAfter =
              page === currentPage + 2 && currentPage < totalPages - 2;

            if (showDotsBefore || showDotsAfter) {
              return (
                <span
                  key={page}
                  className="w-8 h-10 flex items-end justify-center text-muted-foreground pb-1 text-lg tracking-widest"
                >
                  ···
                </span>
              );
            }

            if (!showPage) return null;

            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 border
            ${
              currentPage === page
                ? "bg-accent-green text-white border-accent-green scale-110"
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
