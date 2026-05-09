import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import useBooks from "@/hooks/useBooks";
import BookCard from "@/components/BookCard";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useListedBooks from "@/hooks/useListedBooks";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";

const MotionDiv = motion.div;
const MotionButton = motion.button;
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [imgError, setImgError] = useState(false);
  const { addBook, removeBook, isListed } = useListedBooks();
  const { books } = useBooks();
  const cardCover = location.state?.cover;

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`,
      );
      const item = res.data;
      const imageLinks = item.volumeInfo.imageLinks;

      // Helper to get the best available image and ensure it's HTTPS
      const getImage = (url) => {
        if (!url) return null;
        return url
          .replace("http://", "https://")
          .replace("&edge=curl", "")
          .replace("zoom=1", "zoom=3");
      };
      return {
        id: item.id,
        title: item.volumeInfo.title || "Unknown Title",
        authors: item.volumeInfo.authors || ["Unknown Author"],
        cover:
          getImage(imageLinks?.thumbnail) ||
          getImage(imageLinks?.smallThumbnail) ||
          getImage(imageLinks?.small) ||
          getImage(imageLinks?.medium) ||
          getImage(imageLinks?.large) ||
          getImage(imageLinks?.extraLarge) ||
          null,
        rating: item.volumeInfo.averageRating || null,
        ratingsCount: item.volumeInfo.ratingsCount || 0,
        categories: item.volumeInfo.categories || [],
        pageCount: item.volumeInfo.pageCount || null,
        publishedDate: item.volumeInfo.publishedDate || null,
        description: item.volumeInfo.description || null,
        previewLink: item.volumeInfo.previewLink || null,
        publisher: item.volumeInfo.publisher || null,
        language: item.volumeInfo.language || null,
      };
    },
    staleTime: 30 * 60 * 1000,
  });

  const listed = book ? isListed(book.id) : false;
  // Use cover from state if available (from card), otherwise use fetched cover
  const displayCover = cardCover || book?.cover;

  // Loading state
  if (isLoading)
    return (
      <div className="px-6 md:px-10 py-12 min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-accent-green border-t-transparent" />
      </div>
    );

  // Error state
  if (isError || !book)
    return (
      <div className="px-6 md:px-10 py-12 min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Book not found.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  
 // Find related books based on shared categories (excluding current book)
const relatedBooks = books
  ?.filter((b) => {
    if (b.id === book.id) return false;

    return b.categories?.some((bCat) =>
      book.categories.some(
        (bookCat) =>
          bCat.toLowerCase().includes(bookCat.toLowerCase()) ||
          bookCat.toLowerCase().includes(bCat.toLowerCase()),
      ),
    );
  })
  .slice(0, 3);
  

  return (
    <div className="px-6 md:px-10 py-12">
      {/* Back button */}
      <MotionButton
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-accent-green transition-colors duration-200 mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
        Back
      </MotionButton>

      <div className="flex flex-col md:flex-row gap-8 md:gap-10">
        {/* Left — Cover */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 md:w-64 shrink-0"
        >
          {/* Cover section */}
          <div className="bg-muted rounded-2xl p-4 w-full max-w-xs md:max-w-none flex justify-center items-center shadow-xl min-h-70">
            {displayCover && !imgError ? (
              <img
                src={displayCover}
                alt={book.title}
                className="w-full h-64 md:h-80 object-contain rounded-lg drop-shadow-xl"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground py-8">
                <BookOpen className="w-16 h-16 opacity-30" />
                <span className="text-xs text-center">No cover available</span>
              </div>
            )}
          </div>

          {/* Add to List */}
          <Button
            onClick={() => (listed ? removeBook(book.id) : addBook(book))}
            className={`w-full max-w-xs md:max-w-none flex items-center gap-2 font-semibold
      ${
        listed
          ? "bg-accent-green hover:bg-accent-green/90 text-white"
          : "bg-foreground text-background hover:bg-foreground/90"
      }`}
          >
            {listed ? (
              <>
                <BookmarkCheck className="w-4 h-4" /> Saved
              </>
            ) : (
              <>
                <BookmarkPlus className="w-4 h-4" /> Add to List
              </>
            )}
          </Button>
          {/* Preview */}
          {book.previewLink && (
            <a
              href={book.previewLink}
              target="_blank"
              rel="noreferrer"
              className="w-full max-w-xs md:max-w-none"
            >
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 border-accent-green text-accent-green hover:bg-accent-green-light"
              >
                <ExternalLink className="w-4 h-4" />
                Preview on Google
              </Button>
            </a>
          )}
        </MotionDiv>

        {/* Right — Info */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1"
        >
          {/* Categories */}
          {book.categories.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-4">
              {book.categories.map((cat, i) => (
                <span
                  key={i}
                  className="text-xs text-accent-green bg-accent-green-light px-3 py-1 rounded-full border border-accent-green/20"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {book.title}
          </h1>

          {/* Author */}
          <p className="text-lg text-muted-foreground mb-6">
            By:{" "}
            <span className="text-foreground font-medium">
              {book.authors.join(", ")}
            </span>
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 mb-8">
            {book.publishedDate && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-accent-green" />
                {book.publishedDate.slice(0, 4)}
              </div>
            )}
            {book.pageCount && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <FileText className="w-4 h-4 text-accent-green" />
                {book.pageCount} pages
              </div>
            )}
            {book.publisher && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4 text-accent-green" />
                {book.publisher}
              </div>
            )}
            {book.rating && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="text-accent-green">★</span>
                {book.rating} ({book.ratingsCount.toLocaleString()} ratings)
              </div>
            )}
          </div>

          {/* Description */}
          {book.description && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                About this book
              </h2>
              <div
                className="text-muted-foreground leading-relaxed prose prose-sm max-w-none
  prose-p:mb-3 prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: book.description }}
              />
            </div>
          )}
        </MotionDiv>
      </div>
      {relatedBooks?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedBooks.map((b, i) => (
              <BookCard
                key={b.id}
                book={b}
                index={i}
                isListed={isListed(b.id)}
                onToggle={() =>
                  isListed(b.id) ? removeBook(b.id) : addBook(b)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
