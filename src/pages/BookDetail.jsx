import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  FileText,
  ExternalLink,
  Star,
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
  const queryClient = useQueryClient();
  const { listedBooks, addBook, removeBook, isListed } = useListedBooks();
  const [failedCoverUrls, setFailedCoverUrls] = useState([]);

  const routeBook = location.state?.book;
  const cachedBook = queryClient
    .getQueryData(["books"])
    ?.find((book) => book.id === id);
  const listedBook = listedBooks.find((book) => book.id === id);
  const knownBook = routeBook || cachedBook || listedBook;

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      if (!id) throw new Error("Book ID is missing.");
      if (!API_KEY) throw new Error("Google Books API key is not configured.");

      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`,
      );
      const item = res.data;
      const volumeInfo = item.volumeInfo || {};
      const imageLinks = volumeInfo.imageLinks || {};
      const getImage = (url) =>
        url?.replace("http://", "https://").replace("zoom=1", "zoom=4");
      const coverCandidates = [
        getImage(imageLinks?.thumbnail),
        getImage(imageLinks?.smallThumbnail),
        getImage(imageLinks?.extraLarge),
        getImage(imageLinks?.large),
        getImage(imageLinks?.medium),
        getImage(imageLinks?.small),
      ].filter(Boolean);

      return {
        id: item.id,
        title: volumeInfo.title || "Unknown Title",
        authors: volumeInfo.authors || ["Unknown Author"],
        cover: coverCandidates[0] || null,
        coverCandidates,
        rating: volumeInfo.averageRating || null,
        ratingsCount: volumeInfo.ratingsCount || 0,
        categories: volumeInfo.categories || [],
        pageCount: volumeInfo.pageCount || null,
        publishedDate: volumeInfo.publishedDate || null,
        description: volumeInfo.description || null,
        previewLink: volumeInfo.previewLink || null,
        publisher: volumeInfo.publisher || null,
        language: volumeInfo.language || null,
      };
    },
    enabled: Boolean(id),
    staleTime: 30 * 60 * 1000,
  });

  const listed = book ? isListed(book.id) : false;
  const coverCandidates = [
    knownBook?.cover,
    ...(book?.coverCandidates || []),
    book?.cover,
  ].filter(Boolean);
  const uniqueCoverCandidates = [...new Set(coverCandidates)];
  const activeCover = uniqueCoverCandidates.find(
    (cover) => !failedCoverUrls.includes(cover),
  );
  const bookForList = activeCover ? { ...book, cover: activeCover } : book;

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
        {/* Left - Cover */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 md:w-64 shrink-0"
        >
          <div className="bg-muted rounded-2xl p-4 w-full max-w-xs md:max-w-none flex justify-center items-center shadow-xl min-h-70">
            {activeCover ? (
              <img
                src={activeCover}
                alt={book.title}
                className="w-full h-64 md:h-80 object-contain rounded-lg drop-shadow-xl"
                onError={() =>
                  setFailedCoverUrls((prev) =>
                    prev.includes(activeCover) ? prev : [...prev, activeCover],
                  )
                }
              />
            ) : (
              <div className="w-36 md:w-44 h-52 md:h-64 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <BookOpen className="w-12 h-12 md:w-16 md:h-16 opacity-30" />
                <span className="text-xs text-center">No cover available</span>
              </div>
            )}
          </div>

          {/* Add to List */}
          <Button
            onClick={() => (listed ? removeBook(book.id) : addBook(bookForList))}
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

        {/* Right - Info */}
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
                <Star className="w-4 h-4 fill-accent-green text-accent-green" />
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
    </div>
  );
};

export default BookDetail;
