import useBooks from "@/hooks/useBooks";
import useListedBooks from "@/hooks/useListedBooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import { motion } from "framer-motion";
import { getUniqueGenres } from "@/hooks/useBooks";
import { useState } from "react";

const MotionDiv = motion.div;

const BOOKS_PER_PAGE = 6;
const BookList = () => {
  const { books, isLoading, isError } = useBooks();
  const { addBook, removeBook, isListed } = useListedBooks();

  const [activeGenre, setActiveGenre] = useState("Science");
  const genres =
    books?.length > 0 ? ["All", ...getUniqueGenres(books)] : ["Science"];

  const filteredBooks =
    activeGenre === "All"
      ? books
      : books?.filter((b) => b.categories.includes(activeGenre));

  return (
    <section id="books" className="px-6 md:px-10 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Popular Books
        </h2>
      </div>
      <div className="flex gap-2 flex-wrap justify-center mb-6">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => {
              setActiveGenre(g);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition
        ${
          activeGenre === g
            ? "bg-accent-green text-white border-accent-green"
            : "bg-muted border-border text-foreground hover:border-accent-green"
        }`}
          >
            {g}
          </button>
        ))}
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
          filteredBooks?.map((book, index) => (
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
    </section>
  );
};

export default BookList;
