import useBooks from "@/hooks/useBooks";
import useListedBooks from "@/hooks/useListedBooks";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import { useMemo, useState } from "react";

const BookList = () => {
  const { books, isLoading, isError } = useBooks();
  const { addBook, removeBook, isListed } = useListedBooks();
  // Sorting state
  const [sortBy, setSortBy] = useState("default");

  const sortedBooks = useMemo(() => {
    if (!books) return [];
    const copy = [...books];
    if (sortBy === "year")
      return copy.sort((a, b) =>
        (b.publishedDate || "").localeCompare(a.publishedDate || ""),
      );
    if (sortBy === "pages")
      return copy.sort((a, b) => (b.pageCount || 0) - (a.pageCount || 0));
    if (sortBy === "rating")
      return copy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return copy;
  }, [books, sortBy]);

  return (
    <section id="books" className="px-6 md:px-10 py-10">
      {/* Header + Sort */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold">Books</h2>

        {/* Sort buttons */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {[
            { label: "Default", value: "default" },
            { label: "Newest", value: "year" },
            { label: "Most Pages", value: "pages" },
            { label: "Top Rated", value: "rating" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200
                ${
                  sortBy === option.value
                    ? "bg-accent-green text-white border-accent-green"
                    : "border-border text-muted-foreground hover:border-accent-green hover:text-accent-green"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {isError && (
        <div className="text-center text-red-500 py-10">
          Something went wrong! Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}

        {!isLoading &&
          sortedBooks?.map((book, index) => (
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
