import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, Sparkles, BookCopy } from "lucide-react";
import BookCard from "@/components/BookCard";
import BookCardSkeleton from "@/components/BookCardSkeleton";
import useListedBooks from "@/hooks/useListedBooks";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const MotionDiv = motion.div;
const Search = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { addBook, removeBook, isListed } = useListedBooks();

  // Debouncing logic: টাইপ করা শেষ হওয়ার ৫০০ms পর সার্চ হবে
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Search.jsx এর উন্নত ফিল্টার লজিক

  const {
    data: books,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return [];
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${debouncedQuery}&maxResults=20&printType=books&langRestrict=en&key=${API_KEY}`,
      );

      const searchLower = debouncedQuery.toLowerCase();

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
          categories: item.volumeInfo.categories || ["General"],
          rating: item.volumeInfo.averageRating || null,
          pageCount: item.volumeInfo.pageCount || null,
          publishedDate: item.volumeInfo.publishedDate || null,
        }))
        .filter((book) => {
       
          const matchesTitle = book.title.toLowerCase().includes(searchLower);

        
          const matchesAuthor = book.authors.some((author) =>
            author.toLowerCase().includes(searchLower),
          );

          
          const matchesCategory = book.categories.some((cat) =>
            cat.toLowerCase().includes(searchLower),
          );

          
          return matchesTitle || matchesAuthor || matchesCategory;
        });
    },
    enabled: !!debouncedQuery,
  });

  return (
    <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto min-h-screen">
      {/* Search Header */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          Discover Your Next Read
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Search <span className="text-accent-green">Library.</span>
        </h1>
      </MotionDiv>

      {/* Search Input Container */}
      <div className="relative max-w-2xl mx-auto mb-16">
        <div className="relative group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent-green transition-colors" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or genre..."
            className="w-full pl-12 pr-12 py-4 md:py-5 rounded-2xl md:rounded-[2rem] border border-border bg-card/50 backdrop-blur-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-accent-green/10 focus:border-accent-green transition-all shadow-xl shadow-black/5"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Loading Indicator for Debounce */}
        {isFetching && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
            <span className="text-[10px] font-bold text-accent-green animate-pulse uppercase tracking-widest">
              Searching...
            </span>
          </div>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <BookCardSkeleton key={`skeleton-${i}`} />
              ))
            : books?.map((book, index) => (
                <MotionDiv
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
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

      {/* Empty/Initial States */}
      {!isLoading && !debouncedQuery && (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
          <BookCopy className="w-16 h-16 mb-4 text-muted-foreground" />
          <p className="text-lg font-medium">Start typing to explore books</p>
        </div>
      )}

      {!isLoading && debouncedQuery && books?.length === 0 && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full text-center py-20"
        >
          <div className="bg-muted/50 rounded-3xl p-10 inline-block border border-dashed border-border">
            <p className="text-muted-foreground font-medium">
              No results found for "
              <span className="text-foreground font-bold">
                {debouncedQuery}
              </span>
              "
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 text-accent-green font-bold hover:underline"
            >
              Try another keyword
            </button>
          </div>
        </MotionDiv>
      )}
    </div>
  );
};

export default Search;
