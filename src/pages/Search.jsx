// src/pages/Search.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookCard from "@/components/BookCard";
import BookCardSkeleton from "@/components/BookCardSkeleton";
import useListedBooks from "@/hooks/useListedBooks";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const Search = () => {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const { addBook, removeBook, isListed } = useListedBooks();

  const { data: books, isLoading } = useQuery({
    queryKey: ["search", submitted],
    queryFn: async () => {
      if (!submitted) return [];
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${submitted}&maxResults=20&printType=books&langRestrict=en&key=${API_KEY}`,
      );
      return (res.data.items || [])
        .filter((item) => item.volumeInfo.imageLinks?.thumbnail)
        .map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || "Unknown Title",
          authors: item.volumeInfo.authors || ["Unknown Author"],
          cover: item.volumeInfo.imageLinks.thumbnail.replace(
            "http://",
            "https://",
          ),
          rating: item.volumeInfo.averageRating || null,
          ratingsCount: item.volumeInfo.ratingsCount || 0,
          categories: item.volumeInfo.categories || ["General"],
          pageCount: item.volumeInfo.pageCount || null,
          publishedDate: item.volumeInfo.publishedDate || null,
          description: item.volumeInfo.description || null,
          previewLink: item.volumeInfo.previewLink || null,
        }));
    },
    enabled: !!submitted,
  });

  return (
    <div className="px-6 md:px-10 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-6">Search Books</h1>

      {/* Search Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(query);
        }}
        className="flex gap-3 mb-10"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, genre..."
          className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-green"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <BookCardSkeleton key={i} />)}
        {!isLoading &&
          books?.map((book, index) => (
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
        {!isLoading && submitted && books?.length === 0 && (
          <p className="text-muted-foreground col-span-3 text-center py-10">
            No books found for "{submitted}"
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
